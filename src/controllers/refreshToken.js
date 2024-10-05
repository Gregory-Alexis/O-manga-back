const { PrismaClient } = require('@prisma/client');
const {
  findRefreshTokenById,
  deleteRefreshToken,
  addRefreshTokenToWhitelist
} = require('../auth/auth.services');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { hashToken } = require('../utils/hashToken');
const { generateTokens } = require('../utils/jwt');

module.exports = {
  getRefreshToken: async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Missing refresh token.' });
    }

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const user = await prisma.user.findUnique({
      where: {
        id: savedRefreshToken.user_id,
      },
    });

    if (!user) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, user_id: user.id });

    res.status(200).json({ message: 'Tokens refreshed', accessToken, refreshToken: newRefreshToken });

  },
};

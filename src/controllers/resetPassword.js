const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

module.exports = {
  resetPassword: async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { resetPassword: req.body.token },
    });

    const now = new Date().valueOf();

    if (user?.resetPasswordExpires) {
      if (user.resetPasswordExpires < now) {
        return res.status(401).json({ message: 'Token expired' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          password: hashed,
          resetPassword: null,
          resetPasswordExpires: null,
        },
      });

      await prisma.refreshToken.updateMany({
        where: {
          user_id: user.id,
        },
        data: {
          revoked: true,
        },
      });

      return res.json({ message: 'Password updated' });
    } else {
      return res.status(401).json({ message: 'Token expired' });
    }
  }
};

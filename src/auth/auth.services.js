const { db } = require('../utils/db');
const { hashToken } = require('../utils/hashToken');

// used when we create a refresh token
function addRefreshTokenToWhitelist({ jti, refreshToken, user_id }) {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      user_id,
    },
  });
}

// used to check if the token sent by the client is in database
function findRefreshTokenById(id) {
  return db.refreshToken.findUnique({
    where: { id },
  });
}

// soft delete tokens after usage.
function deleteRefreshToken(id) {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true
    }
  });
}

function revokeTokens(user_id) {
  return db.refreshToken.updateMany({
    where: {
      user_id
    },
    data: {
      revoked: true
    }
  });

}

module.exports = {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens
};

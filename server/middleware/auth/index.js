/* Export all authentication middlewares */
const verifyAccessToken = require('./verifyAccessToken');
const verifyRefreshToken = require('./verifyRefreshToken');

module.exports = {
  verifyAccessToken,
  verifyRefreshToken
};

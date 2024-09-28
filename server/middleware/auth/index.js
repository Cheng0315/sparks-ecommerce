/* Export all authentication middlewares */
const verifyAccessToken = require("./verifyAccessToken");
const verifyRefreshToken = require("./verifyRefreshToken");
const validateNewPassword = require("./validateNewPassword");
const verifyPassword = require("./verifyPassword")

module.exports = {
  verifyAccessToken,
  verifyRefreshToken,
  verifyPassword,
  validateNewPassword
};

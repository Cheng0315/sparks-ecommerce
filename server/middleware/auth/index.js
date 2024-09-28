/* Export all authentication middlewares */
const verifyAccessToken = require("./verifyAccessToken");
const verifyRefreshToken = require("./verifyRefreshToken");
const verifyPassword = require("./verifyPassword")

module.exports = {
  verifyAccessToken,
  verifyRefreshToken,
  verifyPassword,
};

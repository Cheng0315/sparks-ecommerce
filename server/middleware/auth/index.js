/* Export all authentication middlewares */
const verifyAccessToken = require("./verifyAccessToken");
const verifyRefreshToken = require("./verifyRefreshToken");
const verifyPassword = require("./verifyPassword");
const generalRateLimiter = require("./generalRateLimiter");
const strictRateLimiter = require("./strictRateLimiter");

module.exports = {
  verifyAccessToken,
  verifyRefreshToken,
  verifyPassword,
  generalRateLimiter,
  strictRateLimiter
};

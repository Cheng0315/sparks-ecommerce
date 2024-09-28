/* Export all token related functions */
const generateAccessJWT = require("./generateAccessJWT");
const generateRefreshJWT = require("./generateRefreshJWT");

module.exports = {
  generateRefreshJWT,
  generateAccessJWT
};
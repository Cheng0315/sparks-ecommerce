/* Export all user controller functions*/
const getUser = require("./getUser");
const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const renewTokens = require("./renewTokens");
const updatePassword = require("./updatePassword");

module.exports = {
  getUser,
  login,
  logout,
  register,
  renewTokens,
  updatePassword
};
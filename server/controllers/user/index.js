/* Export all user controller functions*/
const getUser = require("./getUser");
const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const renewTokens = require("./renewTokens");
const updateUserPassword = require("./updateUserPassword");
const updateUserEmail = require("./updateUserEmail");
const updateUserInfo = require("./updateUserInfo");
const updateUserRole = require("./updateUserRole");

module.exports = {
  getUser,
  login,
  logout,
  register,
  renewTokens,
  updateUserPassword,
  updateUserEmail,
  updateUserInfo,
  updateUserRole
};

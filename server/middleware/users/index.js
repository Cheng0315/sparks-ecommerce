/* Export all users related middlewares */
const validateRegistrationInput = require("./validateRegistrationInput");
const validateUserUpdateInfo = require("./validateUserUpdateInfo");
const validateNewPassword = require("./validateNewPassword");
const validateParamsId = require("./validateParamsId")

module.exports = {
  validateRegistrationInput,
  validateUserUpdateInfo,
  validateNewPassword,
  validateParamsId
};

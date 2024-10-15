/* Exports all user-related middlewares */
const validateRegistrationInput = require("./validateRegistrationInput");
const validateUserUpdateInfo = require("./validateUserUpdateInfo");
const validateNewPassword = require("./validateNewPassword");
const validateNewEmail = require("./validateNewEmail");
const validateLoginInput = require("./validateLoginInput")

module.exports = {
  validateRegistrationInput,
  validateUserUpdateInfo,
  validateNewPassword,
  validateNewEmail,
  validateLoginInput
};

/* Export all users related middlewares */
const validateRegistrationInput = require("./validateRegistrationInput");
const validateUserUpdateInfo = require("./validateUserUpdateInfo");

module.exports = {
  validateRegistrationInput,
  validateUserUpdateInfo
};

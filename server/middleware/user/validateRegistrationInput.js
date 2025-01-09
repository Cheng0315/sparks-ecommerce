const { getPasswordRegex, getEmailRegex, getUsernameRegex, getLastNameRegex, getFirstNameRegex } = require("../../utils/regex");
const { body, validationResult } = require("express-validator");

/* Validate user's input for registration */
const validateRegistrationInput = [
  body("firstName")
    .trim()
    .escape()
    .notEmpty().withMessage("First name is required")
    .isLength({ max: 30 }).withMessage("First name must be less than 30 characters")
    .matches(getFirstNameRegex()).withMessage("First name must contain only letters"),
  body("lastName")
    .trim()
    .escape()
    .notEmpty().withMessage("Last name is required")
    .isLength({ max: 30 }).withMessage("Last name must be less than 30 characters")
    .matches(getLastNameRegex()).withMessage("Last name must contain only letters"),
  body("username")
    .trim()
    .escape()
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3, max: 20 }).withMessage("Username must be between 3 and 20 characters")
    .matches(getUsernameRegex()).withMessage("Username contains invalid characters"),
  body("email")
    .isEmail().withMessage("Invalid email")
    .normalizeEmail()
    .escape()
    .matches(getEmailRegex()).withMessage("Email contains invalid characters"),
  body("password")
    .trim()
    .escape()
    .notEmpty().withMessage("Password is required")
    .matches(getPasswordRegex()).withMessage("Password must be at least 8 characters and include lowercase letters, uppercase letters, digits, and special characters: @$!%*?&"),
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errorMessage: errors.array()[0].msg });
      }
      next();
    } catch (error) {
      res.status(500).json({ errorMessage: 'Internal Server Error' });
    }
  }
];

module.exports = validateRegistrationInput;
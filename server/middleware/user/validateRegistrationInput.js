const { getPasswordRegex, getEmailRegex, getUsernameRegex, getLastNameRegex, getFirstNameRegex } = require("../../utils/regex");
const { body, validationResult } = require("express-validator");

/* Validate user's input for registration */
const validateRegistrationInput = [
  body("firstName")
    .trim()
    .escape()
    .notEmpty().withMessage("First name is required")
    .isLength({ max: 30 }).withMessage("First name must be less than 30 characters")
    .matches(getFirstNameRegex()).withMessage("First name contains invalid characters"),
  body("lastName")
    .trim()
    .escape()
    .notEmpty().withMessage("Last name is required")
    .isLength({ max: 30 }).withMessage("Last name must be less than 30 characters")
    .matches(getLastNameRegex()).withMessage("Last name contains invalid characters"),
  body("username")
    .trim()
    .escape()
    .matches(getUsernameRegex()).withMessage("Invalid username"),
  body("email")
    .isEmail().withMessage("Invalid email")
    .normalizeEmail()
    .escape()
    .matches(getEmailRegex()).withMessage("Invalid email"),
  body("password")
    .trim()
    .escape()
    .matches(getPasswordRegex()).withMessage("Invalid Password"),
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
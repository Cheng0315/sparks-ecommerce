const { getPasswordRegex, getEmailRegex } = require("../../utils/regex");
const { body, validationResult } = require("express-validator");

/* Validate user's input for login */
const validateLoginInput = [
  body("email")
    .isEmail().withMessage("Invalid email")
    .normalizeEmail()
    .escape()
    .matches(getEmailRegex()).withMessage("Email contains invalid characters"),
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

module.exports = validateLoginInput;

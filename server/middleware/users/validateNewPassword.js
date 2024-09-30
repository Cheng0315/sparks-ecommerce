const { getPasswordRegex } = require("../../utils/regex");
const { body, validationResult } = require("express-validator");

/* Validate new password */
const validateNewPassword = [
  body("password")
    .trim()
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

module.exports = validateNewPassword;
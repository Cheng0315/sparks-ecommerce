const { getPasswordRegex } = require("../../utils/regex");
const { body, validationResult } = require("express-validator");

/* Validate new password */
const validateNewPassword = [
  body("newPassword")
    .trim()
    .escape()
    .notEmpty().withMessage("New password is required")
    .matches(getPasswordRegex()).withMessage("New Password must be at least 8 characters and include lowercase letters, uppercase letters, digits, and the following special characters: @$!%*?&"),
  body("confirmPassword")
    .trim()
    .escape()
    .notEmpty().withMessage("Confirmed password is required")
    .matches(getPasswordRegex()).withMessage("Confirmed password must be at least 8 characters and include lowercase letters, uppercase letters, digits, and special characters: @$!%*?&"),
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errorMessage: errors.array()[0].msg });
      }

      if (req.body.newPassword !== req.body.confirmPassword) return res.status(400).json({ errorMessage: "Passwords do not match" });
      
      next();
    } catch (error) {
      res.status(500).json({ errorMessage: 'Internal Server Error' });
    }
  }
];

module.exports = validateNewPassword;
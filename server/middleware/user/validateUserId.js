const { param, validationResult } = require("express-validator");

/* Validate user id */
const validateUserId = [
  param("userId").isInt().withMessage("User ID must be an integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errorMessage: errors.array()[0].msg });
    }
    next();
  }
];

module.exports = validateUserId;
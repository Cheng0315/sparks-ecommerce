const { param, validationResult } = require("express-validator");

/* Validate user id */
const validateUserId = [
  param("userId")
    .isInt()
    .withMessage("User ID must be an integer")
    .toInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errorMessage: errors.array()[0].msg });
    }
    next();
  }
];

module.exports = validateUserId;
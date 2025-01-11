const { param, validationResult } = require("express-validator");

/* Validate param id */
const validateParamId = (paramName) => [
  param(paramName)
    .isInt()
    .withMessage(`${paramName} must be an integer`)
    .toInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errorMessage: errors.array()[0].msg });
    }
    next();
  }
];

module.exports = validateParamId;
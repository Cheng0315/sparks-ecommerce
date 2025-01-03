const { param, validationResult } = require("express-validator");

/* Validate product id */
const validateProductId = [
  param("productId")
    .isInt()
    .withMessage("Product ID must be a positive integer")
    .toInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errorMessage: errors.array()[0].msg });
    }
    next();
  }
];

module.exports = validateProductId;
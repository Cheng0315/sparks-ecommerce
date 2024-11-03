const { param, validationResult } = require("express-validator");

/* Validate product id */
const validateProductId = [
  param("productId").isInt().withMessage("Product ID must be an integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errorMessage: errors.array()[0].msg });
    }
    next();
  }
];

module.exports = validateProductId;
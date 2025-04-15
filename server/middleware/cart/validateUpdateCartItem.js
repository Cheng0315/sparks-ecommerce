const { param, body, validationResult } = require("express-validator");
    
/* Validate cart item product id and quantity for update */
const validateUpdateCartItem = [
  param("productId")
    .isInt({ gt: 0 })
    .withMessage("Product Id must be an integer")
    .toInt(),
  body("quantity")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer")
    .toInt(),
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errorMessage: errors.array()[0].msg });
      }
      next();
    } catch (error) {
      res.status(500).json({ errorMessage: "Internal Server Error" });
    }
  }
];

module.exports = validateUpdateCartItem;
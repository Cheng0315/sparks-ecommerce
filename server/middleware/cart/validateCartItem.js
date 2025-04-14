const { body, validationResult } = require("express-validator");
    
/* Validate cart item data */
const validateCartItem = [
  body("productId")
    .isInt()
    .withMessage("Product ID must be a positive integer")
    .toInt(),
  body("quantity")
    .isInt()
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

module.exports = validateCartItem;
const { body, validationResult } = require("express-validator");

/* Validate guest cart items for merging */
const validateMergeCartItems = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("Items must be a non-empty array"),
  body("items.*.productId")
    .isInt({ gt: 0 })
    .withMessage("Product Id must be a positive integer")
    .toInt(),
  body("items.*.quantity")
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

module.exports = validateMergeCartItems;
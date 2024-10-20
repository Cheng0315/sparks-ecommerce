const { body, validationResult } = require("express-validator");
    
/* Validate product details */
const validateProductDetails = [
  body("name")
    .trim()
    .escape()
    .matches(/^[a-zA-Z0-9 ]{3,50}$/).withMessage("Product name must contain only letters, numbers, spaces, and between 3 to 50 characters"),
  body("description")
    .trim()
    .escape()
    .isLength({ min: 5, max: 500 }).withMessage("Description must be between 5 and 500 characters long."),
  body("condition")
    .trim()
    .escape()
    .isIn(["new", "like new", "refurbished", "used", "open box", "damaged", "for parts"])
    .withMessage("Condition must be one of the following: 'new', 'like new', 'refurbished', 'used', 'open box', 'damaged', 'for parts'."),
  body("price")
    .trim()
    .escape()
    .isFloat({ gt: 0 }).withMessage("Price must be a positive number")
    .matches(/^\d+(\.\d{1,2})?$/).withMessage("Price must have at most two decimal places")
    .toFloat(),
  body("stockQuantity")
    .isInt({ min: 0, max: 1000 })
    .withMessage("Stock quantity must be between 1 and 1000")
    .toInt(),
  body("categoryId")
    .isInt({ min: 1, max: 18 })
    .withMessage("Category ID must be between 1 and 18")
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

module.exports = validateProductDetails;
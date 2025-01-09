const { body, validationResult } = require("express-validator");
const { getProductNameRegex, getProductPriceRegex } = require("../../utils/regex");
    
/* Validate product details for updating the product*/
const validateProductUpdateDetails = [
  body("name")
    .optional()
    .trim()
    .escape()
    .notEmpty().withMessage("Product name is required")
    .isLength({ min: 3, max: 50 }).withMessage("Product name must be between 3 and 50 characters")
    .matches(getProductNameRegex()).withMessage("Product name must contain only letters, numbers, and spaces"),
  body("description")
    .optional()
    .trim()
    .escape()
    .isLength({ min: 5, max: 500 }).withMessage("Description must be between 5 and 500 characters long"),
  body("condition")
    .optional()
    .trim()
    .escape()
    .isIn(["new", "like new", "refurbished", "used", "open box", "damaged", "for parts"])
    .withMessage("Condition must be one of the following: 'new', 'like new', 'refurbished', 'used', 'open box', 'damaged', 'for parts'"),
  body("price")
    .optional()
    .trim()
    .escape()
    .notEmpty().withMessage("Price is required")
    .isFloat({ min: 0.01, max: 100000 }).withMessage("Price must be a number between 0.01 and 100000")
    .matches(getProductPriceRegex()).withMessage("Price must have at most two decimal places")
    .toFloat(),
  body("stockQuantity")
    .optional()
    .isInt({ min: 0, max: 1000 })
    .withMessage("Stock quantity must be between 1 and 1000")
    .toInt(),
  body("categoryId")
    .optional()
    .isInt({ min: 1, max: 18 })
    .withMessage("Category ID must be a number between 1 and 18")
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

module.exports = validateProductUpdateDetails;
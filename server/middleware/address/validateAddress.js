const { getFirstNameRegex, getLastNameRegex, getAddressCityRegex, getAddressZipCodeRegex, getAddressStateRegex, getAddressStreetRegex, getAddressUnitRegex } = require("../../utils/regex");
const { body, validationResult } = require("express-validator");

/* Validate user address */
const validateAddress = [
  body("firstName")
    .trim()
    .escape()
    .notEmpty().withMessage("First name is required")
    .isLength({ max: 30 }).withMessage("First name must be less than 30 characters")
    .matches(getFirstNameRegex()).withMessage("First name contains invalid characters"),
  body("lastName")
    .trim()
    .escape()
    .notEmpty().withMessage("Last name is required")
    .isLength({ max: 30 }).withMessage("Last name must be less than 30 characters")
    .matches(getLastNameRegex()).withMessage("Last name contains invalid characters"),
  body("street")
    .trim()
    .escape()
    .notEmpty().withMessage("Street address is required")
    .isLength({ min: 3, max: 100 }).withMessage("Street address must be between 3 and 100 characters")
    .matches(getAddressStreetRegex()).withMessage("Street address contains invalid characters"),
  body("addressUnit")
    .optional()
    .trim()
    .escape()
    .isLength({ max: 50 }).withMessage("Address unit must be less than 50 characters")
    .matches(getAddressUnitRegex()).withMessage("Address unit contains invalid characters"),
  body("city")
    .trim()
    .escape()
    .notEmpty().withMessage("City is required")
    .isLength({ min: 2, max: 50 }).withMessage("City must be between 2 and 50 characters")
    .matches(getAddressCityRegex()).withMessage("City contains invalid characters"),
  body("state")
    .trim()
    .escape()
    .notEmpty().withMessage("State is required")
    .isLength({ min: 2, max: 50 }).withMessage("State must be between 2 and 50 characters")
    .matches(getAddressStateRegex()).withMessage("State contains invalid characters"),
  body("zipCode")
    .trim()
    .escape()
    .notEmpty().withMessage("Zip code is required")
    .matches(getAddressZipCodeRegex()).withMessage("Zip code must be a valid format (e.g., 12345 or 12345-6789)"),
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

module.exports = validateAddress;
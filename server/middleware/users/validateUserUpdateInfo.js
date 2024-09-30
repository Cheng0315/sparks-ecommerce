const { getFirstNameRegex, getLastNameRegex, getUsernameRegex } = require("../../utils/regex");
const { body, validationResult } = require("express-validator");

/* Validate user's input for first name, last name, and username */
const validateUserUpdateInfo = [
  body("firstName")
    .trim()
    .isAlpha().withMessage("Invalid firstName")
    .escape()
    .matches(getFirstNameRegex()).withMessage("Invalid firstName"),
  body("lastName")
    .trim()
    .isAlpha().withMessage("Invalid lastName")
    .escape()
    .matches(getLastNameRegex()).withMessage("Invalid lastName"),
  body("username")
    .trim()
    .escape()
    .matches(getUsernameRegex()).withMessage("Invalid username"),
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errorMessage: errors.array()[0].msg });
      }
      next();
    } catch (error) {
      res.status(500).json({ errorMessage: 'Internal Server Error' });
    }
    
  }
];

module.exports = validateUserUpdateInfo;
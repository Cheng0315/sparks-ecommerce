const { getEmailRegex } = require("../../utils/regex");
const { User } = require("../../models");
const { body, validationResult } = require("express-validator");

/* Validate new email */
const validateNewEmail = [
  body("email")
    .isEmail().withMessage("Invalid email")
    .normalizeEmail()
    .matches(getEmailRegex()).withMessage("Invalid email"),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errorMessage: errors.array()[0].msg });
      }

      const { email } = req.body;
      const user = await User.findOne({ where: { email }});
      if (user) {
        return res.status(409).json({ errorMessage: "Email already in use" });
      }

      next();
    } catch (error) {
      res.status(500).json({ errorMessage: 'Internal Server Error' });
    }
  }
];

module.exports = validateNewEmail;
const { getEmailRegex } = require("../../utils/regex");
const { User } = require("../../models");

/* Validate new email */
const validateNewEmail = async (req, res, next) => {
  const { email } = req.body;

  const emailRegex = getEmailRegex();
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ errorMessage: 'Invalid email' });
  }

  const user = await User.findOne({ where: { email }});
  if (user) return res.status(409).json({errorMessage: "Email already in use"});

  next();
}

module.exports = validateNewEmail;
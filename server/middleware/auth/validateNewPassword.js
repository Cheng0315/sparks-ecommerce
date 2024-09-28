const { getPasswordRegex } = require("../../utils/regex");

/* Validate new password */
const validateNewPassword = async (req, res, next) => {
  const { newPassword } = req.body;

  const passwordRegex = getPasswordRegex();
  if (!newPassword || !passwordRegex.test(newPassword)) {
    return res.status(400).json({ errorMessage: 'Invalid password' });
  }

  next();
}

module.exports = validateNewPassword;
const { getPasswordRegex } = require("../../utils/regex");

/* Validate new password */
const validateNewPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;

    const passwordRegex = getPasswordRegex();
    if (!newPassword || !passwordRegex.test(newPassword)) {
      return res.status(400).json({ errorMessage: 'Invalid password' });
    }

    next();
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
}

module.exports = validateNewPassword;
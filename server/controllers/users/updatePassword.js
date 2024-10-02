const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { sanitizeUser } = require("../../utils/users")

/* Update password */
/* @route = PATCH /api/users/:id/update-password */
const updatePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const userId = req.userId;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findOne({ where: { userId }});

    user.password = hashedPassword;
    await user.save();

    const sanitizedUser = sanitizeUser(user); //remove user's password and token

    res.status(200).send("Sucessfully update password");
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = updatePassword;
const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { sanitizeUser } = require("../../utils/user");

/* Update password */
/* @route = PATCH /api/users/:id/update-password */
const updateUserPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const userId = req.authUser.userId;;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findOne({ where: { userId }});

    user.password = hashedPassword;
    await user.save();

    const sanitizedUser = sanitizeUser(user); //remove user's password and token

    res.status(200).json({
      user: sanitizedUser,
      message: "Your password has been successfully updated"
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}

module.exports = updateUserPassword;
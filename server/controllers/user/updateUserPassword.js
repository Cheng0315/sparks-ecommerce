const bcrypt = require("bcrypt");
const { User } = require("../../models");

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

    res.status(200).json({ message: "Your password has been successfully updated" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}

module.exports = updateUserPassword;
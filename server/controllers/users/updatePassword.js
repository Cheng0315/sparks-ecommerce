const bcrypt = require("bcrypt");
const {User} = require("../../models");

/* Update password */
/* @route = PATCH /api/users/:id/update-password */
const updatePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { id } = req.params;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findOne({ where: { id }});

    user.password = hashedPassword;
    await user.save();

    const userData = user.toJSON();
    delete userData.password;
    delete userData.token;

    res.status(200).json({
      user: userData
    });
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = updatePassword;
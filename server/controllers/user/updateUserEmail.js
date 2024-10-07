const { User } = require("../../models");
const { sanitizeUser } = require("../../utils/user")

/* Update email */
/* @route = PATCH /api/users/:id/update-email */
const updateUserEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const userId = req.userId;

    const user = await User.findOne({ where: { userId }});

    user.email = email;
    await user.save();

    const sanitizedUser = sanitizeUser(user); //remove user's password and token

    res.status(200).json({
      user: sanitizedUser,
      message: "Your email has been successfully updated"
    });
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = updateUserEmail;
const { User } = require("../../models");
const { sanitizeUser } = require("../../utils/users")

/* Update email */
/* @route = PATCH /api/users/:id/update-email */
const updateEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const userId = req.userId;

    const user = await User.findOne({ where: { userId }});

    user.email = email;
    await user.save();

    const sanitizedUser = sanitizeUser(user); //remove user's password and token

    res.status(200).json({
      user: sanitizedUser
    });
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = updateEmail;
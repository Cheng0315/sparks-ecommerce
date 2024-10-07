const { User } = require("../../models");
const { sanitizeUser } = require("../../utils/user")

/* Update first name, last name, and username */
/* @route = PATCH /api/users/:id/update-info */
const updateUserInfo = async (req, res) => {
  try {
    const { firstName, lastName, username } = req.body;
    const userId = req.userId;
    
    const user = await User.findOne({ where: { userId }});

    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    await user.save();

    const sanitizedUser = sanitizeUser(user); //remove user's password and token

    res.status(200).json({
      user: sanitizedUser,
      message: "Your information has been successfully updated"
    });
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = updateUserInfo;
const { User } = require("../../models");
const { sanitizeUser } = require("../../utils/users")

/* Update first name, last name, and username */
/* @route = PATCH /api/users/:id/update-info */
const updateInfo = async (req, res) => {
  try {
    const { firstName, lastName, username } = req.body;
    
    const id = req.id;

    const user = await User.findOne({ where: { id }});

    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    await user.save();

    const sanitizedUser = sanitizeUser(user); //remove user's password and token

    res.status(200).json({
      user: sanitizedUser
    });
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = updateInfo;
const { User } = require("../../models");

/* Update email */
/* @route = PATCH /api/users/:id/update-email */
const updateEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const { id } = req.params;

    const user = await User.findOne({ where: { id }});

    user.email = email;
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

module.exports = updateEmail;
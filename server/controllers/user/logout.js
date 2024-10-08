const { User } = require("../../models");

/* Logout the user*/
/* @route = DELETE /api/users/logout */
const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    const user = await User.findOne({
      where: { refreshToken },
      attributes: { exclude: ["password", "refreshToken"] }
    });

    if (!user) return res.status(404).json({errorMessage: "User not found"});
    
    res.clearCookie("refreshToken");
    user.refreshToken = null;
    await user.save();
    res.status(200).send({message: "Successfully logged out"});
  } catch (error) {
    console.error('Error logging out:', error);
  }
}

module.exports = logout;
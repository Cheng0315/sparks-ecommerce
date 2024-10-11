const { User } = require("../../models");
const { sanitizeUser } = require("../../utils/user")
const { generateAccessJWT, generateRefreshJWT } = require("../../utils/jwtUtils");


/* Update user role */
/* @route = PATCH /api/users/:id/update-role */
const updateUserRole = async (req, res) => {
  try {
    const userId = req.authUser.userId;;

    const user = await User.findOne({ where: { userId }});
    if (!user) return res.status(404).json({errorMessage: "User not found"});
    if (user.role === "seller") return res.status(409).json({errorMessage: "You are already registered as a seller"});

    user.role = "seller";

    const userPayload = {userId: user.userId, role: user.role};
    const accessToken = generateAccessJWT(userPayload);
    const refreshToken = generateRefreshJWT(res, userPayload);

    user.refreshToken = refreshToken;
    await user.save();

    const sanitizedUser = sanitizeUser(user); //remove user's password and refresh token

    res.status(200).json({
      user: sanitizedUser,
      token: accessToken,
      message: "Your role has been successfully updated"
    });
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = updateUserRole;
const { User } = require("../../models");
const { generateAccessJWT, generateRefreshJWT } = require("../../utils/jwtUtils");
const { sanitizeUser } = require("../../utils/user")

/* Renew access token and refresh token */
/* @route = POST /api/users/renew-tokens */
const renewTokens = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    const user = await User.findOne({where: { refreshToken }});

    if (!user) return res.status(404).json({errorMessage: "Unauthorized"});

    const userPayload = {userId: user.userId, role: user.role};
    const newAccessToken = generateAccessJWT(userPayload);
    const newRefreshToken = generateRefreshJWT(res, userPayload);

    user.refreshToken = newRefreshToken;
    await user.save(); // update refresh token in user's token field in database

    const sanitizedUser = sanitizeUser(user); //remove user's password and token

    res.status(200).json({
      user: sanitizedUser,
      accessToken: newAccessToken
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = renewTokens;
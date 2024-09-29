const { User } = require("../../models");
const { generateAccessJWT, generateRefreshJWT } = require("../../utils/jwtUtils");
const { sanitizeUser } = require("../../utils/users")

/* Renew access token and refresh token */
/* @route = POST /api/users/renew-tokens */
const renewTokens = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    const user = await User.findOne({where: { token: refreshToken }});

    if (!user) return res.status(404).json({errorMessage: "Unauthorized"});
    
    const newAccessToken = generateAccessJWT(user.userId);
    const newRefreshToken = generateRefreshJWT(res, user.userId);

    user.token = newRefreshToken;
    await user.save(); // update refresh token in user's token field in database

    const sanitizedUser = sanitizeUser(user); //remove user's password and token

    res.status(200).json({
      user: sanitizedUser,
      token: newAccessToken
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = renewTokens;
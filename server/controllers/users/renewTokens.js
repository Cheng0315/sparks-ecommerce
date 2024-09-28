const { User } = require("../../models");
const { generateAccessJWT, generateRefreshJWT } = require("../../utils/jwtUtils");

/* Renew access token and refresh token */
/* @route = POST /api/users/renew-tokens */
const renewTokens = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    const user = await User.findOne({
      where: { token: refreshToken },
      attributes: { exclude: ["password", "token"] }
    });

    if (!user) return res.status(404).json({errorMessage: "Unauthorized"});

    const userData = user.toJSON();
    
    const newAccessToken = generateAccessJWT(user.id);
    const newRefreshToken = generateRefreshJWT(res, user.id);

    user.token = newRefreshToken;
    await user.save(); // update refresh token in user's token field in database
    res.status(200).json({
      user: userData,
      token: newAccessToken
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = renewTokens;
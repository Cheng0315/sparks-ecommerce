const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { generateAccessJWT, generateRefreshJWT } = require("../../utils/jwtUtils");
const { sanitizeUser } = require("../../utils/user")

/* User login */
/* @route = POST /api/users/login */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({where: {email}});
    if (!user) return res.status(400).json({errorMessage: "Invalid email or password"});
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).json({errorMessage: "Invalid email or password"});
    
    const accessToken = generateAccessJWT(user.userId);
    const refreshToken = generateRefreshJWT(res, user.userId);

    user.refreshToken = refreshToken; // add refresh token to user's token field in database
    await user.save();

    const sanitizedUser = sanitizeUser(user); // remove user's token and password

    res.status(200).json({
      user: sanitizedUser,
      accessToken: accessToken
    });
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = login;
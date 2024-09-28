const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { generateAccessJWT, generateRefreshJWT } = require("../../utils/jwtUtils");

/* User login */
/* @route = POST /api/users/login */
const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});
    if (!user) return res.status(400).json({errorMessage: "Invalid email or password"});
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).json({errorMessage: "Invalid email or password"});
    
    const accessToken = generateAccessJWT(user.id);
    const refreshToken = generateRefreshJWT(res, user.id);

    user.token = refreshToken; // add refresh token to user's token field in database
    await user.save();

    const userData = user.toJSON();
    delete userData.password;
    delete userData.token;

    res.status(200).json({
      user: userData,
      token: accessToken
    });
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = login;
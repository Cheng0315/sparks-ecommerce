const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const {User} = require("../models");
const {generateAccessJWT, generateRefreshJWT, verifyRefreshToken} = require("../middleware/auth.js");

/* Register the user */
/* @route = POST /api/users/register */
const register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    /* check if email or username exists in database */
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          { username }
        ]
      }
    });

    /* create user if email and username doesn't exist in database */
    if (user) {
      return res.status(409).json({errorMessage: "Email or username already exist. Please try logging in or use a different email or username"});
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword
      });

      /* Generate tokens after creating new user */
      if (newUser) {
        const userData = newUser.toJSON();
        delete userData.password;
        delete userData.token;

        const accessToken = generateAccessJWT(newUser.id);
        const refreshToken = generateRefreshJWT(res, newUser.id);

        await newUser.update({token: refreshToken}); // add refresh token to user's token field in database
        res.status(201).json({token: accessToken, user: userData});
      }
    }
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

/* User login */
/* @route = POST /api/users/login */
const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});
    if (!user) return res.status(400).json({errorMessage: "Invalid email or password"});
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).json({errorMessage: "Invalid email or password"});
    
    const userData = user.toJSON();
    delete userData.password;
    delete userData.token;

    const accessToken = generateAccessJWT(user.id);
    const refreshToken = generateRefreshJWT(res, user.id);

    await user.update({token: refreshToken}); // add refresh token to user's token field in database
    res.status(200).json({
      user: userData,
      token: accessToken
    });
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

/* View user's profile */
/* @route = GET /api/users/:id */
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password", "token", "newsletterSubscription", "newsletterCouponUsed"] }
    });

    if (!user) return res.status(404).json({errorMessage: "Invalid user id"});
    const userData = user.toJSON();
    res.status(200).json(userData);
  } catch (error) {
    res.status(404).json({errorMessage: error.message});
  }
}


/* Renew access token and refresh token */
/* @route = POST /api/users/renew-tokens */
const renewTokens = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(403).json({errorMessage: "Unauthorized"});

    verifyRefreshToken(refreshToken);
    const user = await User.findOne({
      where: { token: refreshToken },
      attributes: { exclude: ["password", "token"] }
    });

    if (!user) return res.status(404).json({errorMessage: "Unauthorized"});

    const userData = user.toJSON();
    
    const newAccessToken = generateAccessJWT(user.id);
    const newRefreshToken = generateRefreshJWT(res, user.id);

    await user.update({token: newRefreshToken}); // update refresh token in user's token field in database
    res.status(200).json({
      user: userData,
      token: newAccessToken
    });
  } catch (error) {
    res.status(500).json({errorMessage: "Error renewing tokens"});
  }
}

module.exports = {register, login, getUser, renewTokens};
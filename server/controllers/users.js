const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const {User} = require("../models");
const {generateAccessJWT, generateRefreshJWT} = require("../middleware/auth.js");

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
      return res.status(409).json({error: "Email or username already exist. Please try logging in or use a different email or username"});
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

      /* If user exists, generate tokens */
      if (newUser) {
        const userData = newUser.toJSON();
        delete userData.password;

        const accessToken = generateAccessJWT(newUser.id);
        const refreshToken = generateRefreshJWT(res, newUser.id);

        await newUser.update({token: refreshToken});
        userData.token = accessToken;
        res.status(201).json(userData);
      }
    }
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

/* User login */
/* @route = POST /api/users/login */
const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});
    if (!user) return res.status(400).json({error: "Invalid email or password"});
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).json({error: "Invalid email or password"});
    
    const userData = user.toJSON();
    delete userData.password;

    const accessToken = generateAccessJWT(user.id);
    const refreshToken = generateRefreshJWT(res, user.id);

    await user.update({token: refreshToken});
    userData.token = accessToken;
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

/* View user's profile */
/* @route = GET /api/users/:id */
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] }
    });

    if (!user) return res.status(404).json({error: "Invalid user id"});
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({error: error.message});
  }
}

module.exports = {register, login, getUser};
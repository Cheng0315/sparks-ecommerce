const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const {User} = require("../models");
const {generateJWT} = require("../utils/jsonWebToken.js");

/* Register the user */
/* @route = POST /api/users */
const registerUser = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
 
  try {
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
      return res.status(500).json({error: "Email or username already exist. Please try logging in or use a different email or username"});
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

      if (newUser) {
        delete newUser.dataValues.password;
        generateJWT(res, newUser.id)
        res.status(201).json(newUser);
      }
    }
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

module.exports = {registerUser};
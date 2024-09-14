const bcrypt = require("bcrypt");
const { Op } = require('sequelize');
const {User} = require("../models");


/* Register the user */
/* @route = POST /api/users */
const registerUser = async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;

  /* validate email */
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const emailIsValid = emailRegex.test(email);

  /* Validate username */
  const userNameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  const userNameIsValid = userNameRegex.test(userName);

  /* Respond with error code 500 and error message if email or username is invalid*/
  if (!emailIsValid || !userNameIsValid) {
    return res.status(500).json({error: "Invalid email or username"});
  }
  
  try {
    /* check if email or username exists in database */
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          { userName }
        ]
      }
    });

    /* create user if email and username doesn't exist in database */
    if (user) {
      return res.status(500).json({error: "Email or username already exist. Please try logging in or use a different email or username"});
    } else {
      const salt = await bcrypt.genSalt();

      bcrypt.hash(password, salt, async (err, hashedPassword) => {
        if (err) {
          res.status(500).json({error: "An error has occured. Please try again later"});
        } else {
          const newUser = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword
          });
          res.status(201).json(newUser);
        }
      })
    }
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

module.exports = {registerUser};
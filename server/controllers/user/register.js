const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { User } = require("../../models");
const { generateAccessJWT, generateRefreshJWT } = require("../../utils/jwtUtils");
const { sanitizeUser } = require("../../utils/user")

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
        const userPayload = {userId: newUser.userId, isSeller: newUser.isSeller};
        const accessToken = generateAccessJWT(userPayload);
        const refreshToken = generateRefreshJWT(res, userPayload);

        newUser.refreshToken = refreshToken; // add refresh token to user's token field in database
        newUser.save();

        const sanitizedUser = sanitizeUser(newUser);

        res.status(201).json({user: sanitizedUser, accessToken: accessToken});
      }
    }
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = register;
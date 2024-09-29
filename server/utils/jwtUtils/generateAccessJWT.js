const jwt = require("jsonwebtoken");

/* Generate Access Token */
const generateAccessJWT = (userId) => {
  try {
    return jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
  } catch (error) {
    throw error;
  }
};

module.exports = generateAccessJWT;

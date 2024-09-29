const jwt = require("jsonwebtoken");

/* Generate Access Token */
const generateAccessJWT = (id) => {
  try {
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
  } catch (error) {
    throw error;
  }
};

module.exports = generateAccessJWT;

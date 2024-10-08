const jwt = require("jsonwebtoken");

/* Generate Access Token */
const generateAccessJWT = (userPayload) => {
  try {
    return jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
  } catch (error) {
    throw error;
  }
};

module.exports = generateAccessJWT;

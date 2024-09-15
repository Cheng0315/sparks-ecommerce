const jwt = require("jsonwebtoken");

/* Generate JWT */
const generateJWT = async (res, userId) => {
  const token = jwt.sign({userId}, process.env.JWT_ACCESS_TOKEN, { 
    expiresIn: "1d"
  });

  /* Store jwt in cookie to send it to client */
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 3600000
  });
};

module.exports = {generateJWT};
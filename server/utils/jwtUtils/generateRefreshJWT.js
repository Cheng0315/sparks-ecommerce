const jwt = require("jsonwebtoken");

/* Generate Refresh Token */
const generateRefreshJWT = (res, id) => {
  try {
    const token = jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET, { 
      expiresIn: "10d"
    });

    /* Store refresh token in cookie to send it to client */
    res.cookie("refreshToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 10 * 24 * 60 * 60 * 1000 // expire in 10 days
    });
    
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = generateRefreshJWT;
const jwt = require("jsonwebtoken");

/* Generate Refresh Token */
const generateRefreshJWT = (res, userPayload) => {
  try {
    const refreshToken = jwt.sign(userPayload, process.env.REFRESH_TOKEN_SECRET, { 
      expiresIn: "10d"
    });

    /* Store refresh token in cookie to send it to client */
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 10 * 24 * 60 * 60 * 1000 // expire in 10 days
    });
    
    return refreshToken;
  } catch (error) {
    throw error;
  }
};

module.exports = generateRefreshJWT;
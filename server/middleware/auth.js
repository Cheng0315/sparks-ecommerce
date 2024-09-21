const jwt = require("jsonwebtoken");

/* Authenticate Token from client */
const verifyJWT = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
   
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verifiedUser;
    next();
  } catch (error) {
    res.status(401).json({error: error.message});
  }
}

/* Authenticate refresh token */
const verifyRefreshToken = (refreshToken) => {
  try {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
  } catch (error) {
    throw error;
  }
}

/* Generate Access Token */
const generateAccessJWT = (userId) => {
  try {
    return jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
  } catch (error) {
    throw error;
  }
  
};

/* Generate Refresh Token */
const generateRefreshJWT = (res, userId) => {
  try {
    const token = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, { 
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

module.exports = {verifyJWT, generateAccessJWT, generateRefreshJWT, verifyRefreshToken};
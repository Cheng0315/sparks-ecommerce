const jwt = require("jsonwebtoken");

/* Authenticate Token from client */
const verifyAccessToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({errorMessage: "Access Denied"});
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).json({errorMessage: "Access Denied"});
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({errorMessage: "Failed to verify token"});
  }
}

module.exports = verifyAccessToken;
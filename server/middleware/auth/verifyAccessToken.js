const jwt = require("jsonwebtoken");

/* Authenticate Token from client */
const verifyAccessToken = async (req, res, next) => {
  try {
    const accessToken = req.headers["authorization"]?.split(" ")[1];
    if (!accessToken) return res.status(401).json({errorMessage: "Access Denied"});

    req.authUser = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (req.params.userId && parseInt(req.params.userId) !== req.authUser.userId) {
      return res.status(401).json({errorMessage: "Bad Request: Invalid User ID"});
    }
    
    next();
  } catch (error) {
    res.status(401).json({errorMessage: "Access Denied"});
  }
}

module.exports = verifyAccessToken;
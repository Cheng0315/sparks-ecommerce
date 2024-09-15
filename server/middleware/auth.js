const jwt = require("jsonwebtoken");

/* Authenticate Token from client */
const verifyToken = (req, res, next) => {
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
    res.status(500).json({error: error.message});
  }
}

module.exports = {verifyToken};
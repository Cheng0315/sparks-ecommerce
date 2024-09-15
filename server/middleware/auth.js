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

const generateJWT = async (res, userId) => {
  const token = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, { 
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

module.exports = {verifyToken, generateJWT};
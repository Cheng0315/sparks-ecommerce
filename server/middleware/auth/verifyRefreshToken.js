const jwt = require("jsonwebtoken");

/* Authenticate refresh token */
const verifyRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(403).json({errorMessage: "Unauthorized"});

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({errorMessage: "User not found"});
      next();
    });
  } catch (error) {
    res.status(401).json({errorMessage: "Failed to verify token"});
  }
}

module.exports = verifyRefreshToken;
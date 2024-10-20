const jwt = require("jsonwebtoken");

/* Authenticate product token from client */
const verifyProductToken = async (req, res, next) => {
  try {
    const productToken = req.body.productToken;
    if (!productToken) return res.status(401).json({errorMessage: "Access Denied"});

    req.productDetails = jwt.verify(productToken, process.env.PRODUCT_TOKEN_SECRET);
    next();
  } catch (error) {
    res.status(401).json({errorMessage: "Access Denied"});
  }
}

module.exports = verifyProductToken;
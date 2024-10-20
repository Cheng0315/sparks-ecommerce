const jwt = require("jsonwebtoken");

/* Generate product token */
/* @route = POST /api/products/validate-details */
const createProductToken = async (req, res) => {
  const productDetails = req.body;
  
  try {
    const productToken =  jwt.sign(productDetails, process.env.PRODUCT_TOKEN_SECRET, { expiresIn: "1m" });
    res.status(201).json({ productToken });
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = createProductToken;
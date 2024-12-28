const { Product } = require("../../models");
const { sanitizeProduct } = require("../../utils/product");

/* Get all the products that belong to the user */
/* @route = GET /api/products */
const getAllProductsBelongToUser = async (req, res) => {
  try {
    if (req.authUser.role !== "seller") return res.status(403).json({errorMessage: "Access Denied"});

    const products = await Product.findAll({
      where: { userId: req.authUser.userId }
    });

    if (!products || products.length === 0) {
      return res.status(404).json({errorMessage: "No products found"});
    }

    const sanitizedProductsArray = products.map(product => sanitizeProduct(product));
    
    res.status(200).json({products: sanitizedProductsArray});
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = getAllProductsBelongToUser;

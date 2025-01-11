const { Product } = require("../../models");
const { sanitizeProduct } = require("../../utils/product");

/* Get the product details */
/* @route = GET /api/products/:productId */
const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { productId: req.params.productId } 
    });

    if (!product) return res.status(404).json({errorMessage: "Product not found"});
    
    const sanitizedProduct = sanitizeProduct(product);

    res.status(200).json({product: sanitizedProduct});
  } catch (error) {
    res.status(404).json({errorMessage: error.message});
  }
}

module.exports = getProduct;

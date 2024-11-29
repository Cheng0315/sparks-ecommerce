const { Product } = require("../../models");
const { sanitizeProduct } = require("../../utils/product");

/* View product details */
/* @route = GET /api/products/:productId */
const getProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);

    if (isNaN(productId)) return res.status(404).json({errorMessage: "Invalid product id"});

    const product = await Product.findOne({
      where: { productId }
    });

    if (!product) return res.status(404).json({errorMessage: "Invalid product id"});
    
    const sanitizedProduct = sanitizeProduct(product);
    res.status(200).json({product: sanitizedProduct});
  } catch (error) {
    res.status(404).json({errorMessage: error.message});
  }
}

module.exports = getProduct;

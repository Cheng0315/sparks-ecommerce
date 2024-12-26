const { Product } = require("../../models");
const { sanitizeProduct } = require("../../utils/product");

/* Update product details */
/* @route = PATCH /api/products/:productId */
const updateProductDetails = async (req, res) => {
  try {
    if (!req.imageFile && Object.keys(req.body).length < 1) {
      return res.status(400).json({ errorMessage: "Product fields and files cannot be empty" });
    }

    const product = await Product.findOne({ where: { productId: req.params.productId }});
    if (!product) return res.status(404).json({ errorMessage: "Product not found" });

    const fieldsToUpdate = ["name", "description", "condition", "stockQuantity", "categoryId", "imageUrl"];
    
    fieldsToUpdate.forEach(field => {
      if (req.body[field]) product[field] = req.body[field];
    });

    if (req.body.price) product.priceInCents = req.body.price * 100;

    await product.save();

    const sanitizedProduct = sanitizeProduct(product);

    res.status(200).json({
      product: sanitizedProduct,
      message: "Your product's details has been successfully updated"
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}

module.exports = updateProductDetails;
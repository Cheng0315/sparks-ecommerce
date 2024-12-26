const path = require("path");
const fs = require("fs");
const { Product } = require("../../models");

/* Update product image */
const deleteProductImage = async (req, res, next) => {
  try {
    if (!req.imageFile) return next();

    const product = await Product.findOne({ where: { productId : req.params.productId }});
    if (!product) return res.status(404).json({ errorMessage: "Product not found" });
    
    const oldImageUrl = product.imageUrl;
    const oldImagePath = path.join(__dirname, "../../public/assets", path.basename(oldImageUrl)); 

    // Delete the old image if it exists
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }

    next();
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

module.exports = deleteProductImage;
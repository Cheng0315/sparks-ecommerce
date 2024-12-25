const path = require("path");
const { generateProductFilename } = require("../../utils/product");
const fs = require("fs");
const { Product } = require("../../models");

/* Update product image */
const updateProductImage = async (req, res, next) => {
  try {
    if (!req.imageFile && Object.keys(req.body).length > 0) {
      return next();
    }

    const product = await Product.findOne({ where: { productId : req.params.productId }});
    if (!product) return res.status(404).json({ errorMessage: "Product not found" });
    
    const oldImageUrl = product.imageUrl;
    const oldImagePath = path.join(__dirname, "../../public/assets", path.basename(oldImageUrl)); 

    // Delete the old image if it exists
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }

    const imageFile = req.imageFile;
    const newFilename = generateProductFilename(imageFile.originalFilename);
    const newImagePath = path.join(__dirname, "../../public/assets", newFilename);

    /* Move the image file to the public/assets directory */
    fs.rename(imageFile.filepath, newImagePath, (err) => {
      if (err) {
        return res.status(500).json({ errorMessage: "Error saving file" });
      }

      req.body.imageUrl = `/public/assets/${newFilename}`;
      next();
    });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

module.exports = updateProductImage;
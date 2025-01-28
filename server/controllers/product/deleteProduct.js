const { Product } = require("../../models");
const path = require("path");
const fs = require("fs");

/* Delete product */
/* @route = DELETE /api/products/:productId */
const deleteProduct = async (req, res) => {
  try { 
    const product = await Product.findOne({ where: { productId: req.params.productId }});

    if (!product) {
      return res.status(404).json({ errorMessage: "Product not found" });
    }

    const oldImageUrl = product.imageUrl;
    const oldImagePath = path.join(__dirname, "../../public/assets", path.basename(oldImageUrl)); 
  
    // Delete the old image if it exists
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
    
    await product.destroy();
    
    res.status(200).json({ 
      message: "Product has been successfully removed" 
    });
  } catch (error) { 
    res.status(500).json({ errorMessage: error.message }); 
  }
}

module.exports = deleteProduct;
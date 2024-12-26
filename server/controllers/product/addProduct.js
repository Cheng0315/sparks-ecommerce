const { Product } = require("../../models");
const { sanitizeProduct } = require("../../utils/product")

/* Add product */
/* @route = POST /api/products */
const addProduct = async (req, res) => {
  try {
    if (!req.imageFile) {
      return res.status(400).json({ errorMessage: "Error: Missing image file" });
    }

    const { name, description, condition, stockQuantity, categoryId, price, imageUrl } = req.body;
    const priceInCents = price * 100;
    const user = req.authUser;
    
    const newProduct = await Product.create({
      name,
      description,
      condition,
      priceInCents,
      stockQuantity,
      categoryId,
      imageUrl,
      userId: user.userId
    });

    const sanitizedProduct = sanitizeProduct(newProduct);

    res.status(201).json({
      product: sanitizedProduct,
      message: `Successfully added ${sanitizedProduct.name}`
    });
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = addProduct;
const { Product } = require("../../models");

/* Add product */
/* @route = POST /api/products */
const addProduct = async (req, res) => {
  try {
    const { name, description, condition, stockQuantity, categoryId } = req.body;
    const priceInCents = req.body.price * 100;
    const user = req.authUser;
    
    const newProduct = await Product.create({
      name,
      description,
      condition,
      priceInCents,
      stockQuantity,
      categoryId,
      userId: user.userId,
      imageUrl: "ImageUrl"
    });

    res.status(201).json({
      product: newProduct,
      message: "Successfully added product"
    });
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = addProduct;
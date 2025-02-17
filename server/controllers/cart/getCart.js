const { Cart, CartItem, Product } = require("../../models");

const getCart = async (req, res) => {
  try {
    const user = req.authUser;

    const products = await Product.findAll({
      include: {
        model: CartItem,
        required: true,
        attributes: ["quantity"],
        include: {
          model: Cart,
          where: { userId: user.userId },
          required: true,
        }
      }
    });

    const cart = products.map((product) => ({
      productId: product.productId,
      name: product.name,
      description: product.description,
      condition: product.condition,
      price: product.priceInCents / 100,
      stockQuantity: product.stockQuantity,
      categoryId: product.categoryId,
      imageUrl: product.imageUrl,
      quantity: product.CartItems[0].quantity // get quantity from CartItem
    }));

    res.status(200).json({cart});
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = getCart;
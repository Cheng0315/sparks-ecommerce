const { Cart, CartItem, Product } = require("../../models");

/* Get all the items belong to the user's cart */
/* @route = GET /api/cart */
const getUserCartItems = async (req, res) => {
  try {
    const user = req.authUser;

    /* Find all the products that the user has in the cart */
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

    /* Sanitize the products, update the price, and add quantity */
    const cartItems = products.map((product) => ({
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

    res.status(200).json({ cartItems });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = getUserCartItems;
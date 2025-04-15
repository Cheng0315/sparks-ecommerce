const { Cart, CartItem, Product } = require("../../models");

/* Update the quntity in CartItem */
/* @route = PATCH /api/cart/items/:productId */
const updateCartItemQuantity = async (req, res) => {
  try {
    const user = req.authUser;
    const { productId } = req.params;
    const { quantity } = req.body;

    const cartItem = await CartItem.findOne({
      include: {
        model: Cart,
        where: { userId: user.userId }, 
        required: true,
      },
      where: { productId },
    });

    if (!cartItem) {
      return res.status(404).json({ errorMessage: "Cart item not found." });
    }

    await cartItem.update({ quantity });

    res.status(200).json({ item: { productId, quantity }});
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = updateCartItemQuantity;
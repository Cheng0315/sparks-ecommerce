const { Cart, CartItem } = require("../../models");

/* Add cart item */
/* @route = POST /api/cart */
const addCartItem = async (req, res) => {
  try {

    const { productId, quantity } = req.body;
    const user = req.authUser;

    let cart = await Cart.findOne({ where: { userId: user.userId } });

    if (!cart) {
      const newCart = await Cart.create({ userId: user.userId });
      cart = newCart;
    }

    const existingCartItem = await CartItem.findOne({ where: { cartId: cart.cartId, productId } });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      await CartItem.create({
        cartId: cart.cartId,
        productId,
        quantity
      });
    }

    res.status(201).json({
      message: "Successfully added item to cart"
    });
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = addCartItem;
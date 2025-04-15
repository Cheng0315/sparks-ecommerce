const { Cart, CartItem, Product, sequelize } = require("../../models");

/* Delete cart item */
/* @route = DELETE /api/cart/items/:productId */
const deleteCartItem = async (req, res) => {

  try {
    const { productId } = req.params;
    const user = req.authUser;

    await sequelize.transaction(async (transaction) => {

      let userCart = await Cart.findOne({
        where: { userId: user.userId },
        transaction
      });
  
      if (!userCart) {
        return res.status(404).json({ errorMessage: "User cart not found" });
      }

      let cartItem = await CartItem.findOne({
        where: { cartId: userCart.cartId, productId },
        transaction
      });

      if (!cartItem) {
        return res.status(404).json({ errorMessage: "Cart item not found" });
      } 

      await cartItem.destroy({ transaction });
    });
    
    res.status(200).json({
      message: "Successfully removed item from cart"
    });
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = deleteCartItem;
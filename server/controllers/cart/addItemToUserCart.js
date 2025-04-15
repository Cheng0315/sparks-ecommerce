const { Cart, CartItem, Product, sequelize } = require("../../models");

/* Add item to the user's cart */
/* @route = POST /api/cart/items */
const addItemToUserCart = async (req, res) => {

  try {
    const { productId, quantity } = req.body;
    const user = req.authUser;

    const item = await sequelize.transaction(async (transaction) => {
      const product = await Product.findOne({
        where: { productId },
        transaction
      });
  
      if (!product) { 
        return res.status(404).json({ errorMessage: "Product not found" });
      }

      let userCart = await Cart.findOne({
        where: { userId: user.userId },
        transaction
      });
  
      if (!userCart) {
        userCart = await Cart.create({ userId: user.userId }, { transaction });
      }

      let cartItem = await CartItem.findOne({
        where: { cartId: userCart.cartId, productId },
        transaction
      });

      if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save({ transaction });
      } else {
        cartItem = await CartItem.create(
          {
            cartId: userCart.cartId,
            productId,
            quantity
          },
          { transaction }
        );
      }
  
      const resultItem = { ...product.dataValues, quantity: cartItem.quantity };
      delete resultItem.userId;
      return resultItem;
    });
    
    res.status(201).json({
      item,
      message: "Successfully added item to cart"
    });
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = addItemToUserCart;
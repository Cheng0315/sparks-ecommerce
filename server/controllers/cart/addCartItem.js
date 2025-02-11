const { Cart, CartItem, Product, sequelize } = require("../../models");

/* Add cart item */
/* @route = POST /api/cart */
const addCartItem = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { productId, quantity } = req.body;
    const user = req.authUser;

    const product = await Product.findOne({
      where: { productId },
      transaction
    });

    if (!product) { 
      await transaction.rollback();
      return res.status(404).json({ errorMessage: "Product not found" });
    }

    let cart = await Cart.findOne({
      where: { userId: user.userId },
      transaction
    });

    if (!cart) {
      cart = await Cart.create({ userId: user.userId }, { transaction });
    }

    let cartItem = await CartItem.findOne({
      where: { cartId: cart.cartId, productId },
      transaction
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save({ transaction });
    } else {
      cartItem = await CartItem.create({
        cartId: cart.cartId,
        productId,
        quantity
      },
      { transaction }
    );
    }

    await transaction.commit();

    const item = {...product.dataValues, quantity: cartItem.quantity};
    delete item.userId;
    
    res.status(201).json({
      item,
      message: "Successfully added item to cart"
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = addCartItem;
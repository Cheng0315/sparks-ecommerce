const { Cart, CartItem, Product, sequelize } = require("../../models");

/* Add item to the user's cart */
/* @route = POST /api/cart */
const addItemToUserCart = async (req, res) => {
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
      cartItem = await CartItem.create({
        cartId: userCart.cartId,
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

module.exports = addItemToUserCart;
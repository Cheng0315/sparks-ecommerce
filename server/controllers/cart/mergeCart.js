const { Cart, CartItem, Product, sequelize } = require("../../models");

/* Merge the guest cart to the user cart */
/* @route = PATCH /api/cart/merge */
const mergeCart = async (req, res) => {
  try {
    const guestItems = req.body.items;
    const user = req.authUser;

    // Wrap the complete cart merge logic into a single transaction
    await sequelize.transaction(async (transaction) => {
      let userCart = await Cart.findOne({
        where: { userId: user.userId },
        transaction,
      });
      
      if (!userCart) {
        userCart = await Cart.create({ userId: user.userId }, { transaction });
      }
      
      for (const guestItem of guestItems) {
        const { productId, quantity } = guestItem;
        
        const product = await Product.findOne({
          where: { productId },
          transaction,
        });
        
        // Skip to next iteration if the product does not exists
        if (!product) {
          continue;
        }
        
        let cartItem = await CartItem.findOne({
          where: { cartId: userCart.cartId, productId },
          transaction,
        });
        
        if (cartItem) {
          cartItem.quantity += quantity;
          await cartItem.save({ transaction });
        } else {
          cartItem = await CartItem.create({
            cartId: userCart.cartId,
            productId,
            quantity,
          }, { transaction });
        }
      }
      
      const allCartItems = await CartItem.findAll({
        where: { cartId: userCart.cartId },
        include: [{ model: Product }],
        transaction,
      });
      
      const sanitizedCartItems = allCartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        name: item.Product.dataValues.name,
        description: item.Product.dataValues.description,
        condition: item.Product.dataValues.condition,
        price: item.Product.dataValues.priceInCents / 100,
        stockQuantity: item.Product.dataValues.stockQuantity,
        categoryId: item.Product.dataValues.categoryId,
        imageUrl: item.Product.dataValues.imageUrl,
      }));

      res.status(200).json({
        cartItems: sanitizedCartItems,
        message: "Successfully merged cart.",
      });
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = mergeCart;
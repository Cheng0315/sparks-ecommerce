const { Product } = require("../../models");

/* Verify product product belongs to user*/
const verifyProductBelongsToUser = async (req, res, next) => {
  try {
    const product = await Product.findOne({ where: { productId : req.params.productId }});
    if (!product) return res.status(404).json({ errorMessage: "Product not found" });

    /* Return 403 if the product does not belongs to the user */
    if (req.authUser.userId !== product.userId) {
      return res.status(403).json({ errorMessage: "Unauthorized" });
    }
    next();
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

module.exports = verifyProductBelongsToUser;
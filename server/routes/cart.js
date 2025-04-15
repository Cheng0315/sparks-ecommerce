const express = require("express");
const router = express.Router();
const { strictRateLimiter, verifyAccessToken } = require("../middleware/auth");
const { validateCartItem, validateUpdateCartItem } = require("../middleware/cart");
const { addItemToUserCart, getUserCartItems, updateCartItemQuantity, deleteCartItem } = require("../controllers/cart");
const validateParamId = require("../middleware/validateParamId");

/* Create */
router.post("/items", strictRateLimiter, verifyAccessToken, validateCartItem, addItemToUserCart);

/* Read */ 
router.get("/items", strictRateLimiter, verifyAccessToken, getUserCartItems);

/* Update */
router.patch("/items/:productId", strictRateLimiter, verifyAccessToken, validateUpdateCartItem, updateCartItemQuantity);

/* Delete */

router.delete("/items/:productId", strictRateLimiter, verifyAccessToken, validateParamId("productId"), deleteCartItem);

module.exports = router;
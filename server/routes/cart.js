const express = require("express");
const router = express.Router();
const { strictRateLimiter, verifyAccessToken } = require("../middleware/auth");
const { validateCartItem } = require("../middleware/cart");
const { addItemToUserCart, getUserCartItems, updateCartItemQuantity } = require("../controllers/cart");

/* Create */
router.post("/", strictRateLimiter, verifyAccessToken, validateCartItem, addItemToUserCart);

/* Read */ 
router.get("/", strictRateLimiter, verifyAccessToken, getUserCartItems);

/* Update */
router.patch("/", strictRateLimiter, verifyAccessToken, validateCartItem, updateCartItemQuantity);

/* Delete */

module.exports = router;
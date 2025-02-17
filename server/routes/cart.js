const express = require("express");
const router = express.Router();
const { strictRateLimiter, verifyAccessToken } = require("../middleware/auth");
const { validateCartItem } = require("../middleware/cart");
const { addItemToCart, getCart, updateCartItemQuantity } = require("../controllers/cart");

/* Create */
router.post("/", strictRateLimiter, verifyAccessToken, validateCartItem, addItemToCart);

/* Read */ 
router.get("/", strictRateLimiter, verifyAccessToken, getCart);

/* Update */
router.patch("/", strictRateLimiter, verifyAccessToken, validateCartItem, updateCartItemQuantity);

/* Delete */

module.exports = router;
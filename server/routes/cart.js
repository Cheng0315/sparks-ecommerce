const express = require("express");
const router = express.Router();
const { strictRateLimiter, verifyAccessToken } = require("../middleware/auth");
const { validateCartItem } = require("../middleware/cart");
const { addCartItem } = require("../controllers/cart");

/* Create */
router.post("/", strictRateLimiter, verifyAccessToken, validateCartItem, addCartItem);

/* Read */ 

/* Update */

/* Delete */

module.exports = router;
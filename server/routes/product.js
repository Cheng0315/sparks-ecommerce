const express = require("express");
const router = express.Router();
const { strictRateLimiter, verifyAccessToken } = require("../middleware/auth");
const { addProduct } = require("../controllers/product");

/* Create */
router.post("/", strictRateLimiter, verifyAccessToken, addProduct);

/* Read */

/* Update */

/* Delete */

module.exports = router;
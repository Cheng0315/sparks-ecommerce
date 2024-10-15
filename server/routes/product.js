const express = require("express");
const router = express.Router();
const { strictRateLimiter, verifyAccessToken } = require("../middleware/auth");
const { validateProductDetails } = require("../middleware/product");
const { addProduct } = require("../controllers/product");

/* Create */
router.post("/", strictRateLimiter, verifyAccessToken, validateProductDetails, addProduct);

/* Read */

/* Update */

/* Delete */

module.exports = router;
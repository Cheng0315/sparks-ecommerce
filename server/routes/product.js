const express = require("express");
const router = express.Router();
const { strictRateLimiter, verifyAccessToken } = require("../middleware/auth");
const { validateProductDetails, uploadProductImage, verifyProductToken } = require("../middleware/product");
const { addProduct, createProductToken } = require("../controllers/product");

/* Create */
router.post("/validate-details", strictRateLimiter, verifyAccessToken, validateProductDetails, createProductToken);
router.post("/add-product", strictRateLimiter, verifyAccessToken, uploadProductImage, verifyProductToken, addProduct);

/* Read */

/* Update */

/* Delete */

module.exports = router;
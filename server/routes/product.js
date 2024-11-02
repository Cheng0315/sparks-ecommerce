const express = require("express");
const router = express.Router();
const { strictRateLimiter, verifyAccessToken } = require("../middleware/auth");
const { validateProductDetails, uploadProductImage, verifyProductToken } = require("../middleware/product");
const { addProduct, createProductToken, getProduct } = require("../controllers/product");

/* Create */
router.post("/validate-details", strictRateLimiter, verifyAccessToken, validateProductDetails, createProductToken);
router.post("/add-product", strictRateLimiter, verifyAccessToken, uploadProductImage, verifyProductToken, addProduct);

/* Read */
router.get("/:productId", getProduct)

/* Update */

/* Delete */

module.exports = router;
const express = require("express");
const router = express.Router();
const { strictRateLimiter, verifyAccessToken } = require("../middleware/auth");
const { validateProductDetails, uploadProductImage, validateProductId, parseProductFormData, validateProductImage, parseProductUpdateFormData } = require("../middleware/product");
const { addProduct, getProduct } = require("../controllers/product");

/* Create */
router.post("/", strictRateLimiter, verifyAccessToken, parseProductFormData, validateProductDetails, validateProductImage, uploadProductImage, addProduct);

/* Read */ 
router.get("/:productId", validateProductId, getProduct);

/* Update */
router.patch("/:productId", strictRateLimiter, verifyAccessToken, parseProductUpdateFormData);

/* Delete */

module.exports = router;
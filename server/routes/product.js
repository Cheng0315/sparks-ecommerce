const express = require("express");
const router = express.Router();
const { strictRateLimiter, verifyAccessToken } = require("../middleware/auth");
const { validateProductDetails, uploadProductImage, validateProductId, parseProductFormData, validateProductImage, verifyProductBelongsToUser, validateProductUpdateDetails, deleteProductImage } = require("../middleware/product");
const { addProduct, getProduct, updateProductDetails, deleteProduct, getAllProductsBelongToUser } = require("../controllers/product");

/* Create */
router.post("/", strictRateLimiter, verifyAccessToken, parseProductFormData, validateProductDetails, validateProductImage, uploadProductImage, addProduct);

/* Read */ 
router.get("/", strictRateLimiter, verifyAccessToken, getAllProductsBelongToUser)
router.get("/:productId", validateProductId, getProduct);

/* Update */
router.patch("/:productId", strictRateLimiter, verifyAccessToken, validateProductId, verifyProductBelongsToUser, parseProductFormData, validateProductUpdateDetails, validateProductImage, deleteProductImage, uploadProductImage, updateProductDetails);

/* Delete */
router.delete("/:productId", strictRateLimiter, verifyAccessToken, validateProductId, verifyProductBelongsToUser, deleteProduct);

module.exports = router;
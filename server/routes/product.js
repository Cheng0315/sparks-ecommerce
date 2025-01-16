const express = require("express");
const router = express.Router();
const { strictRateLimiter, verifyAccessToken } = require("../middleware/auth");
const { validateProductDetails, uploadProductImage, validateProductId, parseProductFormData, validateProductImage, verifyProductBelongsToUser, validateProductUpdateDetails, deleteProductImage } = require("../middleware/product");
const { addProduct, getProduct, updateProductDetails, deleteProduct, getUserProducts } = require("../controllers/product");
const validateParamId = require("../middleware/validateParamId");


/* Create */
router.post("/", strictRateLimiter, verifyAccessToken, parseProductFormData, validateProductDetails, validateProductImage, uploadProductImage, addProduct);

/* Read */ 
router.get("/", strictRateLimiter, verifyAccessToken, getUserProducts)
router.get("/:productId", validateParamId("productId"), getProduct);

/* Update */
router.patch("/:productId", strictRateLimiter, verifyAccessToken, validateParamId("productId"), verifyProductBelongsToUser, parseProductFormData, validateProductUpdateDetails, validateProductImage, deleteProductImage, uploadProductImage, updateProductDetails);

/* Delete */
router.delete("/:productId", strictRateLimiter, verifyAccessToken, validateParamId("productId"), verifyProductBelongsToUser, deleteProduct);

module.exports = router;
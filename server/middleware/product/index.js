/* Exports all product-related middlewares */
const validateProductDetails = require("./validateProductDetails");
const uploadProductImage = require("./uploadProductImage");
const validateProductId = require("./validateProductId");
const parseProductFormData = require("./parseProductFormData");
const validateProductImage = require("./validateProductImage");
const parseProductUpdateFormData = require("./parseProductUpdateFormData");
const verifyProductBelongsToUser = require("./verifyProductBelongsToUser");
const validateProductUpdateDetails = require("./validateProductUpdateDetails");
const updateProductImage = require("./updateProductImage");

module.exports = {
  validateProductDetails,
  uploadProductImage,
  validateProductId,
  parseProductFormData,
  validateProductImage,
  parseProductUpdateFormData,
  verifyProductBelongsToUser,
  validateProductUpdateDetails,
  updateProductImage
};

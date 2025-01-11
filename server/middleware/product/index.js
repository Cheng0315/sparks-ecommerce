/* Exports all product-related middlewares */
const validateProductDetails = require("./validateProductDetails");
const uploadProductImage = require("./uploadProductImage");
const parseProductFormData = require("./parseProductFormData");
const validateProductImage = require("./validateProductImage");
const verifyProductBelongsToUser = require("./verifyProductBelongsToUser");
const validateProductUpdateDetails = require("./validateProductUpdateDetails");
const deleteProductImage = require("./deleteProductImage");

module.exports = {
  validateProductDetails,
  uploadProductImage,
  parseProductFormData,
  validateProductImage,
  verifyProductBelongsToUser,
  validateProductUpdateDetails,
  deleteProductImage,
};

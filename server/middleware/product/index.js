/* Exports all product-related middlewares */
const validateProductDetails = require("./validateProductDetails");
const uploadProductImage = require("./uploadProductImage");
const validateProductId = require("./validateProductId");
const parseProductFormData = require("./parseProductFormData");
const validateProductImage = require("./validateProductImage");

module.exports = {
  validateProductDetails,
  uploadProductImage,
  validateProductId,
  parseProductFormData,
  validateProductImage
};

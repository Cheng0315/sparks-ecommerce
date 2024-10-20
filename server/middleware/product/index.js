/* Exports all product-related middlewares */
const validateProductDetails = require("./validateProductDetails");
const uploadProductImage = require("./uploadProductImage");
const verifyProductToken = require("./verifyProductToken");

module.exports = {
  validateProductDetails,
  uploadProductImage,
  verifyProductToken
};

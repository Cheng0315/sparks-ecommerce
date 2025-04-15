/* Exports all address-related middlewares */
const validateAddress = require("./validateAddress");
const validateUpdateAddress = require("./validateUpdateAddress");

module.exports = {
  validateAddress,
  validateUpdateAddress
};
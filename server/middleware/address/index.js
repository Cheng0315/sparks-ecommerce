/* Exports all address-related middlewares */
const validateAddress = require("./validateAddress");
const validateAddressUpdate = require("./validateAddressUpdate");

module.exports = {
  validateAddress,
  validateAddressUpdate
};
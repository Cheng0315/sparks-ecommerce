/* Exports all cart-related middlewares */
const validateCartItem = require("./validateCartItem");
const validateUpdateCartItem = require("./validateUpdateCartItem");
const validateMergeCartItems = require("./validateMergeCartItems");

module.exports = {
  validateCartItem,
  validateUpdateCartItem,
  validateMergeCartItems
};

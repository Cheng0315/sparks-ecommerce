/* Exports all cart-related middlewares */
const validateCartItem = require("./validateCartItem");
const validateUpdateCartItem = require("./validateUpdateCartItem");

module.exports = {
  validateCartItem,
  validateUpdateCartItem
};

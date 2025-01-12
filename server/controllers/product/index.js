/* Export all product controller functions*/
const addProduct = require("./addProduct");
const getProduct = require("./getProduct");
const updateProductDetails = require("./updateProductDetails");
const deleteProduct = require("./deleteProduct")
const getAllProductsBelongToUser = require("./getAllProductsBelongToUser")

module.exports = {
  addProduct,
  getProduct,
  updateProductDetails,
  deleteProduct,
  getAllProductsBelongToUser
};

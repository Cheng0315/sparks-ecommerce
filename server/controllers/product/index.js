/* Export all product controller functions*/
const addProduct = require("./addProduct");
const createProductToken = require("./createProductToken");
const getProduct = require("./getProduct");
const updateProductDetails = require("./updateProductDetails");

module.exports = {
  addProduct,
  createProductToken,
  getProduct,
  updateProductDetails
};

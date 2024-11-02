/* Export all product controller functions*/
const addProduct = require("./addProduct");
const createProductToken = require("./createProductToken");
const getProduct = require("./getProduct");

module.exports = {
  addProduct,
  createProductToken,
  getProduct
};

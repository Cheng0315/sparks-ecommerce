/* Export all address controller functions*/
const addAddress = require("./addAddress");
const getUserAddresses = require("./getUserAddresses");
const updateAddress = require("./updateAddress");
const getAddress = require("./getAddress");
const deleteAddress = require("./deleteAddress");

module.exports = {
  addAddress,
  getUserAddresses,
  updateAddress,
  getAddress,
  deleteAddress
};

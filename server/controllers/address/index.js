/* Export all address controller functions*/
const addAddress = require("./addAddress");
const getAddresses = require("./getAddresses");
const updateAddress = require("./updateAddress");

module.exports = {
  addAddress,
  getAddresses,
  updateAddress
};

/* Export all regular expressions */
const getPasswordRegex = require("./getPasswordRegex");
const getEmailRegex = require("./getEmailRegex");
const getUsernameRegex = require("./getUsernameRegex")
const getFirstNameRegex = require("./getFirstNameRegex");
const getLastNameRegex = require("./getLastNameRegex");
const getAddressCityRegex = require("./getAddressCityRegex");
const getAddressPostalCodeRegex = require("./getAddressPostalCodeRegex");
const getAddressStateRegex = require("./getAddressStateRegex");
const getAddressStreetRegex = require("./getAddressStreetRegex");
const getAddressUnitRegex = require("./getAddressUnitRegex");

module.exports = {
  getPasswordRegex,
  getEmailRegex,
  getUsernameRegex,
  getFirstNameRegex,
  getLastNameRegex,
  getAddressCityRegex,
  getAddressPostalCodeRegex,
  getAddressStateRegex,
  getAddressStreetRegex,
  getAddressUnitRegex
};

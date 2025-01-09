/* Postal code regex for testing the postalcode of the user's address */
const getAddressPostalCodeRegex = () => {
  return /^\d{5}(-\d{4})?$/
};

module.exports = getAddressPostalCodeRegex;
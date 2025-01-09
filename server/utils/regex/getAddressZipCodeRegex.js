/* Zip code regex for testing the zip code of the user's address */
const getAddressZipCodeRegex = () => {
  return /^\d{5}(-\d{4})?$/
};

module.exports = getAddressZipCodeRegex;
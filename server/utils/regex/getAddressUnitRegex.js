/* Address Unit regex for testing the unit of the user's address */
const getAddressUnitRegex = () => {
  return /^[a-zA-Z0-9\s,.'-]{1,50}$/
};

module.exports = getAddressUnitRegex;
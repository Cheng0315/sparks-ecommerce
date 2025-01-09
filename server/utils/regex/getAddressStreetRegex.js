/* Street regex for testing the street of the user's address */
const getAddressStreetRegex = () => {
  return /^[a-zA-Z0-9\s,."-]{3,100}$/
};

module.exports = getAddressStreetRegex;
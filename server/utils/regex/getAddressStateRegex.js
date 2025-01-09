/* State regex for testing the state of the user's address */
const getAddressStateRegex = () => {
  return /^[a-zA-Z\s-]{2,}$/
};

module.exports = getAddressStateRegex;
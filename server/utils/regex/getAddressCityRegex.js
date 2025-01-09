/* City regex for testing the city of the user's address */
const getAddressCityRegex = () => {
  return /^[a-zA-Z\s-]{2,50}$/
};

module.exports = getAddressCityRegex;
/* Last name regex for testing user's last name input */
const getAddressCityRegex = () => {
  return /^[a-zA-Z\s-]{2,}$/
};

module.exports = getAddressCityRegex;
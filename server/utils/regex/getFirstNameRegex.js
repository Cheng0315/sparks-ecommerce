/* First name regex for testing user's first name input */
const getFirstNameRegex = () => {
  return /^[a-zA-Z]{1,30}$/
};

module.exports = getFirstNameRegex;
/* Last name regex for testing user's last name input */
const getLastNameRegex = () => {
  return /^[a-zA-Z]{1,30}$/
};

module.exports = getLastNameRegex;
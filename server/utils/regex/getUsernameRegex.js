/* Username regex for testing user's username input */
const getUsernameRegex = () => {
  return /^[a-zA-Z0-9_-]{3,20}$/
};

module.exports = getUsernameRegex;
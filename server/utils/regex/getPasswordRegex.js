/* Password regex for testing user's password input */
const getPasswordRegex = () => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
};

module.exports = getPasswordRegex;
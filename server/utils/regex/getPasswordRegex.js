/* Password regex for testing user's password input */
const getPasswordRegex = () => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
};

module.exports = getPasswordRegex;
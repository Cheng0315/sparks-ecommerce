/* Regex for testing the user's phone number */
const getPhoneNumberRegex = () => {
  return /^(?:\+1-?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/
};

module.exports = getPhoneNumberRegex;
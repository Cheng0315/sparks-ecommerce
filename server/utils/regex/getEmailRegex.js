/* Email regex for testing user's email input */
const getEmailRegex = () => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
}

module.exports = getEmailRegex;
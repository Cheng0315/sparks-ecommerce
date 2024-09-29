const { getFirstNameRegex, getLastNameRegex, getUsernameRegex } = require("../../utils/regex");

/* Validate user's input for first name, last name, and username */
const validateUserUpdateInfo = (req, res, next) => {
  try {
    const { firstName, lastName, username } = req.body;
  
    /* Validate firstName */
    const firstNameRegex = getFirstNameRegex();
    if (!firstName || !firstNameRegex.test(firstName)) {
        return res.status(400).json({ errorMessage: 'Invalid firstName' });
    }
  
    /* Validate last name */
    const lastNameRegex = getLastNameRegex();
    if (!lastName || !lastNameRegex.test(lastName)) {
        return res.status(400).json({ errorMessage: 'Invalid lastName' });
    }
  
    /* Validate username */
    const usernameRegex = getUsernameRegex();
    if (!username || !usernameRegex.test(username)) {
        return res.status(400).json({ errorMessage: 'Invalid username' });
    }
  
    next();
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

module.exports = validateUserUpdateInfo;
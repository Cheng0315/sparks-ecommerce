const { getPasswordRegex, getEmailRegex, getUsernameRegex, getLastNameRegex, getFirstNameRegex } = require("../../utils/regex");

/* Validate user's input for registration */
const validateRegistrationInput = (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;

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

  /* Validate email */
  const emailRegex = getEmailRegex();
  if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ errorMessage: 'Invalid email' });
  }

  /* Validate password */
  const passwordRegex = getPasswordRegex();
  if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({ errorMessage: 'Password must be at least 6 characters long' });
  }

  next();
};

module.exports = validateRegistrationInput;
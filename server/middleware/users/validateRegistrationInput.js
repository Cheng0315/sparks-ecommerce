/* Validate user's input for registration */
const validateRegistrationInput = (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;

  /* Validate firstName and lastName */
  if (!firstName || typeof firstName !== 'string' || firstName.trim() === '') {
      return res.status(400).json({ errorMessage: 'Invalid firstName' });
  }
  if (!lastName || typeof lastName !== 'string' || lastName.trim() === '') {
      return res.status(400).json({ errorMessage: 'Invalid lastName' });
  }

  /* Validate username */
  const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  if (!username || !usernameRegex.test(username)) {
      return res.status(400).json({ errorMessage: 'Invalid username' });
  }

  /* Validate email */
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ errorMessage: 'Invalid email' });
  }

  /* Validate password */
  if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ errorMessage: 'Password must be at least 6 characters long' });
  }

  next();
};

module.exports = validateRegistrationInput;
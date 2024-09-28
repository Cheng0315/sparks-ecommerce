/* Utility method for removing user's password and token */
const sanitizeUser = (user) => {
  const sanitizedUser = user.toJSON();
  delete sanitizedUser.password;
  delete sanitizedUser.token;
  return sanitizedUser;
}

module.exports = sanitizeUser;
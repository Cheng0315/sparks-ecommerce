/* Utility method for removing user's password and token */
const sanitizeUser = (user) => {
  const sanitizedUser = user.toJSON();
  delete sanitizedUser.password;
  delete sanitizedUser.refreshToken;
  return sanitizedUser;
}

module.exports = sanitizeUser;
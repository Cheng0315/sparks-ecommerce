/* Register the user */
/* @route = POST /api/users */
const registerUser = (req, res, next) => {
  res.json({message: "Hello from user registration route"});
}

module.exports = {registerUser};
const {User} = require("../../models");
const bcrypt = require("bcrypt");

/* Verify password */
const verifyPassword = async (req, res, next) => {
  const { password } = req.body;
  const { id } = req.params;

  const user = await User.findOne({where: { id }});
  if (!user) return res.status(404).json({errorMessage: "User not found"});
  
  const passwordMatch = await bcrypt.compare(password.trim(), user.password);
  if (!passwordMatch) return res.status(403).json({errorMessage: "Unauthorized"});

  next();
}

module.exports = verifyPassword;
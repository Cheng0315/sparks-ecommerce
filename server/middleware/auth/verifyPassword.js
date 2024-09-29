const {User} = require("../../models");
const bcrypt = require("bcrypt");

/* Verify password */
const verifyPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const id = parseInt(req.params.id);
    
    if (!Number.isInteger(id)) return res.status(400).json({errorMessage: "Bad Request"});

    const user = await User.findOne({where: { id }});
    if (!user) return res.status(404).json({errorMessage: "User not found"});
    
    const passwordMatch = await bcrypt.compare(password.trim(), user.password);
    if (!passwordMatch) return res.status(403).json({errorMessage: "Unauthorized"});

    next();
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
}

module.exports = verifyPassword;
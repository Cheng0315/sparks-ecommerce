const {User} = require("../../models");
const bcrypt = require("bcrypt");

/* Verify password */
const verifyPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const userId = parseInt(req.authUser.userId);

    const user = await User.findOne({where: { userId }});
    if (!user) return res.status(404).json({errorMessage: "User not found"});
    
    const passwordMatch = await bcrypt.compare(password.trim(), user.password);
    if (!passwordMatch) return res.status(403).json({errorMessage: "Unauthorized"});

    next();
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
}

module.exports = verifyPassword;
const { User } = require("../../models");


/* View user's profile */
/* @route = GET /api/users/:userId */
const getUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({
      where: { userId },
      attributes: { exclude: ["password", "refreshToken", "newsletterSubscription", "newsletterCouponUsed"] }
    });

    if (!user) return res.status(404).json({errorMessage: "Invalid user id"});
    const userData = user.toJSON();
    res.status(200).json({user: userData});
  } catch (error) {
    res.status(404).json({errorMessage: error.message});
  }
}

module.exports = getUser;

const {User} = require("../../models");


/* View user's profile */
/* @route = GET /api/users/:id */
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password", "token", "newsletterSubscription", "newsletterCouponUsed"] }
    });

    if (!user) return res.status(404).json({errorMessage: "Invalid user id"});
    const userData = user.toJSON();
    res.status(200).json(userData);
  } catch (error) {
    res.status(404).json({errorMessage: error.message});
  }
}

module.exports = getUser;

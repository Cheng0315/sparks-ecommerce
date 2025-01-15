const { Address } = require("../../models");

/* Get all the addresses that belong to the user */
/* @route = GET /api/addresses */
const getAddresses = async (req, res) => {
  try {

    const userAddresses = await Address.findAll({
      where: { userId: req.authUser.userId }
    });
    
    if (!userAddresses || userAddresses.length === 0) {
      return res.status(404).json({errorMessage: "No addresses found"});
    }
    
    res.status(200).json({userAddresses});
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = getAddresses;

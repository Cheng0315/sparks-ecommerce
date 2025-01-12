const { Address } = require("../../models");

/* Get the address */
/* @route = GET /api/addresses/:addressId */
const getAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      where: { addressId: req.params.addressId } 
    });

    if (!address) return res.status(404).json({errorMessage: "Address not found"});

    if (req.authUser.userId !== address.userId) {
      return res.status(403).json({ errorMessage: "Unauthorized" });
    }

    res.status(200).json({address});
  } catch (error) {
    res.status(404).json({errorMessage: error.message});
  }
}

module.exports = getAddress;

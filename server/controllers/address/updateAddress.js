const { Address } = require("../../models");

/* Update address */
/* @route = PATCH /api/addresses/:addressId */
const updateAddress = async (req, res) => {
  try {
    const address = await Address.findOne({ where: { addressId: req.params.addressId }});
    
    if (!address) return res.status(404).json({ errorMessage: "Address not found" });

    if (req.authUser.userId !== address.userId) {
      return res.status(403).json({ errorMessage: "Unauthorized" });
    }

    const fieldsToUpdate = ["firstName", "lastName", "street", "addressUnit", "city", "state", "zipCode"];
    
    fieldsToUpdate.forEach(field => {
      if (req.body[field]) address[field] = req.body[field];
    });

    await address.save();

    res.status(200).json({
      address,
      message: "Your address has been successfully updated"
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}

module.exports = updateAddress;
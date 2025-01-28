const { Address } = require("../../models");
const path = require("path");
const fs = require("fs");

/* Delete address */
/* @route = DELETE /api/addresses/:addressId */
const deleteAddress = async (req, res) => {
  try { 
    const address = await Address.findOne({ where: { addressId: req.params.addressId }});

    if (!address) {
      return res.status(404).json({ errorMessage: "Address not found" });
    }

    /* Return 403 if the address does not belongs to the user */
    if (req.authUser.userId !== address.userId) {
      return res.status(403).json({ errorMessage: "Unauthorized" });
    }
    
    await address.destroy();
    
    res.status(200).json({ 
      message: "Address has been successfully removed" 
    });
  } catch (error) { 
    res.status(500).json({ errorMessage: error.message }); 
  }
}

module.exports = deleteAddress;
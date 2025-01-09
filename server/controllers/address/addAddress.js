const { Address } = require("../../models");

/* Add address */
/* @route = POST /api/address */
const addAddress = async (req, res) => {
  try {

    const { firstName, lastName, street, addressUnit, city, state, zipCode } = req.body;
    const user = req.authUser;
    
    const newAddress = await Address.create({
      firstName,
      lastName,
      street,
      addressUnit,
      city,
      state,
      zipCode,
      userId: user.userId
    });

    res.status(201).json({
      address: newAddress,
      message: "Successfully added address"
    });
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

module.exports = addAddress;
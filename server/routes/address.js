const express = require("express");
const router = express.Router();
const { strictRateLimiter, verifyAccessToken } = require("../middleware/auth");
const { validateAddress, validateAddressUpdate } = require("../middleware/address");
const { addAddress, getAddresses, updateAddress, getAddress, deleteAddress } = require("../controllers/address");
const validateParamId = require("../middleware/validateParamId");

/* Create */
router.post("/", strictRateLimiter, verifyAccessToken, validateAddress, addAddress);

/* Read */ 
router.get("/:addressId", strictRateLimiter, verifyAccessToken, validateParamId("addressId"), getAddress);
router.get("/", strictRateLimiter, verifyAccessToken, getAddresses);

/* Update */
router.patch("/:addressId", strictRateLimiter, verifyAccessToken, validateParamId("addressId"), validateAddressUpdate, updateAddress);

/* Delete */
router.delete("/:addressId", strictRateLimiter, verifyAccessToken, validateParamId("addressId"), deleteAddress);

module.exports = router;
const express = require("express");
const router = express.Router();
const { strictRateLimiter, verifyAccessToken } = require("../middleware/auth");
const { validateAddress, validateAddressUpdate } = require("../middleware/address");
const { addAddress, getAddresses } = require("../controllers/address");

/* Create */
router.post("/", strictRateLimiter, verifyAccessToken, validateAddress, addAddress);

/* Read */ 
router.get("/", strictRateLimiter, verifyAccessToken, getAddresses);

/* Update */
router.patch("/:addressId", strictRateLimiter, verifyAccessToken, validateAddressUpdate);

/* Delete */

module.exports = router;
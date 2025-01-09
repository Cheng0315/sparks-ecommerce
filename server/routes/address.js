const express = require("express");
const router = express.Router();
const { strictRateLimiter, verifyAccessToken } = require("../middleware/auth");
const { validateUserAddress } = require("../middleware/address");
const { addAddress } = require("../controllers/address");

/* Create */
router.post("/", strictRateLimiter, verifyAccessToken, validateUserAddress, addAddress);

/* Read */ 

/* Update */

/* Delete */

module.exports = router;
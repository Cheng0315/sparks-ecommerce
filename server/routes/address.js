const express = require("express");
const router = express.Router();
const { strictRateLimiter, verifyAccessToken } = require("../middleware/auth");
const { validateUserAddress } = require("../middleware/address");

/* Create */
router.post("/", strictRateLimiter, verifyAccessToken, validateUserAddress);

/* Read */ 

/* Update */

/* Delete */

module.exports = router;
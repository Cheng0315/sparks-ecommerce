const express = require("express");
const router = express.Router();
const {registerUser} = require("../controllers/users.js")

/* Register the user */
router.post("/register", registerUser)

module.exports = router;
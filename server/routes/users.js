const express = require("express");
const router = express.Router();
const {registerUser} = require("../controllers/users.js");
const {validateUser} = require("../middleware/validateUser.js");

/* Register the user */
router.post("/register", validateUser, registerUser)

module.exports = router;
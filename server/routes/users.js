const express = require("express");
const router = express.Router();
const {registerUser, userProfile} = require("../controllers/users.js");
const {validateUser} = require("../middleware/validateUser.js");
const {verifyToken} = require("../middleware/auth.js");

/* CREATE */
router.post("/register", validateUser, registerUser);

/* READ */
router.get("/:id/profile", verifyToken, userProfile);

/* UPDATE */

/* DELETE */
module.exports = router;
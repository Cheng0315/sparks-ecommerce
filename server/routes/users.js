const express = require("express");
const router = express.Router();
const {register, login, userProfile} = require("../controllers/users.js");
const {validateUser} = require("../middleware/validateUser.js");
const {verifyToken} = require("../middleware/auth.js");


/* Auth */
router.post("/register", validateUser, register);
router.post("/login", login);

/* Create */

/* Read */
router.get("/:id/profile", verifyToken, userProfile);

/* Update */

/* Delete */

module.exports = router;
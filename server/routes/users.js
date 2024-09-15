const express = require("express");
const router = express.Router();
const {register, login, userProfile} = require("../controllers/users.js");
const {validateRegistrationInput} = require("../middleware/validateUserInput.js");
const {verifyToken} = require("../middleware/auth.js");


/* Auth */
router.post("/register", validateRegistrationInput, register);
router.post("/login", login);

/* Create */

/* Read */
router.get("/:id", verifyToken, userProfile);

/* Update */

/* Delete */

module.exports = router;
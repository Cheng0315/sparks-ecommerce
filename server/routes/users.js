const express = require("express");
const router = express.Router();
const {register, login, getUser} = require("../controllers/users.js");
const {validateRegistrationInput} = require("../middleware/validateUserInput.js");
const {verifyJWT} = require("../middleware/auth.js");


/* Auth */
router.post("/register", validateRegistrationInput, register);
router.post("/login", login);

/* Create */

/* Read */
router.get("/:id", verifyJWT, getUser);

/* Update */

/* Delete */

module.exports = router;
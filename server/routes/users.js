const express = require("express");
const router = express.Router();
const {register, login, getUser, renewTokens, logout} = require("../controllers/users");
const {validateRegistrationInput} = require("../middleware/users");
const {verifyAccessToken, verifyRefreshToken} = require("../middleware/auth");


/* Auth */
router.post("/register", validateRegistrationInput, register);
router.post("/login", login);
router.post("/renew-tokens", renewTokens);
router.delete("/logout", verifyRefreshToken, logout);

/* Create */

/* Read */
router.get("/:id", verifyAccessToken, getUser);

/* Update */

/* Delete */

module.exports = router;
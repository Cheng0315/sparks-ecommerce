const express = require("express");
const router = express.Router();
const {register, login, getUser, renewTokens, logout, updatePassword, updateEmail} = require("../controllers/users");
const {validateRegistrationInput} = require("../middleware/users");
const {verifyAccessToken, verifyRefreshToken, validateNewPassword, verifyPassword} = require("../middleware/auth");


/* Auth */
router.post("/register", validateRegistrationInput, register);
router.post("/login", login);
router.post("/renew-tokens", verifyRefreshToken, renewTokens);
router.delete("/logout", verifyRefreshToken, logout);

/* Create */

/* Read */
router.get("/:id", verifyAccessToken, getUser);

/* Update */
router.patch("/:id/update-password", verifyAccessToken, validateNewPassword, verifyPassword, updatePassword);
router.patch("/:id/update-email", verifyAccessToken, verifyPassword, updateEmail);

/* Delete */

module.exports = router;
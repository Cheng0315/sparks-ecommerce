const express = require("express");
const router = express.Router();
const { register, login, getUser, renewTokens, logout, updatePassword, updateEmail, updateInfo } = require("../controllers/users");
const { validateRegistrationInput } = require("../middleware/users");
const { verifyAccessToken, verifyRefreshToken, verifyPassword } = require("../middleware/auth");
const { validateUserUpdateInfo, validateNewPassword, validateParamsId, validateNewEmail } = require("../middleware/users");


/* Auth */
router.post("/register", validateRegistrationInput, register);
router.post("/login", login);
router.post("/renew-tokens", verifyRefreshToken, renewTokens);
router.delete("/logout", verifyRefreshToken, logout);

/* Create */

/* Read */
router.get("/:id", validateParamsId, verifyAccessToken, getUser);

/* Update */
router.patch("/:id/change-password", validateParamsId, verifyAccessToken, validateNewPassword, verifyPassword, updatePassword);
router.patch("/:id/update-email", validateParamsId, verifyAccessToken, validateNewEmail, verifyPassword, updateEmail);
router.patch("/:id/update-info", validateParamsId, verifyAccessToken, validateUserUpdateInfo, updateInfo);

/* Delete */

module.exports = router;
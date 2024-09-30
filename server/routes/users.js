const express = require("express");
const router = express.Router();
const { register, login, getUser, renewTokens, logout, updatePassword, updateEmail, updateInfo } = require("../controllers/users");
const { verifyAccessToken, verifyRefreshToken, verifyPassword, strictRateLimiter } = require("../middleware/auth");
const { validateUserUpdateInfo, validateNewPassword, validateNewEmail, validateRegistrationInput, validateLoginInput } = require("../middleware/users");

/* Auth */
router.post("/register", strictRateLimiter, validateRegistrationInput, register);
router.post("/login", strictRateLimiter, validateLoginInput, login);
router.post("/renew-tokens", strictRateLimiter, verifyRefreshToken, renewTokens);
router.delete("/logout", strictRateLimiter, verifyRefreshToken, logout);

/* Create */

/* Read */
router.get("/:userId", verifyAccessToken, getUser);

/* Update */
router.patch("/:userId/change-password", strictRateLimiter, verifyAccessToken, validateNewPassword, verifyPassword, updatePassword);
router.patch("/:userId/update-email", strictRateLimiter, verifyAccessToken, validateNewEmail, verifyPassword, updateEmail);
router.patch("/:userId/update-info", strictRateLimiter, verifyAccessToken, validateUserUpdateInfo, updateInfo);

/* Delete */

module.exports = router;
const express = require("express");
const router = express.Router();
const { register, login, getUser, renewTokens, logout, updatePassword, updateEmail, updateInfo } = require("../controllers/users");
const { validateRegistrationInput } = require("../middleware/users");
const { verifyAccessToken, verifyRefreshToken, verifyPassword, strictRateLimiter } = require("../middleware/auth");
const { validateUserUpdateInfo, validateNewPassword, validateParamsId, validateNewEmail } = require("../middleware/users");

/* Auth */
router.post("/register", strictRateLimiter, validateRegistrationInput, register);
router.post("/login", strictRateLimiter, login);
router.post("/renew-tokens", strictRateLimiter, verifyRefreshToken, renewTokens);
router.delete("/logout", strictRateLimiter, verifyRefreshToken, logout);

/* Create */

/* Read */
router.get("/:id", validateParamsId, verifyAccessToken, getUser);

/* Update */
router.patch("/:id/change-password", strictRateLimiter, validateParamsId, verifyAccessToken, validateNewPassword, verifyPassword, updatePassword);
router.patch("/:id/update-email", strictRateLimiter, validateParamsId, verifyAccessToken, validateNewEmail, verifyPassword, updateEmail);
router.patch("/:id/update-info", strictRateLimiter, validateParamsId, verifyAccessToken, validateUserUpdateInfo, updateInfo);

/* Delete */

module.exports = router;
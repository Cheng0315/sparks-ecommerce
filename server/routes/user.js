const express = require("express");
const router = express.Router();
const { register, login, getUser, renewTokens, logout, updateUserPassword, updateUserEmail, updateUserInfo, updateUserRole } = require("../controllers/user");
const { verifyAccessToken, verifyRefreshToken, verifyPassword, strictRateLimiter } = require("../middleware/auth");
const { validateUserUpdateInfo, validateNewPassword, validateNewEmail, validateRegistrationInput, validateLoginInput, validateUserId } = require("../middleware/user");
const validateParamId = require("../middleware/validateParamId");

/* Auth */
router.post("/register", strictRateLimiter, validateRegistrationInput, register);
router.post("/login", strictRateLimiter, validateLoginInput, login);
router.post("/renew-tokens", strictRateLimiter, verifyRefreshToken, renewTokens);
router.delete("/logout", strictRateLimiter, verifyRefreshToken, logout);

/* Create */

/* Read */
router.get("/:userId", validateParamId("userId"), getUser);

/* Update */
router.patch("/:userId/change-password", strictRateLimiter, verifyAccessToken, validateNewPassword, verifyPassword, updateUserPassword);
router.patch("/:userId/update-email", strictRateLimiter, verifyAccessToken, validateNewEmail, verifyPassword, updateUserEmail);
router.patch("/:userId/update-info", strictRateLimiter, verifyAccessToken, validateUserUpdateInfo, updateUserInfo);
router.patch("/:userId/update-role", strictRateLimiter, verifyAccessToken, updateUserRole);

/* Delete */

module.exports = router;
const rateLimit = require('express-rate-limit');

/* Strict rate limiter */
const strictRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 15,
  message: "Too many requests. Please try again after 15 minutes"
});

module.exports = strictRateLimiter;
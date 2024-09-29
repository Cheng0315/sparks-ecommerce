const rateLimit = require('express-rate-limit');

/* General rate limiter */
const generalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  message: "Too many requests. Please try again after 15 minutes"
});

module.exports = generalRateLimiter;
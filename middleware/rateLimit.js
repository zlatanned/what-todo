const rateLimit = require('express-rate-limit');

/**
 * @author Akshay Shahi
 */


const spamLimiter = rateLimit({
    windowMs: 60*60*1000, // 1 hour in milliseconds
    max: 5, // Limiting num of comments to 5 in an hour
    message: 'Too many spam comments from this IP address. Please try again later',
    standardHeaders: true,
    legacyHeaders: false
});

const signUpLimiter = rateLimit({
    windowMs: 24*60*60*1000, // 1 day in milliseconds
    max: 5, // Limiting num of account creation to 5 in a day
    message: 'Too many accounts created from this IP address. Please try again later',
    standardHeaders: true,
    legacyHeaders: false
});

const postCreationLimiter = rateLimit({
    windowMs: 60*60*1000, // 1 hour in milliseconds
    max: 5, // Limiting num of post creation to 5 in an hour
    message: 'Too many posts created from this IP address. Please try again later',
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = { spamLimiter, signUpLimiter, postCreationLimiter };
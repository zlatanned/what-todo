const router = require('express').Router();
const User = require('../models/User');
const UserService = require('../services/UserService');
const bcrypt = require('bcrypt');
const { signUpLimiter } = require('../middleware/rateLimit');

/**
 * @author Akshay Shahi
 */


/**
 * @route           POST /user
 * @description     SIGNUP USER
 * @access          No-auth route
 */
router.post('/user', signUpLimiter, async (req, res) => {
    const userServiceInst = new UserService();
    const { username, email, password } = req.body;
    const role = (req.body.role) ? req.body.role : 'member';
    return userServiceInst.signUpUser(username, email, password, role, res);
});

/**
 * @route           POST /login
 * @description     Login an existing user and return token and user info
 * @access          No-auth route
 */
router.post('/login', async (req, res) => {
    const userServiceInst = new UserService();
    const { username, password } = req.body;
    return userServiceInst.loginUser(username, password, res);
});

/**
 * @route           POST /refresh-token
 * @description     Use long-lived refresh token to generate access token
 * @access          No-auth route
 */
router.post('/refresh-token', async (req, res) => {
    const userServiceInst = new UserService();
    const postData = req.body;
    return userServiceInst.getTokenUsingRefreshToken(postData, res);
});

module.exports = router;

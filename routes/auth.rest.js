const router = require('express').Router();
const User = require('../models/User');
const UserService = require('../services/UserService');
const bcrypt = require('bcrypt');

/**
 * @author Akshay Shahi
 */


/**
 * @route           POST /user
 * @description     SIGNUP USER
 * @access          No-auth route
 */
router.post('/user', async (req, res) => {
    const userServiceInst = new UserService();
    const { username, email, password } = req.body;
    return userServiceInst.signUpUser(username, email, password, res);
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

module.exports = router;

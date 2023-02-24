const router = require('express').Router();
const User = require('../models/User');
const UserService = require('../services/UserService');
const bcrypt = require('bcrypt');

/**
 * @author Akshay Shahi
 */

//REGISTER
router.post('/user', async (req, res) => {
    const userServiceInst = new UserService();
    const { username, email, password } = req.body;
    return userServiceInst.signUpUser(username, email, password, res);
});

//LOGIN
router.post('/login', async (req, res) => {
    const userServiceInst = new UserService();
    const { username, password } = req.body;
    return userServiceInst.loginUser(username, password, res);
});

module.exports = router;

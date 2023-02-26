const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const ErrorConstants = require('../utility/constants/ErrorConstants');

/**
 * @author Akshay Shahi
 */

class UserService {

    /**
     * @description Method responsible for user signup
     * @param {String} username 
     * @param {String} email 
     * @param {String} password 
     * @param {Object} res 
     * @returns 
     */
    async signUpUser(username, email, password, role, res) {
        try {
            console.info('----- In SIGNUP method -----');
            //Role Check
            if (role !== 'admin' && role !== 'member') {
                return res.status(ErrorConstants.BAD_REQUEST_ERROR_CODE).json({
                    message: 'Invalid Role Type'
                });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(password, salt);
            const newUser = new User({
                username: username,
                email: email,
                password: hashedPass,
                role: role
            });

            const userAlreadyExists = await User.findOne({ username });
            if (userAlreadyExists) {
                return res.status(ErrorConstants.BAD_REQUEST_ERROR_CODE).json({
                    message: 'User already exists. Please Login directly.'
                });
            }

            //saving new user in database
            await newUser.save();
            console.info('----- USER CREATED FROM SIGNUP -----');
            return res.status(ErrorConstants.SUCCESS_CODE).json({
                message: 'Signup successful. Please login using these credentials.'
            });
        } catch (err) {
            console.error('****** ERROR FROM SIGNUP METHOD ******', err);
            res.status(ErrorConstants.INTERNAL_SERVER_ERROR_CODE).json(err);
        }
    }

    /**
     * @description Method responsible for user login
     * @param {String} username
     * @param {String} password 
     * @param {Object} res 
     * @returns 
     */
    async loginUser(username, password, res) {
        try {
            console.info('----- In LOGIN method -----');
            if (!username || !password) {
                return res.status(ErrorConstants.BAD_REQUEST_ERROR_CODE).json({ message: 'Please enter all fields' });
            }

            // User should be signed up to login
            const user = await User.findOne({ username });
            if (!user) return res.status(ErrorConstants.BAD_REQUEST_ERROR_CODE).json({ messsage: 'User Does not exist' });

            // Compare to validate password with hashed password stored in DB
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(ErrorConstants.UNAUTHORIZED_ERROR_CODE).json({ message: 'Invalid credentials' });

            jwt.sign({ id: user.id, username: user.username, role: user.role }, jwtSecret, { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    return res.json({ 
                        token, 
                        username: user.username,
                        role: user.role
                    });
                }
            );
        } catch (err) {
            console.error('****** ERROR FROM LOGIN METHOD ******', err);
            res.status(ErrorConstants.INTERNAL_SERVER_ERROR_CODE).json(err);
        }
    }
}

module.exports = UserService;
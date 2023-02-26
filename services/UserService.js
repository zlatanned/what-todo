const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const ErrorConstants = require('../utility/constants/ErrorConstants');
const tokenStore = {};

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
     * @returns {Object}
     * @memberof UserService
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
     * @returns {Object}
     * @memberof UserService
     */
    async loginUser(username, password, res) {
        try {
            console.info('----- In LOGIN method -----');
            if (!username || !password) {
                return res.status(ErrorConstants.BAD_REQUEST_ERROR_CODE).json({ message: 'Please enter all fields' });
            }

            // User should be existing in DB
            const user = await User.findOne({ username });
            if (!user) return res.status(ErrorConstants.BAD_REQUEST_ERROR_CODE).json({ messsage: 'User Does not exist' });

            // Compare to validate password with hashed password stored in DB
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(ErrorConstants.UNAUTHORIZED_ERROR_CODE).json({ message: 'Invalid credentials' });

            const accessToken = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                JWT_SECRET,
                { expiresIn: 900 }
            );

            const refreshToken = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                REFRESH_TOKEN_SECRET,
                { expiresIn: 86400 }
            );

            const response = {
                status: "Logged in",
                accessToken: accessToken,
                refresh_token: refreshToken,
            };

            tokenStore[refreshToken] = response;

            return res.status(ErrorConstants.SUCCESS_CODE).json({
                username: user.username,
                role: user.role,
                ...response
            });
        } catch (err) {
            console.error('****** ERROR FROM LOGIN METHOD ******', err);
            res.status(ErrorConstants.INTERNAL_SERVER_ERROR_CODE).json(err);
        }
    }

    /**
     * @description Method responsible for access token generation using refresh token
     * @param {Object} postData Request body
     * @param {Object} res
     * @returns {Object}
     * @memberof UserService
     */
    async getTokenUsingRefreshToken(postData, res) {
        try {
            console.info('----- In getTokenUsingRefreshToken method -----');
            const { username, password, refresh_token } = postData;
            if (!username || !password || !refresh_token) {
                return res.status(ErrorConstants.BAD_REQUEST_ERROR_CODE).json({ message: 'Please enter all fields' });
            }

            // User should be existing in DB
            const user = await User.findOne({ username });
            if (!user) return res.status(ErrorConstants.BAD_REQUEST_ERROR_CODE).json({ messsage: 'User Does not exist' });

            // Compare to validate password with hashed password stored in DB
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(ErrorConstants.UNAUTHORIZED_ERROR_CODE).json({ message: 'Invalid credentials' });

            if ((postData?.refresh_token) && postData.refresh_token in tokenStore) {
                const token = jwt.sign(
                    { id: user.id, username: user.username, role: user.role },
                    JWT_SECRET,
                    { expiresIn: 900 }
                );
                tokenStore[postData.refresh_token].token = token;
                return res.status(ErrorConstants.SUCCESS_CODE).json({ token });
            } else {
                return res.status(ErrorConstants.NOT_FOUND_ERROR_CODE).json({
                    message: 'Invalid Request.'
                });
            }
        } catch (err) {
            console.error('****** ERROR FROM getTokenUsingRefreshToken METHOD ******', err);
            res.status(ErrorConstants.INTERNAL_SERVER_ERROR_CODE).json(err);
        }
    }
}

module.exports = UserService;
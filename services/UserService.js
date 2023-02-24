const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

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
    async signUpUser(username, email, password, res) {
        try {
            console.info('----- In SIGNUP method -----');
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(password, salt);
            const newUser = new User({
                username: username,
                email: email,
                password: hashedPass,
            });

            const userAlreadyExists = await User.findOne({ username });
            if (userAlreadyExists) {
                res.status(400).json({
                    message: 'User already exists. Please Login directly.'
                });
                return false;
            }

            //saving new user in database
            await newUser.save();
            console.info('----- USER CREATED FROM SIGNUP -----');
            return res.status(200).json({
                message: 'Signup successful. Please login using these credentials.'
            });
        } catch (err) {
            console.error('****** ERROR FROM SIGNUP METHOD ******', err);
            res.status(500).json(err);
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
                return res.status(400).json({ message: 'Please enter all fields' });
            }

            // User should be signed up to login
            const user = await User.findOne({ username });
            if (!user) return res.status(400).json({ messsage: 'User Does not exist' });

            // Compare to validate password with hashed password stored in DB
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

            jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    return res.json({ 
                        token, 
                        username: user.username
                    });
                }
            );
        } catch (err) {
            console.error('****** ERROR FROM LOGIN METHOD ******', err);
            res.status(500).json(err);
        }
    }
}

module.exports = UserService;
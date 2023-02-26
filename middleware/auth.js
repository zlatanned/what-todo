const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const ErrorConstants = require('../utility/constants/ErrorConstants');

/**
 * @author Akshay Shahi
 */

const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(ErrorConstants.UNAUTHORIZED_ERROR_CODE).json({ message: 'No token, authorization denied' });
    try {
        // Verify token
        const decoded = jwt.verify(token, secret);
        // Add user from payload
        req.user = decoded;
        next() // pass along to next handler
    } catch (error) {
        console.error("**** Error from auth middleware ****", error);
        res.status(ErrorConstants.BAD_REQUEST_ERROR_CODE).json({ message: 'Token is not valid' })
    }
}

module.exports = auth
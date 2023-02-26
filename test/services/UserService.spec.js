const UserService = require('../../services/UserService');
const User = require('../../models/User');

jest.mock('../../models/User', () => jest.fn());

const findOneMockFn = jest.fn();

User.mockImplementation(() => {
    findOne: findOneMockFn
});

afterEach(() => {
    jest.clearAllMocks();
});

/* ------ Test Suite for signUpUser ------ */
describe('signUpUser', () => {
    it('should return success response', async() => {
        const role = 'member';
        const salt = "salt";
        const hashedPass = "ncnashkass";
        const email = 'messi@gmail.com';
        const password = 'randompass';
        const username = 'messi';

        findOneMockFn.mockImplementation(() => {
            return {
                username,
                email,
                hashedPass,
                role
            }
        });
        const response = {
            "message": "Signup successful. Please login using these credentials."
        }
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        const userService = new UserService();
        const result = await userService.signUpUser(username, email, password, role, res);
        expect(res.status).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();
    });
});
/* ------ Test Suite for signUpUser ------ */

/* ------ Test Suite for loginUser ------ */
describe('loginUser', () => {
    it('should return success response', async() => {
        const password = 'randompass';
        const username = 'messi';
        const tokenStore = {};

        findOneMockFn.mockImplementation(() => {
            return {
                username,
                email,
                hashedPass,
                role
            }
        });
        const isMatch = true;
        const accessToken = 'dhakdjhkaw';
        const refreshToken = 'jdaiudoai';
        const response = {
            status: "Logged in",
            accessToken: accessToken,
            refresh_token: refreshToken,
        };
        tokenStore[refreshToken] = response;
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        const userService = new UserService();
        const result = await userService.loginUser(username, password, res);
        expect(res.status).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();
    });
});
/* ------ Test Suite for loginUser ------ */

/* ------ Test Suite for getTokenUsingRefreshToken ------ */
describe('loginUser', () => {
    it('should return success response', async() => {
        const postData = {
            username: "messi",
            password: "randompass",
            refresh_token: "dadaiwd"
        }
        const { username, password, refresh_token } = postData;

        findOneMockFn.mockImplementation(() => {
            return {
                username,
                email,
                hashedPass,
                role
            }
        });
        const isMatch = true;
        const tokenStore = {
            postData: {
                refresh_token: {
                    token: ''
                }
            }
        };
        const token = 'fhsiudhao';
        const response = { token };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        const userService = new UserService();
        const result = await userService.getTokenUsingRefreshToken(postData, res);
        expect(res.status).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();
    });
});
/* ------ Test Suite for getTokenUsingRefreshToken ------ */
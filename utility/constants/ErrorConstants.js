/**
 * @author Akshay Shahi
 */

class ErrorConstants {

    static get CONFLICT_ERROR_CODE() {
        return 409;
    }

    static get NOT_FOUND_ERROR_CODE() {
        return 404;
    }

    static get BAD_REQUEST_ERROR_CODE() {
        return 400;
    }

    static get UNAUTHORIZED_ERROR_CODE() {
        return 401;
    }

    static get FORBIDDEN_ERROR_CODE() {
        return 403;
    }

    static get INTERNAL_SERVER_ERROR_CODE() {
        return 500;
    }

    static get SUCCESS_CODE() {
        return 200;
    }
}

module.exports = ErrorConstants;
/**
 * @author Akshay Shahi
 */

const mongoose = require('mongoose');

class Utility {

    /**
     * @description Validates for Mongo ObjectID
     * @param {String} str input string
     * @returns 
     */
    checkIfValidObjectID(str) {
        // Regular expression to check if string is a Mongo ObjectID
        return mongoose.Types.ObjectId.isValid(str);
    }

    /**
     * @description Check Whether value is object (JSON) or not
     * @param {Object} value
     * @returns {Boolean}
     * @memberof Utility
     */
    isObject(value) {
        return value?.constructor === Object;
    }

    /**
     * @description Check Whether value is object and if yes, its empty or not
     * (Returns false if value is not an object or value is not an empty object)
     * @param {Object} value
     * @returns {Boolean}
     * @memberof Utility
     */
    isEmptyObject(value) {
        return !!(this.isObject(value) && Object.keys(value).length === 0);
    }

    /**
     * @description Prepare Filter Data for Querying support on Listing APIs
     * @param {Object} reqQuery
     * @param {Object} filterData
     * @returns {Object}
     * @memberof Utility
     */
    prepareFilterData(reqQuery, filterData) {
        for (const property in reqQuery) {
            filterData[property] = reqQuery[property];
        }
        return filterData;
    }
}

module.exports = Utility;
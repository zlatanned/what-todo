const Post = require('../models/Post');
const Utility = require('../utility/Utility');
const ErrorConstants = require('../utility/constants/ErrorConstants');

/**
 * @author Akshay Shahi
 */

class PostService {

    /**
     * @constructor Creates an instance of the PostService
     * @param {Utility} utility
     * @memberof CommentService
     */
    constructor(utility) {
        this.utility = utility || new Utility();
    }

    /**
     * @description Method responsible for getting all Posts
     * @param {Object} reqQuery Request Query Object
     * @param {Object} res
     * @returns {Object}
     * @memberof PostService
     */
    async getAllPosts(reqQuery, res) {
        try {
            console.info('----- In getAllPosts method -----');

            // Preparing pageNumber, pageSize for PAGINATION
            let pageNumber = reqQuery.page ?? 1;
            let pageSize = reqQuery.limit ?? 10;

            const filterData = {};

            // Preparing Filter Data for QUERYING
            this.utility.prepareFilterData(reqQuery, filterData);

            // Using .find().lean instead of .find() for faster Querying
            const getPosts = await Post.find(filterData).lean().skip((pageNumber * pageSize) - pageSize).limit(pageSize);
            const totalCount = await Post.find().lean().countDocuments()
            if (!getPosts) {
                return res.status(ErrorConstants.BAD_REQUEST_ERROR_CODE).json({
                    message: "No Posts to retrieve"
                });
            }
            
            return res.status(ErrorConstants.SUCCESS_CODE).json({
                comments: getPosts,
                total_count: totalCount,
                page_number: pageNumber,
                page_size: pageSize
            });
        } catch (err) {
            console.error('****** ERROR FROM getAllPosts METHOD ******', err);
            res.status(ErrorConstants.INTERNAL_SERVER_ERROR_CODE).json(err);
        }
    }

    /**
     * @description Method responsible for getting Post by id
     * @param {Object} res
     * @returns {Object}
     * @memberof PostService
     */
    async getPostByID(id, res) {
        try {
            console.info('----- In getPostByID method -----');
            const post = await Post.findById(id);
            res.status(ErrorConstants.SUCCESS_CODE).json(post);
        } catch (err) {
            console.error('****** ERROR FROM getPostByID METHOD ******', err);
            res.status(ErrorConstants.INTERNAL_SERVER_ERROR_CODE).json(err);
        }
    }

    /**
     * @description Method responsible for creating Posts
     * @param {String} description description of post
     * @param {String} userID user id
     * @param {Object} res response object
     * @returns {Object}
     * @memberof PostService
     */
    async createPost(userID, description, res) {
        try {
            console.info('----- In createPost method -----');
            if (!description) {
                return res.status(ErrorConstants.BAD_REQUEST_ERROR_CODE).json({ message: 'Please enter description to create post' });
            }

            const newPost = new Post({ description, created_by: userID });
            await newPost.save();
            return res.status(ErrorConstants.SUCCESS_CODE).json({
                message: `Post created successfully with description: ${description}`
            });
        } catch (err) {
            console.error('****** ERROR FROM createPost METHOD ******', err);
            res.status(ErrorConstants.INTERNAL_SERVER_ERROR_CODE).json(err);
        }
    }

    /**
     * @description Method responsible for deleting Post by id
     * @param {String} userID user id
     * @param {String} userRole user role
     * @param {String} id Post id
     * @param {Object} res response object
     * @returns {Object}
     * @memberof PostService
     */
    async deletePostByID(userID, userRole, id, res) {
        try {
            console.info('----- In deletePostByID method -----');
            const post = await Post.findById(id);
            /**
             * Prechecks:
             *   0. Check if Post to be deleted exists in DB. If not, throw err
             *   1. Only Post owner/admin should be able to perform deletion
             */
            if (!post) {
                return res.status(ErrorConstants.NOT_FOUND_ERROR_CODE).send("Requested Post not found");
            }
            if (post.created_by !== userID && userRole === 'member') {
                return res.status(ErrorConstants.FORBIDDEN_ERROR_CODE).send("Deletion Forbidden! Only post owner/admin can perform this action.");
            }
            post.remove();
            res.status(ErrorConstants.SUCCESS_CODE).json({success: true});
        } catch (err) {
            console.error('****** ERROR FROM deletePostByID METHOD ******', err);
            res.status(ErrorConstants.INTERNAL_SERVER_ERROR_CODE).json(err);
        }
    }

    /**
     * @description Method responsible for updating post by id
     * @param {String} userID user id
     * @param {String} userRole user role
     * @param {String} id Post id
     * @param {Object} data JSON of paramters to be updated
     * @param {Object} res response object
     * @returns {Object}
     * @memberof PostService
     */
    async updatePostByID (userID, userRole, id, data, res) {
        try {
            console.info('----- In updatePostByID method -----');
            const post = await Post.findById(id);
            /**
             * Prechecks:
             *   0. Check if post to be updated exists in DB. If not, throw err
             *   1. Only post owner/admin should be able to perform update
             */
            if (!post) {
                return res.status(ErrorConstants.NOT_FOUND_ERROR_CODE).send("Requested POST not found");
            }
            if (post.created_by !== userID && userRole === 'member') {
                return res.status(ErrorConstants.FORBIDDEN_ERROR_CODE).send("Updation Forbidden! Only post owner/admin can perform this action.");
            }

            await Post.findByIdAndUpdate({_id: id}, data, {upsert: false});
            res.status(ErrorConstants.SUCCESS_CODE).json({ success: true });
        } catch (err) {
            console.error('****** ERROR FROM updatePostByID METHOD ******', err);
            res.status(ErrorConstants.INTERNAL_SERVER_ERROR_CODE).json(err);
        }
    }
}

module.exports = PostService;
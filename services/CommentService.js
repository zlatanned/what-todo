const Comment = require('../models/Comment');
const Post = require('../models/Post');
const Utility = require('../utility/Utility');
const ErrorConstants = require('../utility/constants/ErrorConstants');

/**
 * @author Akshay Shahi
 */

class CommentService {

    /**
     * @constructor Creates an instance of the CommentService
     * @param {Utility} utility
     * @memberof CommentService
     */
    constructor(utility) {
        this.utility = utility || new Utility();
    }

    /**
     * @description Method responsible for getting all comments on a post
     * @param {String} postID ID of post on which comment will be retrieved
     * @param {Object} reqQuery Request Query Object
     * @param {Object} res
     * @returns {Object}
     * @memberof CommentService
     */
    async getCommentsOnPost(postID, reqQuery, res) {
        try {
            console.info('----- In getCommentsOnPost method -----');

            if(!this.utility.checkIfValidObjectID(postID)) {
                return res.status(ErrorConstants.BAD_REQUEST_ERROR_CODE).json({
                    message: "Post ID should be a valid Mongo ObjectID"
                });
            };

            // Preparing pageNumber, pageSize for PAGINATION
            let pageNumber = reqQuery.page ?? 1;
            let pageSize = reqQuery.limit ?? 10;

            const filterData = {post_id: postID};

            // Preparing Filter Data for QUERYING
            this.utility.prepareFilterData(reqQuery, filterData);

            // Using .find().lean instead of .find() for faster Querying
            const getCommentsOnPost = await Comment.find(filterData).lean().skip((pageNumber * pageSize) - pageSize).limit(pageSize);
            const totalCount = await Comment.find({ post_id: postID }).lean().countDocuments()
            if (!getCommentsOnPost) {
                return res.status(ErrorConstants.BAD_REQUEST_ERROR_CODE).json({
                    message: "No Comments/Post to retrieve"
                });
            }
            
            return res.status(ErrorConstants.SUCCESS_CODE).json({
                comments: getCommentsOnPost,
                total_count: totalCount,
                page_number: pageNumber,
                page_size: pageSize
            });
        } catch (err) {
            console.error('****** ERROR FROM getCommentsOnPost METHOD ******', err);
            res.status(ErrorConstants.INTERNAL_SERVER_ERROR_CODE).json(err);
        }
    }

    /**
     * @description Method responsible for adding comments
     * @param {String} postID ID of post on which comment will be added
     * @param {String} userID userID of person that added the comment
     * @param {Object} data Comment data
     * @param {Object} res response object
     * @returns {Object}
     * @memberof CommentService
     */
    async addCommentOnPost(postID, userID, data, res) {
        try {
            console.info('----- In addCommentOnPost method -----');
            const post = await Post.findById(postID);
            if (!(post)) {
                return res.status(ErrorConstants.NOT_FOUND_ERROR_CODE).json({ message: 'Post Not Found' });
            }

            if (!(data?.comment && typeof data.comment === 'string' && data.comment.length > 0)){
                return res.status(ErrorConstants.BAD_REQUEST_ERROR_CODE).json({ message: 'BAD REQUEST' });
            }

            const newComment = new Comment({ comment: data.comment, post_id: postID, created_by: userID });
            await newComment.save();
            return res.status(ErrorConstants.SUCCESS_CODE).json({
                message: `Comment created successfully on post id : ${postID}`
            });
        } catch (err) {
            console.error('****** ERROR FROM addCommentOnPost METHOD ******', err);
            res.status(ErrorConstants.INTERNAL_SERVER_ERROR_CODE).json(err);
        }
    }
}

module.exports = CommentService;
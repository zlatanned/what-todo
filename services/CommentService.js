const Comment = require('../models/Comment');
const Post = require('../models/Post');

/**
 * @author Akshay Shahi
 */

class CommentService {

    /**
     * @description Method responsible for getting all comments on a post
     * @param {String} postID ID of post on which comment will be retrieved
     * @param {Number} pageNumber page Number
     * @param {Number} pageSize Page size
     * @param {Object} res 
     * @returns 
     */
    async getCommentsOnPost(postID, pageNumber, pageSize, res) {
        try {
            console.info('----- In getCommentsOnPost method -----');
            const getCommentsOnPost = await Comment.find({ post_id: postID }).skip((pageNumber * pageSize) - pageSize).limit(pageSize);
            const count = await Comment.find({ post_id: postID }).countDocuments()
            if (!getCommentsOnPost) {
                return res.status(400).json({
                    message: "No Comments/Post to retrieve"
                });
            }
            
            return res.status(200).json({
                comments: getCommentsOnPost,
                count: count,
                page_number: pageNumber,
                page_size: pageSize
            });
        } catch (err) {
            console.error('****** ERROR FROM getCommentsOnPost METHOD ******', err);
            res.status(500).json(err);
        }
    }

    /**
     * @description Method responsible for adding comments
     * @param {String} postID ID of post on which comment will be added
     * @param {String} userID userID of person that added the comment
     * @param {Object} data Comment data
     * @param {Object} res response object
     * @returns
     */
    async addCommentOnPost(postID, userID, data, res) {
        try {
            console.info('----- In addCommentOnPost method -----');
            const post = await Post.findById(postID);
            if (!(post)) {
                return res.status(404).json({ message: 'Post Not Found' });
            }

            if (!(data?.comment && typeof data.comment === 'string' && data.comment.length > 0)){
                return res.status(400).json({ message: 'BAD REQUEST' });
            }

            const newComment = new Comment({ comment: data.comment, post_id: postID, created_by: userID });
            await newComment.save();
            return res.status(200).json({
                message: `Comment created successfully on post id : ${postID}`
            });
        } catch (err) {
            console.error('****** ERROR FROM addCommentOnPost METHOD ******', err);
            res.status(500).json(err);
        }
    }
}

module.exports = CommentService;
const Post = require('../models/Post');

/**
 * @author Akshay Shahi
 */

class PostService {

    /**
     * @description Method responsible for getting all Posts
     * @param {Object} res 
     * @returns 
     */
    async getAllPosts(res) {
        try {
            console.info('----- In getAllPosts method -----');
            const getPosts = await Post.find();
            if (!getPosts) {
                return res.status(400).json({
                    message: "No Posts to retrieve"
                });
            }
            
            return res.status(200).json({
                posts: getPosts,
                count: Object.keys(getPosts).length
            });
        } catch (err) {
            console.error('****** ERROR FROM getAllPosts METHOD ******', err);
            res.status(500).json(err);
        }
    }

    /**
     * @description Method responsible for getting Post by id
     * @param {Object} res 
     * @returns 
     */
    async getPostByID(id, res) {
        try {
            console.info('----- In getPostByID method -----');
            const post = await Post.findById(id);
            res.status(200).json(post);
        } catch (err) {
            console.error('****** ERROR FROM getPostByID METHOD ******', err);
            res.status(500).json(err);
        }
    }

    /**
     * @description Method responsible for creating Posts
     * @param {String} description description of post
     * @param {String} userID user id
     * @param {Object} res response object
     * @returns
     */
    async createPost(userID, description, res) {
        try {
            console.info('----- In createPost method -----');
            if (!description) {
                return res.status(400).json({ message: 'Please enter description to create post' });
            }

            const newPost = new Post({ description, created_by: userID });
            await newPost.save();
            return res.status(200).json({
                message: `Post created successfully with description: ${description}`
            });
        } catch (err) {
            console.error('****** ERROR FROM createPost METHOD ******', err);
            res.status(500).json(err);
        }
    }

    /**
     * @description Method responsible for deleting Post by id
     * @param {String} userID user id
     * @param {String} userRole user role
     * @param {String} id Post id
     * @param {Object} res response object
     * @returns
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
                return res.status(404).send("Requested Post not found");
            }
            if (post.created_by !== userID && userRole === 'member') {
                return res.status(403).send("Deletion Forbidden! Only post owner/admin can perform this action.");
            }
            post.remove();
            res.status(200).json({success: true});
        } catch (err) {
            console.error('****** ERROR FROM deletePostByID METHOD ******', err);
            res.status(500).json(err);
        }
    }

    /**
     * @description Method responsible for updating post by id
     * @param {String} userID user id
     * @param {String} userRole user role
     * @param {String} id Post id
     * @param {Object} data JSON of paramters to be updated
     * @param {Object} res response object
     * @returns
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
                return res.status(404).send("Requested POST not found");
            }
            if (post.created_by !== userID && userRole === 'member') {
                return res.status(403).send("Updation Forbidden! Only post owner/admin can perform this action.");
            }

            await Post.findByIdAndUpdate({_id: id}, data, {upsert: false});
            res.status(200).json({ success: true });
        } catch (err) {
            console.error('****** ERROR FROM updatePostByID METHOD ******', err);
            res.status(500).json(err);
        }
    }
}

module.exports = PostService;
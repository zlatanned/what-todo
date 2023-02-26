const router = require('express').Router();
const PostService = require('../services/PostService');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const { postCreationLimiter } = require('../middleware/rateLimit');

/**
 * @author Akshay Shahi
 */

/**
 * @route           GET /posts
 * @description     Get all posts
 * @access          No-auth route
 */
router.get('/', async (req, res) => {
  const postServiceInst = new PostService();
  return postServiceInst.getAllPosts(req.query, res);
});

/**
 * @route           POST /posts
 * @description     Create a Post
 * @access          Protected route
 */
router.post('/', auth, postCreationLimiter, (req, res) => {
  const postServiceInst = new PostService();
  return postServiceInst.createPost(req.user.id, req.body.description, res);
})

/**
 * @route           PATCH /posts/:id
 * @description     Update a Post
 * @access          Protected route
 */
router.patch('/:id', auth, (req, res) => {
  const postServiceInst = new PostService();
  return postServiceInst.updatePostByID(req.user.id, req.user.role, req.params.id, req.body, res);
})

/**
 * @route           DELETE /posts/:id
 * @description     Delete a Post
 * @access          Protected route
 */
router.delete('/:id', auth, (req, res) => {
  const postServiceInst = new PostService();
  return postServiceInst.deletePostByID(req.user.id, req.user.role, req.params.id, res);
})

/**
 * @route           GET /posts/:id
 * @description     Get a Post
 * @access          No-Auth route
 */
router.get('/:id', async (req, res) => {
  const postServiceInst = new PostService();
  return postServiceInst.getPostByID(req.params.id, res);
});

module.exports = router;

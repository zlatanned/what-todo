const router = require('express').Router();
const CommentService = require('../services/CommentService');
const auth = require('../middleware/auth');

/**
 * @author Akshay Shahi
 */

/**
 * @route           POST /comments/:post_id
 * @description     Create a Todo
 * @access          No-auth route
 */
router.post('/:post_id', auth, (req, res) => {
  const commentServiceInst = new CommentService();
  return commentServiceInst.addCommentOnPost(req.params.post_id, req.user.id, req.body, res);
})

/**
* @route           GET /comments/:post_id
* @description     Get a Todo
* @access          No-Auth route
*/
router.get('/:post_id', async (req, res) => {
  const commentServiceInst = new CommentService();
  return commentServiceInst.getCommentsOnPost(req.params.post_id, req.query, res);
});

module.exports = router;

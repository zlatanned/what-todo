const router = require('express').Router();
const auth = require('../middleware/auth');
const TodoService = require('../services/TodoService');

/**
 * @author Akshay Shahi
 */

// @route   GET /todo
// @desc    Get All Todos
// @access  Public
router.get('/', (req, res) => {
    const todoServiceInst = new TodoService();
    return todoServiceInst.getAllTodos(res);
});

// @route   POST /todo
// @desc    Create new Todo
// @access  Private
router.post('/', auth, (req, res) => {
    const todoServiceInst = new TodoService();
    return todoServiceInst.createTodo(req.body.title, res);
})

// @route   DELETE /todo/:id
// @desc    Delete a Todo
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Todo.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
})

module.exports = router
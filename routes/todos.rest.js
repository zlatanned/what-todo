const router = require('express').Router();
const auth = require('../middleware/auth');
const TodoService = require('../services/TodoService');

/**
 * @author Akshay Shahi
 */

/**
 * @route           GET /todo
 * @description     Get all Todo
 * @access          No-auth route
 */
router.get('/', (req, res) => {
    const todoServiceInst = new TodoService();
    return todoServiceInst.getAllTodos(req.query, res);
});

/**
 * @route           POST /todo
 * @description     Create a Todo
 * @access          Protected route
 */
router.post('/', auth, (req, res) => {
    const todoServiceInst = new TodoService();
    return todoServiceInst.createTodo(req.user.id, req.body.title, res);
})

/**
 * @route           GET /todo/:id
 * @description     Get a Todo
 * @access          No-Auth route
 */
router.get('/:id', async (req, res) => {
    const todoServiceInst = new TodoService();
    return todoServiceInst.getTodoByID(req.params.id, res);
});

/**
 * @route           DELETE /todo/:id
 * @description     Delete a Todo
 * @access          Protected route
 */
router.delete('/:id', auth, (req, res) => {
    const todoServiceInst = new TodoService();
    return todoServiceInst.deleteTodoByID(req.user.id, req.user.role, req.params.id, res);
})

/**
 * @route           PATCH /todo/:id
 * @description     Update a Todo
 * @access          Protected route
 */
router.patch('/:id', auth, (req, res) => {
    const todoServiceInst = new TodoService();
    return todoServiceInst.updateTodoByID(req.user.id, req.user.role, req.params.id, req.body, res);
})

module.exports = router;
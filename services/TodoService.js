const Todo = require('../models/Todo');

/**
 * @author Akshay Shahi
 */

class TodoService {

    /**
     * @description Method responsible for getting all todos
     * @param {Object} res 
     * @returns 
     */
    async getAllTodos(res) {
        try {
            console.info('----- In getAllTodos method -----');
            const getTodos = await Todo.find();
            if (!getTodos) {
                return res.status(400).json({
                    message: "No Todos to retrieve"
                });
            }
            
            return res.status(200).json({
                todos: getTodos,
                count: Object.keys(getTodos).length
            });
        } catch (err) {
            console.error('****** ERROR FROM getAllTodos METHOD ******', err);
            res.status(500).json(err);
        }
    }

    /**
     * @description Method responsible for creating Todos
     * @param {String} title
     * @param {Object} res 
     * @returns 
     */
    async createTodo(title, res) {
        try {
            console.info('----- In createTodo method -----');
            if (!title) {
                return res.status(400).json({ message: 'Please enter title to create todo' });
            }

            // User should be signed up to login
            const checkForDuplicateTodo = await Todo.findOne({ title });
            if (checkForDuplicateTodo) return res.status(400).json({ messsage: 'Title already exists.' });

            const newTodo = new Todo({ title });
            await newTodo.save();
            return res.status(200).json({
                message: `TODO created successfully with title: ${title}`
            });
        } catch (err) {
            console.error('****** ERROR FROM createTodo METHOD ******', err);
            res.status(500).json(err);
        }
    }
}

module.exports = TodoService;
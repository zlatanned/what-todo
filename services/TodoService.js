const Todo = require('../models/Todo');

/**
 * @author Akshay Shahi
 */

class TodoService {

    /**
     * @description Method responsible for getting all todos
     * @param {Number} pageNumber page Number
     * @param {Number} pageSize Page size
     * @param {Object} res 
     * @returns 
     */
    async getAllTodos(pageNumber, pageSize, res) {
        try {
            console.info('----- In getAllTodos method -----');
            const getTodos = await Todo.find().skip((pageNumber * pageSize) - pageSize).limit(pageSize);
            const count = await Todo.find().countDocuments();
            if (!getTodos) {
                return res.status(400).json({
                    message: "No Todos to retrieve"
                });
            }
            
            return res.status(200).json({
                comments: getTodos,
                count: count,
                page_number: pageNumber,
                page_size: pageSize
            });
        } catch (err) {
            console.error('****** ERROR FROM getAllTodos METHOD ******', err);
            res.status(500).json(err);
        }
    }

    /**
     * @description Method responsible for getting todo by id
     * @param {Object} res 
     * @returns 
     */
    async getTodoByID(id, res) {
        try {
            console.info('----- In getTodoByID method -----');
            const todo = await Todo.findById(id);
            res.status(200).json(todo);
        } catch (err) {
            console.error('****** ERROR FROM getTodoByID METHOD ******', err);
            res.status(500).json(err);
        }
    }

    /**
     * @description Method responsible for creating Todos
     * @param {String} title title of todo (has to be unique)
     * @param {String} userID user id
     * @param {Object} res response object
     * @returns
     */
    async createTodo(userID, title, res) {
        try {
            console.info('----- In createTodo method -----');
            if (!title) {
                return res.status(400).json({ message: 'Please enter title to create todo' });
            }

            // Duplicacy Check - Title should be unique
            const checkForDuplicateTodo = await Todo.findOne({ title });
            if (checkForDuplicateTodo) return res.status(409).send('CONFLICT! Title already exists.');

            const newTodo = new Todo({ title, created_by: userID });
            await newTodo.save();
            return res.status(200).json({
                message: `TODO created successfully with title: ${title}`
            });
        } catch (err) {
            console.error('****** ERROR FROM createTodo METHOD ******', err);
            res.status(500).json(err);
        }
    }

    /**
     * @description Method responsible for deleting todo by id
     * @param {String} userID user id
     * @param {String} userRole user role
     * @param {String} id Todo id
     * @param {Object} res response object
     * @returns
     */
    async deleteTodoByID(userID, userRole, id, res) {
        try {
            console.info('----- In deleteTodoByID method -----');
            const todo = await Todo.findById(id);
            /**
             * Prechecks:
             *   0. Check if todo to be deleted exists in DB. If not, throw err
             *   1. Only todo owner/admin should be able to perform deletion
             */
            if (!todo) {
                return res.status(404).send("Requested TODO not found");
            }
            if (todo.created_by !== userID && userRole === 'member') {
                return res.status(403).send("Deletion Forbidden! Only todo owner/admin can perform this action.");
            }
            todo.remove();
            res.status(200).json({success: true});
        } catch (err) {
            console.error('****** ERROR FROM deleteTodoByID METHOD ******', err);
            res.status(500).json(err);
        }
    }

    /**
     * @description Method responsible for updating todo by id
     * @param {String} userID user id
     * @param {String} userRole user role
     * @param {String} id Todo id
     * @param {Object} data JSON of paramters to be updated
     * @param {Object} res response object
     * @returns
     */
    async updateTodoByID (userID, userRole, id, data, res) {
        try {
            console.info('----- In updateTodoByID method -----');
            const todo = await Todo.findById(id);
            /**
             * Prechecks:
             *   0. Check if todo to be updated exists in DB. If not, throw err
             *   1. Only todo owner/admin should be able to perform update
             */
            if (!todo) {
                return res.status(404).send("Requested TODO not found");
            }
            if (todo.created_by !== userID && userRole === 'member') {
                return res.status(403).send("Updation Forbidden! Only todo owner/admin can perform this action.");
            }

            /**
             * Not allowing to update once TODO marked as complete.
             * Can only perform GET and DELETE for this todo.
             */
            if (todo.is_completed) {
                return res.status(409).send("CONFLICT! Todo already marked as completed");
            }
            await Todo.findByIdAndUpdate({_id: id}, data, {upsert: false});
            res.status(200).json({ success: true });
        } catch (err) {
            console.error('****** ERROR FROM updateTodoByID METHOD ******', err);
            res.status(500).json(err);
        }
    }
}

module.exports = TodoService;
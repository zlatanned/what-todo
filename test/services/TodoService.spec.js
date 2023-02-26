const TodoService = require('../../services/TodoService');
const Utility = require('../../utility/Utility');
const Todo = require('../../models/Todo');

jest.mock('../../utility/Utility', () => jest.fn());
jest.mock('../../models/Todo', () => jest.fn());

const prepareFilterDataMockFn = jest.fn();

Utility.mockImplementation(() => {
    prepareFilterData: prepareFilterDataMockFn
});

afterEach(() => {
    jest.clearAllMocks();
});

/* ------ Test Suite for getAllTodos ------ */
describe('getAllTodos', () => {
    it('should return success response', async() => {
        let pageNumber = 1;
        let pageSize = 10
        const reqQuery = {};

        const filterData = {};
        prepareFilterDataMockFn.mockImplementation(() => {
            return filterData;
        });
        const getTodos = [
            {
                "_id": "id",
                "title": "can i update this hehe",
                "is_completed": false,
                "created_by": "63f9ed17e44223c336c55481",
                "creator_isAdmin": false,
                "createdAt": "2023-02-25T11:19:08.032Z",
                "updatedAt": "2023-02-26T13:50:51.332Z",
                "__v": 0
            }
        ];
        const totalCount = 10;
        const response = {
            comments: getTodos,
            total_count: totalCount,
            page_number: pageNumber,
            page_size: pageSize
        }
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        const todoService = new TodoService();
        const result = await todoService.getAllTodos(reqQuery, res);
        expect(res.status).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();
    });
});
/* ------ Test Suite for getAllTodos ------ */

/* ------ Test Suite for getTodoByID ------ */
describe('getTodoByID', () => {
    it('should return success response', async() => {
        const id = 'id';
        const reqQuery = {};
        const todo = {
            "_id": id,
            "title": "can i update this hehe",
            "is_completed": false,
            "created_by": "63f9ed17e44223c336c55481",
            "creator_isAdmin": false,
            "createdAt": "2023-02-25T11:19:08.032Z",
            "updatedAt": "2023-02-26T13:50:51.332Z",
            "__v": 0
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        const todoService = new TodoService();
        const result = await todoService.getTodoByID(id, res);
        expect(res.status).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();
    });
});
/* ------ Test Suite for getTodoByID ------ */
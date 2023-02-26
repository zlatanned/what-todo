const PostService = require('../../services/PostService');
const Utility = require('../../utility/Utility');
const Post = require('../../models/Post');

jest.mock('../../utility/Utility', () => jest.fn());
jest.mock('../../models/Post', () => jest.fn());

const prepareFilterDataMockFn = jest.fn();

Utility.mockImplementation(() => {
    prepareFilterData: prepareFilterDataMockFn
});

afterEach(() => {
    jest.clearAllMocks();
});

/* ------ Test Suite for getAllPosts ------ */
describe('getAllPosts', () => {
    it('should return success response', async() => {
        let pageNumber = 1;
        let pageSize = 10
        const reqQuery = {};

        const filterData = {};
        prepareFilterDataMockFn.mockImplementation(() => {
            return filterData;
        });
        const getPosts = [
            {
                "_id": "id",
                "description": "testing for comments",
                "created_by": "creator",
                "createdAt": "2023-02-26T06:03:32.872Z",
                "updatedAt": "2023-02-26T06:03:32.872Z",
                "__v": 0
              }
        ];
        const totalCount = 10;
        const response = {
            comments: getPosts,
            total_count: totalCount,
            page_number: pageNumber,
            page_size: pageSize
        }
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        const postService = new PostService();
        const result = await postService.getAllPosts(reqQuery, res);
        expect(res.status).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();
    });
});
/* ------ Test Suite for getAllPosts ------ */

/* ------ Test Suite for getPostByID ------ */
describe('getPostByID', () => {
    it('should return success response', async() => {
        const id = 'id';
        const reqQuery = {};
        const post = {
            "_id": "post_id",
            "description": "testing for comments",
            "created_by": "creator",
            "createdAt": "2023-02-26T06:03:32.872Z",
            "updatedAt": "2023-02-26T06:03:32.872Z",
            "__v": 0
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        const postService = new PostService();
        const result = await postService.getPostByID(reqQuery, res);
        expect(res.status).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();
    });
});
/* ------ Test Suite for getPostByID ------ */
const CommentService = require('../../services/CommentService');
const Utility = require('../../utility/Utility');
const Comment = require('../../models/Comment');
const Post = require('../../models/Post');

jest.mock('../../utility/Utility', () => jest.fn());
jest.mock('../../models/Post', () => jest.fn());
jest.mock('../../models/Comment', () => jest.fn());

const checkIfValidObjectIDMockFn = jest.fn();
const prepareFilterDataMockFn = jest.fn();

Utility.mockImplementation(() => {
    prepareFilterData: prepareFilterDataMockFn
    checkIfValidObjectID: checkIfValidObjectIDMockFn
});

afterEach(() => {
    jest.clearAllMocks();
});

/* ------ Test Suite for getCommentsOnPost ------ */
describe('getCommentsOnPost', () => {
    it('should return success response', async() => {
        const validatePostID = true;
        let pageNumber = 1;
        let pageSize = 10
        const postID = 'post_id';
        const reqQuery = {};

        const filterData = {
            post_id: postID
        };
        checkIfValidObjectIDMockFn.mockImplementation(() => {
            return true;
        });
        prepareFilterDataMockFn.mockImplementation(() => {
            return filterData;
        });
        const getCommentsOnPost = [
            {
              "_id": "id",
              "comment": "hehehe",
              "post_id": "post_id",
              "created_by": "creator",
              "createdAt": "2023-02-26T10:06:38.923Z",
              "updatedAt": "2023-02-26T10:06:38.923Z",
              "__v": 0
            }
        ];
        const totalCount = 10;
        const response = {
            comments: getCommentsOnPost,
            total_count: totalCount,
            page_number: pageNumber,
            page_size: pageSize
        }
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        const commentService = new CommentService();
        const result = await commentService.getCommentsOnPost(postID, reqQuery, res);
        expect(res.status).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();
    });
});
/* ------ Test Suite for getCommentsOnPost ------ */

/* ------ Test Suite for addCommentOnPost ------ */
describe('addCommentOnPost', () => {
    it('should return success response', async() => {
        const postID = 'post_id';
        const userID = 'creator';
        const post = {
            "_id": "post_id",
            "description": "testing for comments",
            "created_by": "creator",
            "createdAt": "2023-02-26T06:03:32.872Z",
            "updatedAt": "2023-02-26T06:03:32.872Z",
            "__v": 0
        };
        const data = {
            comment: "comment"
        }
        const newComment = {
            "_id": "id",
            "comment": "hehehe",
            "post_id": "post_id",
            "created_by": "creator",
            "createdAt": "2023-02-26T10:06:38.923Z",
            "updatedAt": "2023-02-26T10:06:38.923Z",
            "__v": 0
          }
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        const commentService = new CommentService();
        const result = await commentService.addCommentOnPost(postID, userID, data, res);
        expect(res.status).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();
    });
});
/* ------ Test Suite for addCommentOnPost ------ */
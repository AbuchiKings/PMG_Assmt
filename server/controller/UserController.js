const query = require('../queries/dbqueries');;
const pool = require('../queries/pool');
const responseHandler = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');

class UserController {

    static async createUser(req, res, next) {
        try {
            const { firstname, lastname, gender, date_of_birth } = req.body;

            const dateCreated = new Date();

            const user = await pool.query(query.createUser(firstname, lastname, gender, date_of_birth, dateCreated));
            const result = user.rows[0];

            return responseHandler(res, result, next, 201, 'User was successfully created');
        } catch (error) {
            return next(error);
        }
    }

    static async updateUser(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const { firstname, lastname, gender, date_of_birth } = req.body;

            const foundUser = await pool.query(query.getUserById(id));
            if (!foundUser.rows[0]) return errorHandler(404, 'User not found');

            const dateUpdated = new Date()
            const user = await pool.query(query.updateUser(firstname, lastname, gender, date_of_birth, dateUpdated, id));
            const result = user.rows[0]
            return responseHandler(res, result, next, 200, 'User was successfully updated');
        } catch (error) {
            return next(error);
        }
    }


    static async getUser(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);

            const user = await pool.query(query.getUserById(id));
            if (!user.rows[0]) return errorHandler(404, 'User was not found');

            return responseHandler(res, user.rows[0], next, 200, 'User retrieved successfully')
        } catch (error) {
            return next(error)
        }
    }

    static async getAllUsers(req, res, next) {
        try {
            let { page, page_size } = req.query;
            page = page ? page - 1 : 1 - 1;
            page_size = page_size ? page_size : 25;
            let offset = page * page_size;
            req.query.page_size = page_size;

            const result = await pool.query(query.getAllUsers(req.query, offset));
            if (result.rowCount < 1) {
                return errorHandler(404, 'No user found');
            }
            return responseHandler(res, result.rows, next, 200, 'Users retrieved successfully');
        } catch (error) {
            if (error.code == 42703) {
                error.message = 'No user found';
            }
            return next(error);
        }
    }


    static async deleteUser(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await pool.query(query.deleteUser(id));

            if (!user.rows[0]) errorHandler(404, "User was not found");

            return responseHandler(res, null, next, 204, 'User deleted successfully');
        } catch (error) {
            return next(error);
        }
    }


}

module.exports = UserController;
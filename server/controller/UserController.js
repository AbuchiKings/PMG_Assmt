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
            console.log(error);
            return next(error);
        }
    }

    static async updateUser(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const { firstname, lastname, gender, date_of_birth } = req.body;

            const foundUser = await pool.query(query.getUserById(id));
            if (!foundUser.rows[0]) return errorHandler(404, 'User not found');

            const dateUpdated = Date()
            const user = await pool.query(query.updateUser(firstname, lastname, gender, date_of_birth, dateUpdated, id));
            const result = user.rows[0]
            return responseHandler(res, result, next, 200, 'User was successfully updated');
        } catch (error) {
            console.log(error)
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
            console.log(error);
            return next(error)
        }
    }

    static async getAllUsers(req, res, next) {
        try {
            const result = await pool.query(query.getAllUsers());
            if (result.rowCount < 1) {
                return errorHandler(404, 'No user found');
            }
            return responseHandler(res, result.rows, next, 200, 'Users retrieved successfully');
        } catch (error) {
            console.log(error);
            return next(error);
        }
    }


    static async deleteUser(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await pool.query(query.deleteUser(id));

            if (user.rows[0]) errorHandler(404, "User was not found");

            return responseHandler(res, null, next, 200, 'User deleted successfully');
        } catch (error) {
            console.log(error);
            return next(error);
        }
    }


}

export default UserController;
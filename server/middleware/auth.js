const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const errorHandler = require('../utils/errorHandler');
const responseHandler = require('../utils/responseHandler');
const pool = require('../queries/pool')
//const { Buffer } = require('buffer');
require('dotenv').config()

const auth = {

     verifyToken(req, res, next) {
        try {
            const access = req.headers.authorization;
            if (!access || !access.split(' ')[1]) {
                res.set("WWW-Authenticate", "Basic");
                return res.status(401).send({error: 1, message: 'Unauthorised'});
            }

            let auth = access.split(' ')[1];
            const buff = Buffer.from(auth, 'base64');
            const str = buff.toString();

            const username = str.split(':')[0];
            const pwd = str.split(':')[1];
            console.log(process.env.PASS)

            const isValidName = username === process.env.USER_NAME;
            const isValidPwd = pwd === process.env.PASS;

            if (!isValidPwd || !isValidName) {
                res.set("WWW-Authenticate", "Basic");
                return res.status(401).send({error: 1, message: 'Unauthorised'});
            }
            return next();
        } catch (error) {
            return next(error);
        }
    }

}

module.exports = auth;

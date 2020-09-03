const dotenv = require('dotenv').config();
//const { Buffer } = require('buffer');

const auth = {

    verifyCredentials(req, res, next) {
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

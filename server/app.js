const express = require('express');
const router = require('./routes/router.js');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const sanitizeNosqlQuery = require('express-mongo-sanitize');
const rateLimiter = require('express-rate-limit');
const cookieParser = require('cookie-parser');
//import preventCrossSiteScripting from 'xss-clean';
const preventParameterPollution = require('hpp');
const compression = require('compression');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.options('*', cors());

app.use(helmet());
app.use('/api', rateLimiter({
    max: 200,
    windowMs: 1000 * 60 * 60,
    message: 'Too many requests from this IP. Try again in an hour.'
}));

app.use(express.json({ limit: '20kb' }));
app.use(cookieParser());

app.use(sanitizeNosqlQuery());
//app.use(preventCrossSiteScripting());
app.use(preventParameterPollution());

app.use(compression());

app.use(router);

app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        err.statusCode = err.statusCode || 500;
        err.message = err.statusCode === 500 ? "Something has gone very wrong" : err.message;
    }
    res.status(err.statusCode || 500);
    return res.json({ ...err });
});
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

process.on('uncaughtException', (error) => {
    console.log(error.name, error.message);
    console.log(error);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    console.log(error.name, error.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated!');
    });
});

module.exports = app;

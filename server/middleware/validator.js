const { body, param, validationResult, query } = require('express-validator');
const errorHandler = require('../utils/errorHandler');



const validateCreate = [
    body(['firstname', 'lastname'])
        .exists()
        .withMessage('Firts name and last name cannot be empty.')
        .isString()
        .custom((value) => {
            if (value !== undefined) {
                return value.replace(/\s+/g, '').trim().length > 1;
            }
        })
        .withMessage('First name and last name must have a minimun of two(2) letters.'),
    body('gender')
        .custom((value) => {
            return value === 'M' || value === 'F';
        })
        .withMessage('Invalid input for field gender'),
    body('date_of_birth')
        .custom((value) => {
            const reg = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;
            return reg.test(value.trim());
        })
        .withMessage('Invalid input for field date of birth')
];

const validateId = [
    param('id')
        .exists()
        .withMessage('Provide an id')
        .isInt()
        .withMessage('Invalid user id')

];
const validateQueries = [
    query(['page', 'page_size'])
        // .exists()
        // .withMessage('Page and page_size cannot be empty')
        .isInt()
        .withMessage('Page and page_size must be of type number'),
    query('sort_order_mode')
        .custom((value) => {
            return ['asc', 'desc'].includes(value.toLowerCase());
        })
        .withMessage('Sort order can only be asc(ascending) or desc(descending)')

];
const validateGetAll = [
    validateQueries[0].optional(),
    validateQueries[1].optional()
]
const validateUpdate = [
    validateId,
    validateCreate[0].optional(),
    validateCreate[1].optional(),
    validateCreate[2].optional()
];

const validationHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorHandler(422, errors.array()[0].msg)
    } else {
        next();
    }
};

const validator = {
    validateUpdate,
    validateId,
    validateCreate,
    validateGetAll,
    validationHandler
};

module.exports = validator;

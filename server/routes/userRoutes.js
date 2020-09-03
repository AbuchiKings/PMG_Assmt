const { Router } = require('express');
const auth = require('../middleware/auth');
const User = require('../controller/UserController')
const { validateUpdate, validateId, validateCreate, validateGetAll, validationHandler } = require('../middleware/validator')


const router = Router();
router.use(auth.verifyCredentials);

router.post('/users', validateCreate, validationHandler, User.createUser);
router.get('/users/:id', validateId, validationHandler, User.getUser);
router.get('/users', validateGetAll, validationHandler, User.getAllUsers);
router.put('/users/:id', validateUpdate, validationHandler, User.updateUser);
router.delete('/users/:id', validateId, validationHandler, User.deleteUser);


module.exports = router;
const { Router } = require('express');
const auth = require('../middleware/auth');
const User = require('../controller/UserController')
//const user = require('./userRoutes');


const router = Router();

router.post('/users', auth.verifyToken, User.createUser);
router.get('/users/:id', auth.verifyToken, User.getUser);
router.get('/users', auth.verifyToken, User.getAllUsers);
router.patch('/users', auth.verifyToken, User.updateUser);
router.delete('/users/:id', auth.verifyToken, User.deleteUser);


module.exports = router;
const { Router } = require('express');
const auth = require('../middleware/auth');
//const user = require('./userRoutes');


const router = Router();

router.get('/users', auth.verifyToken)


module.exports = router;
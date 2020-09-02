const { Router } = require('express');
const user = require('./userRoutes');


const router = Router();

router.get('/', (request, response) => {
    response.status(200).json({
        status: 'success',
        message: 'Welcome to world of awesomeness.'
    });
});

router.use('/api/v1', user);
router.all('*', (request, response) => {
    response.status(404).json({
        status: 'error',
        message: `${request.originalUrl} was not found on this platform`
    });
});


module.exports = router;
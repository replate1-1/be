const router = require('express').Router();
const userRouter = require('../users/user-router.js');
const authRouter = require('../auth/auth-router.js');

router.use('/', authRouter);
router.use('/users', userRouter);


//* this is from the server file, things need to be switched over possibly same with the tests.

module.exports = router;
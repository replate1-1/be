const router = require('express').Router();
const userRouter = require('../users/user-router.js');
const authRouter = require('../auth/auth-router.js');
const pickupsRouter = require('../pickups/pickups-router.js');

router.use('/', authRouter);
router.use('/user', userRouter);
router.use('/pickups', pickupsRouter);

module.exports = router;
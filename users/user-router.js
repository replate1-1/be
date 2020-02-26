const router = require('express').Router();
const Users = require('./user-model.js');

//code here to return a list of users just in case that's needed??

//TODO: add restritced middleware here later
router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;

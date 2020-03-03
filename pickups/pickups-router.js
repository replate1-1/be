const router = require('express').Router();
const mware = require('../auth/middleware.js');
const Pickups = require('./pickups-model.js');

//GET /pickups
router.get('/', (req, res) => {

  Pickups.findPickups()
    .then(pickups => {
      res.json(pickups);
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to retrieve pickups",
        error: err
      });
    });
});

//GET /pickups/:userId
router.get('/:userId', (req, res) => {

  const { userId } = req.params;

  Pickups.findAcceptedPickups(userId)
    .then(pickups => {
      if(pickups) {
        res.json(pickups);
      }else {
        res.status(404).json({
          message: "This user has no accepted pickups at this time."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an issue getting user pickups.",
        error: err
      });
    });
});

//POST /pickups
router.post('/', (req, res) => {

  const pickup = req.body;

  Pickups.addPickup(pickup)
    .then(newPickup => {
      res.status(201).json(newPickup);
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an issue adding new pickup",
        error: err
      });
    });
});

//POST pickups/user
router.post('/user/:userId', (req, res) => {

  const { userId } = req.params;
  const { pickupId } = req.body;

  const data = {
    pickupId,
    driverId: userId
  }

  Pickups.addExistingPickup(data)
    .then(added => {
      console.log(data);
      res.status(201).json(added);
    })
    .catch(err => {
      console.log(data);
      res.status(500).json({
        message: "There was an issue adding pickup.",
        error: err
      });
    });
});

//DELETE /pickups/:id //!this needs middleware to see if id is legit.
router.delete('/:id', (req, res) => {

  const { id } = req.params;

  Pickups.removePickup(id)
    .then(pickup => {
      res.status(200).json({
        message: "Pickup has been deleted."
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an issue deleting pickup",
        error: err
      });
    });
});

//DELETE /pickups/user/:id  
router.delete('/user/:pickupId', (req, res) => {
  
  const { pickupId } = req.params;

  Pickups.removeDriverPickup(pickupId)
    .then(pickup => {
      res.status(200).json({
        message: "Pickup has been deleted from driver list."
      });
    });
});



//*Possible plans for future code: rather than having a driver delete the pickup when completed, the functionality will work so when the task is updated to be completed, it removes the pickup from their main list and over to a completed table to keep records of all user/facility transactions after the fact. 

module.exports = router;
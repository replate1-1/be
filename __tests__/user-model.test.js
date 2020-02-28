const db = require('../database/dbConfig.js');
const Users = require('../users/user-model.js');

//I might make this a general 'user test' file and include tests for user model and router here...
//for user-model...I'll be writting add, findByID, and findBy() functions to start off
//These will be the basis of the register and loging features.
//Will be making sure that the functions are actually adding the new info to the temp database and that the user information is being inputter properly.

beforeEach(async () => { //clearing out all entries before each test to make sure data isn't muddled or erroneous.
  await db('users').truncate(); 
});

describe('user-model', () => {

  describe('add', () => {

    it('adds a new user data to db duplicate usernames not allowed', async () => {

      await Users.add({ username: 'newuser1', password: 'shh' });
      await Users.add({ username: 'newuser2', password: 'hush' });
      await Users.add({ username: 'newuser3', password: 'password' });
      //await Users.add({ username: 'newuser2', password: 'secrets' });
      //this makes tests fail beucase there cannot be any duplicate usernames.

      const users = await db('users');
      expect(users).toHaveLength(3);
    })

    it('should return correct new user data', async () => {

      let user = await Users.add({ username: 'coolguy37', password: 'mom' });
      expect(user.username).toBe('coolguy37');
      
    })
  })
});

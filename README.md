# Replate Backend

- [Product Doc](https://docs.google.com/document/d/1s1-mHEn4bQZuq-wBrxv-JhNILDFDym0seSC5CY-Li4Y/edit#)

# Endpoints

### BASE URL: https://replate-bw.herokuapp.com/

### User related endpoints

| request | endpoint             | description                                     | requires/returns                                    |
|---------|----------------------|-------------------------------------------------|-----------------------------------------------------|
|   POST  | /api/user/driver     | creates a new user (driver)                   | username, email, password, volunteerName, phoneNumber |
|   POST  | /api/user/business   | creates a new user (business)  | username, email, password, businessName, businessAddress phoneNumber |
|   POST  | /api/login/driver    | login driver, returns cookie and adds session to database | username, password                        |
|   POST  | /api/login/business  | login business, returns cookie and adds session to database | username, password                      |                                                |
|   GET   | /api/user/driver/:username | returns specific user data             | username in params                            |
|   GET   | /api/user/business/:username| returns specific business data        | username in params                   |
|   GET   | /api/drivers          | returns a list of all drivers | user must be logged in to access                  |
|   GET   | /api/businesses       | returns a list of all businesses  | user must be logged in to access  |
|   GET   | /api/facilities       | returns a list of all facilities/dropoff locations| not protected endpoint, anyone can gain access |
|  DELETE | /api/drivers/:id  | deletes driver account                | driver id in params              |
|  DELETE | /api/businesses/:id| deletes burinsess account            | business id in params            |

### Pickup related endpoints

|request|  endpoint | description                    | requires/returns                      |
|-------|-----------|--------------------------------|---------------------------------------|
| GET   | /api/pickups| returns list of all available pickups | user must be logged in |
| GET   | /api/pickups/:userId | returns list of all driver accepted pickups | user must be logged in|
| POST  | /api/pickups | adds new pickup             | food, amount, description(optional for now), pickupTime, dropoffId (optional for now) |
| POST  | /api/user/:userId | adds existing pickup to drivers accepted pickups list | driver id in params, pickup id in body |
| DELETE | /api/pickups/:pickupId | removes existing pickup from main pickup list | pickup id in params |
| DELETE | /api/pickups/user/:pickupId | removed pickup from users accepted pickup list | pickup id in params | 

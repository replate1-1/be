# Replate Backend

- [Product Doc](https://docs.google.com/document/d/1s1-mHEn4bQZuq-wBrxv-JhNILDFDym0seSC5CY-Li4Y/edit#)

# Postman Documentation
### [postmandoc](https://documenter.getpostman.com/view/10645138/SzRw3ryq?version=latest#74d0a1cf-7826-4456-8144-a2d09edcfabd)

- Documents all API requests with code snippet example and short explainations of each.

# Endpoints

### BASE URL: https://replate-bw.herokuapp.com/

### User related endpoints

| request | endpoint             | description                                     | requires/returns                                    |
|---------|----------------------|-------------------------------------------------|-----------------------------------------------------|
|   POST  | /api/user/driver     | creates a new user (driver)                   | username, email, password, volunteerName, phoneNumber |
|   POST  | /api/user/business   | creates a new user (business)  | username, email, password, businessName, businessAddress phoneNumber |
|   POST  | /api/login/driver    | login driver, returns token | username, password                        |
|   POST  | /api/login/business  | login business, returns token | username, password                      |
|   GET   | /api/user/driver/:username | returns specific user data             | username in params                            |
|   GET   | /api/user/business/:username| returns specific business data        | username in params                   |
|   GET   | /api/drivers          | returns a list of all drivers | user must be logged in to access                  |
|   GET   | /api/businesses       | returns a list of all businesses  | user must be logged in to access  |
|   GET   | /api/facilities       | returns a list of all facilities/dropoff locations| not protected endpoint, anyone can gain access |
|  DELETE | /api/user/drivers/:id  | deletes driver account                | driver id in params              |
|  DELETE | /api/user/businesses/:id| deletes burinsess account            | business id in params            |

### Pickup related endpoints

|request|  endpoint | description                    | requires/returns                      |
|-------|-----------|--------------------------------|---------------------------------------|
| GET   | /api/pickups| returns list of all available pickups | user must be logged in |
| GET   | /api/pickups/driver/:driverId | returns list of all driver accepted pickups | user must be logged in|
| GET   | /api/pickups/:businessUsername | returns list of all pickups for one business | business username in parameters |
| POST  | /api/pickups/:businessUsername | adds new pickup             | food, amount, description(optional for now), pickupTime, dropoffId (optional for now), lat, lng |
| PUT    | /api/user/business/pickups/:pickupId | edits existing pickup info | pickup id in parameter | 
| POST  | /api/pickups/driver/:userId | adds existing pickup to drivers accepted pickups list | driver id in parameters, pickupId in body |
| DELETE | /api/pickups/:pickupId | removes existing pickup from main pickup list | pickup id in params |
| DELETE | /api/pickups/driver/:pickupId | removed pickup from users accepted pickup list | pickup id in params | 

# Replate Backend

- [Product Doc](https://docs.google.com/document/d/1s1-mHEn4bQZuq-wBrxv-JhNILDFDym0seSC5CY-Li4Y/edit#)

# Endpoints

### BASE URL: https://replate-bw.herokuapp.com/

| request | endpoint             | description                                     | requires/returns                                    |
|---------|----------------------|-------------------------------------------------|-----------------------------------------------------|
|   POST  | /api/user/driver     | creates a new user (driver)                   | username, email, password, volunteerName, phoneNumber |
|   POST  | /api/user/business   | creates a new user (business)  | username, email, password, businessName, businessAddress phoneNumber |
|   POST  | /api/login/driver    | login driver, returns cookie and adds session to database | username, password                        |
|   POST  | /api/login/business  | login business, returns cookie and adds session to database | username, password                      |
|   GET   | /api/logout          | logs out current user, destroys session         |                                                     |
|   GET   | /api/user/driver/:username | returns specific user data             | username, name, phoneNumber                            |
|   GET   | /api/user/business/:username| returns specific business data        | username, address, name, phoneNumber                   |
|   GET   | /api/drivers          | returns a list of all drivers                  | username, name, email, phoneNumber                  |
|   GET   | /api/businesses       | returns a list of all businesses      | username, email, businessName, businessAddress, phoneNumber  |
|  DELETE | /api/drivers/:id  | deletes driver account                | driver id in params              |
|  DELETE | /api/businesses/:id| deletes burinsess account            | business id in params            |

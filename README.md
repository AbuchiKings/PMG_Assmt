# PMG_Assmt

## About The API
The API itself can be found [here](https://pmg-assmt.herokuapp.com/). This app runs on NodeJs V10.15.1. 


## Local Development

To run on your local machine. Make sure you have NodeJs >= V10.15.1 and Postgres Database  installed.

```
1. Clone the repo to your local machine using the **git clone https://github.com/AbuchiKings/PMG_Assmt.git** command.
2. On your terminal, navigate to the cloned directory **cd PMG_Assmt**
3. Install dependencies by running  **npm install** command.
4. Create a postgres database and add connection string to a .env file
5. Create environment variables for the following:
     NODE_ENV
     DATABASE_URL
     USER_NAME
     PASS
6. Start the server, using the command **npm start**.
7. API server should be up and running.
```


| Endpoint                                                | Function                                             |
| --------------------------------------------------------| -----------------------------------------------------|
| {POST}/api/v1/users                                     | Creates a new user                                   |
| {GET}/api/v1/users                                      | Retrieves all users                                  |
| {PUT}/api/v1/users/:id                                  | Updates a user                                       |
| {GET}/api/v1/users/:id                                  | Retrieves a single user                              |
| {DELETE}/api/v1/users/:id                               | Deltes a specific user                               |                           


### Sample Requests and Responses From The API


### Create A User

* Request
    * Endpoint: POST/api/v1/users
    * Body: (application/json)
    ```
        {       
            "firstname": "Edet",
            "lastname": "Ogundele",
            "gender": "M",
            "date_of_birth": "1995-01-27"
        }
    ```

* Response
    * Status: 201 - Created
    * Body: application/json

    ``` {
            "error": 0,
            "message": "User was successfully created",
            "data": {
                "id": 10,
                "firstname": "Edet",
                "lastname": "Ogundele",
                "gender": "M",
                "date_of_birth": "1995-01-27",
                "date_created": "2020-09-03T13:36:44.216Z",
                "date_updated": null
            }
        }
    ```

### Retrieve All Users

* Request:
    * Endpoint: GET/api/v1/users
    * Querystrings (Optional):

            ```
            sort_field - this can be any field in the JSON e.g. "firstname",
            sort_order_mode - this can be either "asc" or "desc"
            filter_field - this can be any field in the JSON e.g. "firstname",
            filter_value - the criteria upon which the response data will be filtered
            page : The current page. Default is 1
            page_size: The number of records per page. Default is 25
            ```

* Response:
    * Status: 200 - OK
    * Body: (application/json)

    ```
        {
            "error": 0,
            "message": "Users retrieved successfully",
            "data": [
                {
                    "id": 1,
                    "firstname": "Godwin",
                    "lastname": "Jega",
                    "gender": "M",
                    "date_of_birth": "2015-04-08",
                    "date_created": "2020-09-02T22:12:20.689Z",
                    "date_updated": "2020-09-02T22:21:22.186Z"
                },
                {
                    "id": 5,
                    "firstname": "Abuchi",
                    "lastname": "KC",
                    "gender": "M",
                    "date_of_birth": "2015-07-08",
                    "date_created": "2020-09-03T09:57:20.776Z",
                    "date_updated": null
                },
                {
                    "id": 6,
                    "firstname": "Abdul",
                    "lastname": "Simon",
                    "gender": "M",
                    "date_of_birth": "2000-07-12",
                    "date_created": "2020-09-03T09:58:12.045Z",
                    "date_updated": null
                },
                {
                    "id": 7,
                    "firstname": "Kingsley",
                    "lastname": "Oladele",
                    "gender": "M",
                    "date_of_birth": "2010-11-22",
                    "date_created": "2020-09-03T09:58:53.154Z",
                    "date_updated": null
                }
            ]
        }
    ```

### Retrieve A User

* Request:
    * Endpoint: GET/api/v1/users/6

* Response:
    * Status: 200 - OK
    * Body: (application/json)

    ```
        {
            "error": 0,
            "message": "User retrieved successfully",
            "data": {
                "id": 6,
                "firstname": "Abdul",
                "lastname": "Simon",
                "gender": "M",
                "date_of_birth": "2000-07-12",
                "date_created": "2020-09-03T09:58:12.045Z",
                "date_updated": null
            }
        }
    ```

### Update A User

* Request
    * Endpoint: PUT/api/v1/users/6
    * Body: (application/json)
    ```
        {       
            "firstname": "Mohammed",
            "date_of_birth": "1995-01-30"
        }
    ```

* Response
    * Status: 200 - OK
    * Body: application/json

    ``` {
            "error": 0,
            "message": "User was successfully updated",
            "data": {
                "id": 6,
                "firstname": "Mohammed",
                "lastname": "Simon",
                "gender": "M",
                "date_of_birth": "1995-01-30",
                "date_created": "2020-09-03T09:58:12.045Z",
                "date_updated": "2020-09-03T14:13:07.676Z"
            }
        }
    ```

### Delete A User
* Request:
    * Endpoint: DELETE/api/v1/users/5

* Response: 
    * Status: 204 - No Content
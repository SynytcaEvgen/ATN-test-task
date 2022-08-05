Test poject for ATN Corp.

Stack: REST API, NestJS, Postgresql, typeORM, jwt, typescript

For init project you need have a installet Node.js and Docker
For run app need:
 - First type docker-compose up (after starting container run app)
 - Second npm run start for runing up

Documentation start: 

"HOSTING" - some hostion ( for example: localhost:3000 )

Swagger http://HOSTING/api/docs

1. User Registarition:

POST http://HOSTING/auth/registaration

Example request (JSON)
{
  "name": "Name user", // optional parameter
  "email": "examplemail@mail.com",
  "password": "1234567890",
  "prodId": "0TDVS",
}

Example response (JSON)

{
    "token": "XXXXXXXXXXXXXXXXXXX" // jwt token
}

2. User authorization:

POST http://HOSTING/auth/login

Example request (JSON)
{
  "email": "examplemail@mail.com",
  "password": "1234567890",
}

Example response (JSON)

{
    "token": "XXXXXXXXXXXXXXXXXXX" // jwt token
}

3. Search all users by poduct ID:

GET http://HOSTING/device/users?prodId=<AAA01>
Headers 
Authorization: token


Example response (JSON)
[
    {
        "id": "2cb2568d-f6ed-40a8-a7ae-8b5b783ec102",
        "name": "Zack",
        "email": "some_ZK@gmail.com",
        "createdAt": "2022-08-03T18:20:21.414Z",
        "updatedAt": "2022-08-03T18:20:21.414Z"
    }
]

4. Search all device by user email:

GET http://HOSTING/device/devices?email='someEmail@email.com'
Headers 
Authorization: token

!!! email it is optional query with this query default be parse email of user by token
http://HOSTING/device/devices also valid request and response all devices of authorization user

Example response (JSON)
[
    {
        "id": "fc4c53bf-1e97-45a4-a555-25003801c966",
        "name": "Some device_26",
        "prodId": "AAA26",
        "createdAt": "2022-08-04T17:29:54.562Z",
        "updatedAt": "2022-08-04T17:29:54.562Z"
    },
    {
        "id": "718823f7-880f-4254-a622-379b639e5cfa",
        "name": "Some device_25",
        "prodId": "AAA25",
        "createdAt": "2022-08-03T18:27:35.527Z",
        "updatedAt": "2022-08-03T18:27:35.527Z"
    },
    {
        "id": "2850ee5d-d3e3-484b-a2d9-8d861998923a",
        "name": "Some device_22",
        "prodId": "AAA22",
        "createdAt": "2022-08-03T18:13:03.776Z",
        "updatedAt": "2022-08-03T18:13:03.776Z"
    }
]

5. Get all user in a system

GET http://HOSTING/rest/users
Headers
Authorization: token

Example response (JSON)
[
    {
        "id": "4392c1e5-3432-433d-8be8-9633e449c602",
        "name": "Petr",
        "email": "some_P@gmail.com",
        "createdAt": "2022-08-02T03:58:41.944Z",
        "updatedAt": "2022-08-02T03:58:41.944Z"
    },
    {
        "id": "401a880f-5182-47cb-8d24-8f118ad43677",
        "name": "Valera",
        "email": "some_V@gmail.com",
        "createdAt": "2022-08-02T04:17:56.820Z",
        "updatedAt": "2022-08-02T04:17:56.820Z"
    },
    ...
]


Documentation end

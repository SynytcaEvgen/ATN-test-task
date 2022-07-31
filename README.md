Test poject for ATN Corp.

Stack: REST API, NestJS, Postgresql, typeORM, jwt, typescript


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

POST http://HOSTING/search/byProdId
Headers 
Authorization: token

Example request (JSON)
{
  "prodId": "0TDVS",
}

Example response (JSON)
{
    "prodId": "0TDVS",
    "id": 13,
    "prodName": "same Product Name",
    "owners": [
        {
            id: 3434,
            "name": "User Name",
            "email": "usersmail@email.com",
            "created_at": "2022-07-31T10:09:58.792Z",
            "updated_at": "2022-07-31T10:09:58.792Z",
        },
        {
            id: 43434,
            "name": "User Name",
            "email": "usersmail@email.com",
            "created_at": "2022-07-31T10:09:58.792Z",
            "updated_at": "2022-07-31T10:09:58.792Z",
        }
    ]
    "created_at": "2022-07-31T10:09:58.792Z",
    "updated_at": "2022-07-31T10:09:58.792Z",
}

4. Search all device by user email:

PUT http://HOSTING/search/byEmail
Headers 
Authorization: token

Example request (JSON)
{
  "email": "usersmail@email.com",
}

Example response (JSON)
{
    "id": 34,
    "name": "User Name",
    "email": "usersmail@email.com",
    "devices": [
        {
            "id": 233,
            "name": "Device Name"
            "prodId": "0TDVS",
            "type": "type Device"
            "details": "details string",
            "created_at": "2022-07-31T09:20:19.315Z",
            "updated_at": "2022-07-31T09:22:22.000Z"
        },
        {
            "id": 234,
            "name": "Device Name"
            "prodId": "0TDVF",
            "type": "type Device"
            "details": "details string",
            "created_at": "2022-07-31T09:20:19.315Z",
            "updated_at": "2022-07-31T09:22:22.000Z"
        }
    ]
    "created_at": "2022-07-31T09:20:19.315Z",
    "updated_at": "2022-07-31T09:22:22.000Z"
}

## App structure

- /routes api endpoints
- /var data storage
- /views user interface
- /db.js database setup


## Endpoints

### Authentification


#### `GET /signup` open page

#### `GET /login` open page

#### `GET /logusers` show all users in server console

currently also returns all services as json response to make debugging easier

example url/curl:
```curl localhost:3000/logusers```


#### `POST /signup` create new user

Creates a new user, then logs in as that user.
Request body accepts:
- username
- password
- email

```curl -X 'POST' -H "Content-Type: application/json" -d '{"username":"Hannah Arendt", "password":"banalityofevil"}' localhost:3000/signup```


#### `POST /login/password` try loggin in

Request body accepts:
- username
- password

example curl:

```
curl -X 'POST' -H "Content-Type: application/json" -d '{"username":"Hannah Arendt", "password":"banalityofevil"}' localhost:3000/login/password

```

#### `POST /logout` log out


### Services

Services are events or similar things that users can "host".

#### `POST /service` create a new service

example curl:

```curl -X 'POST' -H "Content-Type: application/json" -d '{"name":"Die Freiheit Frei zu sein aaa", "userid":1}' localhost:3000/service```

(userid in body only for debugging purposes. In browser handled via passport session.)


#### `GET /logservices` show all services in server console

currently also returns all services as json response to make debugging easier

example url/curl:
```curl localhost:3000/logservices```








## Install & Start Server

```
npm install
npm start
```

## Backend

### User management and authentification

- seems a standard way for user and session management is using passportjs
- I set up the authentication (as well as overall app structure) following this tutorial: https://www.passportjs.org/tutorials/password/

## LINT
Reformat complete codebase with
`npx prettier --write .`
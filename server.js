const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;
require('dotenv').config();

const app = express();

//Get secret
const secret = process.env.SECRET;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// in memory db of users
const usersDb = {
  '1': {
    id: 1,
    username: 'bob_squarepants',
    email: 'bob@squarepants.com',
    password: 'test',
  },
  '2': {
    id: 2,
    username: 'super_mario',
    email: 'mario@supermario.com',
    password: 'test',
  },
  '3': {
    id: 3,
    username: 'princess_peach',
    email: 'peach@princesspeach.com',
    password: 'test',
  },
};

// get the user for usersDb

// middleware to verify the token

//extract the token from the request header

// Authenticate the user
// retrieve the user with that email and compare the password if we have a user

// if the user is retrieve, compare the passwords

// create post login route to authenticate the user and issue a jwt
//extract the email and password from the request

// Authenticate the user in the db

// if the user is authenticated, issue jwt
// Issue the JWT

// create the payload with user id

// set options to expiresIn 1h

// sign the payload and get token using a callback
// sending back the token if no error

// if user is not authenticated, sendStatus(403)

app.listen(port, () => console.log(`Express running on port ${port}`));

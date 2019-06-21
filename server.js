const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;
const cors = require('cors');
require('dotenv').config();

const app = express();

//Get secret
const secret = process.env.SECRET;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(cors());

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
const getCurrentUser = userId => usersDb[userId];

// middleware to verify the token

const authToken = (req, res, next) => {
  //extract the token from the request header
  const { authorization } = req.headers;

  const [, token] = authorization.split(' ');

  // verify the signature of the token
  jwt.verify(token, secret, (err, payload) => {
    if (err) {
      res.json({ err });
    }

    // Retrieve the user from the database and assign it to a new user key in req
    req.user = getCurrentUser(payload.userId);

    // calling the next middleware
    next();
  });

  next();
};

// Authenticate the user
const authenticateUser = (email, password) => {
  // retrieve the user with that email and compare the password if we have a user

  for (const userId in usersDb) {
    if (usersDb[userId].email === email && usersDb[userId].password) {
      return usersDb[userId];
    }
  }

  return false;
};

// const authenticateUser = (email, password) => {
//   user = Object.values(usersDb).find(userObj => userObj.email === email);

//   if (user && user.password === password) {
//     return user;
//   } else {
//     return false;
//   }

// };

// if the user is retrieve, compare the passwords

// create post login route to authenticate the user and issue a jwt

app.post('/api/login', (req, res) => {
  //extract the email and password from the request

  console.log(req.body);

  const { email, password } = req.body;
  // Authenticate the user in the db

  const user = authenticateUser(email, password);

  // if the user is authenticated, issue jwt
  // Issue the JWT
  // create the payload with user id

  // if the user is retrieved
  if (user) {
    const payload = {
      userId: user.id,
    };

    // set options to expiresIn 1h
    const options = {
      expiresIn: '1h',
    };

    // sign the payload and get token using a callback
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        res.json({ err });
      }

      // sending back the token if no error
      res.json({ token: token });
    });
    // if user is not authenticated, sendStatus(403)
  } else {
    res.sendStatus(403);
  }
});

app.get('/api/hello', authToken, (req, res) => {
  if (req.user) {
    res.send(`Hello ${req.user.username}`);
  } else {
    res.sendStatus(403);
  }
});

app.listen(port, () => console.log(`Express running on port ${port}`));

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();


app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.post('/api/posts', VerifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'New Posts created ...',
        authData
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: 'Akhil',
    email: 'akhil@gmail.com'
  }
  jwt.sign({
    user: user
  }, 'secretkey', (err, token) => {
    res.json({
      token: token
    });
  });
});

function VerifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }

}


app.listen(5000, () => console.log("Server Started on port 5000..."));
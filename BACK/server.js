require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const fileUpload = require('express-fileupload');

// INITIALIZE EXPRESS
const app = express();

const corsMiddleware = require('./app/middlewares/corsMiddleware');
app.use(corsMiddleware);

app.use('/static', express.static(__dirname + '/uploads'));
app.use('/app', express.static(__dirname + '/static'));


app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: (1000 * 60 * 60 * 24 * 30 * 12)
  }
}));

const PORT = process.env.PORT || 3000;
app.locals.BASEDIR = __dirname;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: 'tmp/',
  // debug: true
}));

// IMPORT ROUTER 
const router = require('./app/routes/router');

// USE ROUTER IMPORT
app.use(router);

app.use((req, res) => {
  return res.send({
    "404": "Not Found"
  });
})

// SERVEUR STARTED
app.listen(3000, () => {
  console.log(`Serveur started on http://localhost:${PORT}`);
});
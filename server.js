// ====DEPENDENCIES====
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const expressSession = require('express-session');

const indexController = require('./controllers/index');
const usersController = require('./controllers/users');

const app = express();

require('dotenv').config();

app.set('view engine', 'ejs');

const { PORT, DATABASE_URL, SECRET } = process.env;

// ====DATABASE CONNECTION====
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

// ====DATABASE CONNECTION/SUCCESS/ERROR====
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// ====MIDDLEWARE====
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}));
app.use(expressSession({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(function(req, res, next) {
    console.log('Session Store: ', req.session);
    next();
});

app.use('/', indexController);
app.use('/', usersController);

// ====LISTENERS====
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));
const express = require('express');
const usersrouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// ====LOG IN ROUTES

usersrouter.get('/login', (req, res) => {
    res.render('login.ejs', {error: ''});
});

usersrouter.post('/login', (req, res) => {
   User.findOne({email: req.body.email}, (err, user) => {
       if(!user) return res.render('login', {error: 'invalid credentials'});
       
       const isMatched = bcrypt.compareSync(req.body.password, user.password);
       if(!isMatched) return res.render('login', {error: 'invalid credentials'});

        req.session.user = user._id; 
        res.redirect('/'); 
   });
});

// ====SIGN UP ROUTES====

usersrouter.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

usersrouter.post('/signup', (req, res) => {
    
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
    
    User.create(req.body, (err, user) => {
       
        res.redirect('/login');
    });
});


usersrouter.get('/logout', (req, res) => {
    req.session.destroy(function() {
        res.redirect('/');
    });
});

module.exports = usersrouter;
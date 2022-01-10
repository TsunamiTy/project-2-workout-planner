// ====DEPENDENCIES====
const express = require('express');
const indexrouter = express.Router();

// ====ROUTES====
indexrouter.get('/', (req, res) => {
    res.render('home');
});



// ====EXPORTS====
module.exports = indexrouter;
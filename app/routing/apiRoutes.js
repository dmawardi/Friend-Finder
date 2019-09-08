var express = require('express');
var router = express.Router();
var path = require('path');
var data = require(path.join(__dirname, "../data/friends.js"));


// GET handlers
router.get('/friends', function (req, res) {
    res.json(data);
});

router.post('/friendSubmit', function (res) {
    // Grab new input
    console.log(res);

    // Send back match
    // res.json();
});

module.exports = router;
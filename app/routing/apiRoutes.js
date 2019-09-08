var express = require('express');
var router = express.Router();
var path = require('path');
var data = require(path.join(__dirname, "../data/friends.js"));
var process = require(path.join(__dirname, "../public/assets/js/submissionProcessing.js"));

// Sets up the Express app to handle data parsing
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// GET handlers
router.get('/friends', function (req, res) {
    res.json(data);
});

router.post('/friendSubmit', function (req, res) {
    // Grab new input
    console.log(req.body);
    data.push(req.body);


    // Send back match
    // res.json();
    res.json(req.body);
});

module.exports = router;
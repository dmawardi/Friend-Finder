var express = require('express');
var router = express.Router();
var path = require('path');
var data = require(path.join(__dirname, "../data/friends.js"));
var submissionProcessing = require(path.join(__dirname, "../public/assets/js/submissionProcessing.js"));

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

    // Uses data with newly pushed data to return index of friend match
    let indexOfMatch = submissionProcessing(data);

    // Send back match
    res.json(data[indexOfMatch]);
});

module.exports = router;
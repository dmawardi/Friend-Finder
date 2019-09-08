var path = require('path');
var data = require(path.join(__dirname, "../../../data/friends.js"));


// Accepts data from friend finder submission after new user added
// Compare new user (last element) to rest of elements and determine closest match
function calculateDifferenceReturnClosestMatch(data) {
    differences = [];
    // Iterate through data array (minus the final element)
    for (let i = 0; i < data.length-1; i++) {
        console.log(data[i].scores);
        // Compare final element to current count element and record difference
        let difference = calcDifferenceBetwTwoScoreSets(data[data.length-1], data[i]);

    }

}

// Calculates difference between two choice arrays' number values
function calcDifferenceBetwTwoScoreSets(element1, element2) {
    var differenceArray = [];
    for (let i = 0; i < element1.length; i++) {
        if (element1[i] >= element2[i]) {
            let difference = element1[i] - element2[i];
        } else {
            let difference = element2[i] - element1[i];
        }
        differenceArray.push(difference);
    }

    let sum = 0;
    // Iterate through array using sum function, use 0 as default value
    for (let i = 0; i < differenceArray.length; i++) {
        sum = sum + differenceArray[i];
        console.log('difference array item\n',differenceArray[i]);
    }

    console.log('difference sum');
    console.log(sum);

    // return difference sum
    return differenceArray
}

function findHighest(array) {
    for (let item of array) {
        console.log(item);
    }
}

calculateDifferenceReturnClosestMatch(data);
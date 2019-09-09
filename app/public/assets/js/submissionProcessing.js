var path = require('path');

// Accepts data from friend finder submission after new user added
// Compare new user (last element) to rest of elements and determine closest match
function calculateDifferenceReturnClosestMatch(data) {
    // Init variables
    var differences = [];
    console.log(data[data.length-1]);
    // Iterate through data array (minus the final element)
    for (let i = 0; i < data.length-1; i++) {
        // Compare final element to current count element scores and record difference
        // console.log(data[data.length-1].scores, data[i].scores);
        let difference = calcDifferenceBetwTwoScoreSets(data[data.length-1].scores, data[i].scores);
        // Push difference between two items to array differences
        differences.push(difference);
    }

    // Use spread operator to 'spread' array and use function to find minimum
    let match = Math.min(...differences);
    // Grab index of lowest element
    let indexOfMatch = differences.indexOf(match);
    // Return index of closest match (element with the lowest difference)
    return indexOfMatch;
}

// Calculates difference between two choice arrays' number values
function calcDifferenceBetwTwoScoreSets(element1, element2) {
    // Init variables
    var differenceArray = [];
    let difference;
    // For each element in both arrays
    for (let i = 0; i < element1.length; i++) {
        // If/else statement to reduce larger number by smaller number
        if (element1[i] >= element2[i]) {
            difference = element1[i] - element2[i];
        } else {
            difference = element2[i] - element1[i];
        }
        // Push resulting difference to differenceArray
        differenceArray.push(difference);
    }

    // Init sum as 0
    let sum = 0;
    // Iterate through array summing items
    for (let i = 0; i < differenceArray.length; i++) {
        sum = sum + differenceArray[i];
    }

    // return difference sum
    return sum
}

module.exports = calculateDifferenceReturnClosestMatch;
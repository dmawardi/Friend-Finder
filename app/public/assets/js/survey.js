console.log('connected');

function extractAndResetResults() {
    let array = [];
    let selectorIDs = $('select[id*=surveySelect]').find('option:selected');
    // console.log(selectorIDs);

    for (let item of selectorIDs) {
        array.push(item.value);
    }
    return array;
}

// Shows modal and message depending on parameter status of form submit (default = fail)
function modalMessage(submitStatus='fail') {
    let modalMsgArea = $('#modalMsgArea');
    let modalMsg = $('<p>');
    let modalTitle = $('#modalTitle');

    // Empty modal message area
    modalMsgArea.empty();

    if (submitStatus == 'fail') {
        modalTitle.text('Submission Failed');
        modalMsg.text('Please answer all questions before submitting!');
    
        modalMsgArea.append(modalMsg);
        $('#friendReturn').modal('show');

    } else if (submitStatus == 'pass') {
        modalTitle.text('Best Match');
        // Add code to calculate and show image
        modalMsg.text('{Name of Match}');
    
        modalMsgArea.append(modalMsg);
        $('#friendReturn').modal('show');
    }


}

$(document).ready(function () {
    $('select[id*=surveySelect]').on('click', function () {
        // console.log($(this).find('option:selected').val());
        console.log('clicking on dropdown');
    });

    $('#submitButton').on('click', function (event) {
        event.preventDefault();
        // console.log($(this).attr);
        let results = extractAndResetResults();
        console.log(results);

        // If any of the results are default (ie. not selected)
        if (results.includes("Select")) {
            // Use default fail message as modal message
            modalMessage();
        } else {
            // call modal message with pass
            modalMessage('pass');
            $.post('/api/friendSubmit', results);
        }

        console.log(extractAndResetResults());


    });

});
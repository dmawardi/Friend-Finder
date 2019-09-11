// Extract results from form fields
function extractAndResetResults() {
    // init array
    let scores = [];
    // Grab form data
    let name = $('#surveyName').val();
    let photo = $('#surveyPhoto').val();
    let selectorIDs = $('select[id*=surveySelect]').find('option:selected');

    // For form selector, push to array scores
    for (let item of selectorIDs) {
        scores.push(item.value);
    }

    // build return JSON
    surveyAnswers = {
        "name": name,
        "photo": photo,
        "scores": scores
    }

    // Return
    return surveyAnswers;
}

// Shows modal and message depending on parameter status of form submit (default = fail)
function modalMessage(submitStatus='fail', data=null) {
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

        // Else if a pass status is detected
    } else if (submitStatus == 'pass') {
        // Update modal title
        modalTitle.text('Best Match');

        // Init jquery elements
        let div = $('<div>');
        let img = $('<img>');
        let p = $('<p>');

        // Create text and image content
        p.html(data.name);
        img.attr('src', data.photo);
        // Add bootstrap classes
        div.addClass('container');
        img.addClass('img-thumbnail');

        // Append text and image to div
        div.append(p);
        div.append(img);
        // Appendf div to modal body
        modalMsgArea.append(div);
    
        // Show modal
        $('#friendReturn').modal('show');
    }

}

// When document is ready
$(document).ready(function () {
    
    // Submission button handler
    $('#submitButton').on('click', function (event) {
        // Prevent default form submission behaviour
        event.preventDefault();
        var results = extractAndResetResults();

        // If any of the results are default (ie. not selected)
        if (results.scores.includes("Select") && results.name.includes("") && results.photo.includes("")) {
            // Use default fail message as modal message
            modalMessage();
        } else {
            // call modal message with pass
            $.post('/api/friendSubmit', results, function(data){
                // Sends data to Modal message to display match 
                modalMessage('pass', data);
                
            });
        }

    });

});
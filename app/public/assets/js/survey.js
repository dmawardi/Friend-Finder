console.log('connected');

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

    } else if (submitStatus == 'pass') {
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

$(document).ready(function () {
    $('select[id*=surveySelect]').on('click', function () {
        // console.log($(this).find('option:selected').val());
    });

    $('#submitButton').on('click', function (event) {
        event.preventDefault();
        // console.log($(this).attr);
        var results = extractAndResetResults();
        console.log('results',results);

        // If any of the results are default (ie. not selected)
        if (results.scores.includes("Select") && results.name.includes("") && results.photo.includes("")) {
            // Use default fail message as modal message
            modalMessage();
        } else {
            // call modal message with pass
            $.post('/api/friendSubmit', results, function(data){
                // TODO use link to make photo appear
                console.log("name: "+data.name);
                console.log("photo: "+data.photo);
                
                modalMessage('pass', data);
                

            });
        }

    });

});
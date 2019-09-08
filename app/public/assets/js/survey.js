console.log('connected');

$('#submitButton').on('click', function(event){
    event.preventDefault();

    $('#friendReturn').modal('show');
    console.log('clicking');
});

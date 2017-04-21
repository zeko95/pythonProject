$(document).on("click", "#pera", function () {
    var id = $(this).data('id');
    console.log(id);
    $('#update-modal').empty();
    $.ajax({
        method:'POST',
        url: '/get_user/'+id,
        success: function (response) {
            $('#update-modal').append(response);
        }
    });
});
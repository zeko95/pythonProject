$(document).on("click", "#pera", function () {
    var id = $("#pera").data('id');
    console.log(id);
    $.ajax({
        method:'POST',
        url: '/get_user/'+id,
        success: function (response) {
            console.log(response);

            $('#nesto').append(response);
        }
    })
});
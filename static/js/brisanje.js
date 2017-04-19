$("#delete_row").on("click", function () {
    var ids = new Array();
    $.each($("input[name='chbDelete[]']:checked"), function() {
        ids.push($(this).val());
    });
    // var data = {'ids' : ids};
    var data = JSON.stringify(ids, null);
    $.ajax({
        method:'POST',
        data: {data: data},
        url: '/delete_row',
        success: function (response) {
            // $("#tabela_korisnika tbody").append(response);
            console.log(response);
        }
    })
});
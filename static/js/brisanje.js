$("#delete_row").on("click", function () {
    var ids = new Array();
    $.each($("input[name='chbDelete[]']:checked"), function() {
        ids.push($(this).val());
    });
    var data = {'ids' : ids};
    $.ajax({
        method:'POST',
        data: JSON.stringify(ids, null),
        url: '/delete_row',
        success: function (response) {
            // $("#tabela_korisnika tbody").append(response);
            console.log(response);
        }
    })
});
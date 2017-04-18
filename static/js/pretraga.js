$("#search_table").on("keyup",function (e) {
    console.log(this.value);

    var search_term = this.value;

    if(search_term == ""){
        search_term = "all";
    }
$("#tabela_korisnika tbody").empty();


    $.ajax({
        method: 'GET',
        url: '/search_table/'+search_term,
        success: function (response) {
            $("#tabela_korisnika tbody").append(response);
        }
    });
});

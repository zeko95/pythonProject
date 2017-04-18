$('#signupForm').on('submit', function (e) {
    console.log('provera');
    var f_name = $('#inputFirstName');
    var l_name = $('#inputLastName');
    var u_name = $('#inputUserName');
    var pass = $('#inputPassword');
    var rep_pass = $('#inputRepeatPassword');

    var div_greske = $('#greske');

    var r_f_name = /^[A-z]{0,}$/;
    var r_l_name =  /^[A-z]{0,}$/;
    var r_u_name = /^[a-z]+[\d]*$/;
    var r_pass = /^[A-Za-z\d]{5,}$/;

    var greske = new Array();

    if(!r_f_name.test(f_name.val())){
       f_name.addClass("borderRed");
       greske.push("Name is not in good format!");
    }
    if(!r_l_name.test(l_name.val())){
       l_name.addClass("borderRed");
       greske.push("Last name is not in good format!");
    }
    if(!r_u_name.test(u_name.val())){
       u_name.addClass("borderRed");
       greske.push("Last name is not in good format!");
    }
    if(!r_pass.test(pass.val())){
       pass.addClass("borderRed");
       greske.push("Password is not in good format!");
    }
    if (rep_pass.val() !== pass.val()) {
        greske.push("Password's do not match");
    }
    if(greske.length > 0){
        console.log('ima gresaka');
        var lista_gresaka = "<ul>";
        for(var i=0; i < greske.length; i++){
            lista_gresaka += "<li>"+greske[i]+"</li>";
        }
        lista_gresaka += "</ul>";
        div_greske.append(lista_gresaka);
        e.preventDefault();
        return false;
    }
    else {
        return true;
    }
});

// function signup_provera(form) {
//     console.log('provera');
//     var f_name = document.getElementById('inputFirstName');
//     var l_name = document.getElementById('inputLastName');
//     var u_name = document.getElementById('inputUserName');
//     var pass = document.getElementById('inputPassword');
//     var rep_pass = document.getElementById('inputRepeatPassword');
//
//     var div_greske = document.getElementById('greske');
//
//     var r_f_name = /^[A-Z][a-z]{2-14}$/;
//     var r_l_name = /^[A-Z][a-z]{2-14}$/;
//     var r_u_name = /^[a-z]+[\d]*$/;
//     var r_pass = /^[A-Za-z\d]{5,}$/;
//
//     var greske = new Array();
//
//     if(!f_name.value.match(r_f_name)){
//        f_name.style.border="1px solid #red";
//        greske.push("Name is not in good format!");
//     }
//     if(!l_name.value.match(r_l_name)){
//        l_name.style.border="1px solid #red";
//        greske.push("Last name is not in good format!");
//     }
//     if(!u_name.value.match(r_u_name)){
//        u_name.style.border="1px solid #red";
//        greske.push("Last name is not in good format!");
//     }
//     if(!pass.value.match(r_pass)){
//        pass.style.border="1px solid #red";
//        greske.push("Password is not in good format!");
//     }
//     if (rep_pass.value !== pass.value) {
//         greske.push("Password's do not match");
//     }
//     if(greske.length > 0){
//         console.log('ima gresaka');
//         var lista_gresaka = "<ul>";
//         for(var i=0; i < greske.length; i++){
//             lista_gresaka += "<li>"+greske[i]+"</li>";
//         }
//         lista_gresaka += "</ul>";
//         div_greske.append(lista_gresaka);
//         form.preventDefault();
//         return false;
//     }
//     else {
//         return true;
//     }
// }
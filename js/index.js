$(document).ready(function () {
    retornaFatosChuckNorris();

    $(".novo_fato").on("click", function () {  
        retornaFatosChuckNorris();
    })

    function retornaFatosChuckNorris() {
        var chuck_fato = $(".chuck-fato");
        $.ajax({
            type: "GET",
            url: "https://api.chucknorris.io/jokes/random",
            dataType: "json",
            success: function (res) {
                console.table(res);
                chuck_fato.html(res.value);
                chuck_fato.attr("cite", res.url)
            }
        });
    }
});
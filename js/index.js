$(document).ready(function () {
    retornaFatosChuckNorris();

    $(".novo_fato").on("click", function () {
        var chuck_fato = $(".chuck-fato");
        var btn = $(this);

        chuck_fato.text("");
        btn.html(`<img src="./assets/chuck-icon.gif" alt="Gif Chuck Dancing">`);
        setTimeout (function () {
            retornaFatosChuckNorris();
        }, 1500)
    })

    function retornaFatosChuckNorris() {
        var chuck_fato = $(".chuck-fato");
        var btn = $(".novo_fato");

        $.ajax({
            type: "GET",
            url: "https://api.chucknorris.io/jokes/random",
            dataType: "json",
            success: function (res) {
                chuck_fato.html(res.value);
                chuck_fato.attr("cite", res.url)
                btn.html("Pr&oacute;ximo fato");
                console.log("oi")
            }
        });
    }
});
$(document).ready(function () {
    retornaFatosChuckNorris();

    $(".novo_fato").on("click", function () {
        var chuck_fato = $(".chuck-fato");
        var btn = $(this);

        chuck_fato.text("");
        btn.html(`<img src="./assets/chuck-icon.gif" alt="Gif Chuck Dancing">`);
        setTimeout(function () {
            retornaFatosChuckNorris();
        }, 1500)
    })

    function retornaFatosChuckNorris() {
        var url_param = new URLSearchParams(window.location.search);
        var id_fato = url_param.get("fato");
        var chuck_fato = $(".chuck-fato");
        var btn = $(".novo_fato");

        if (id_fato == null) {
            const todas_categorias = ["animal", "career", "celebrity", "dev", "fashion", "food", "history", "money", "movie", "music", "science", "sport", "travel"];
    
            var indice_catedgoria = Math.floor(Math.random() * todas_categorias.length);;
            var categoria = todas_categorias[indice_catedgoria];
            var url_fato = `random?category=${categoria}`;
    
        } else {
            var url_fato = id_fato;
        }

        $.ajax({
            type: "GET",
            url: `https://api.chucknorris.io/jokes/${url_fato}`,
            dataType: "json",
            success: function (res) {
                var id = res.value;

                chuck_fato.html(res.value);
                chuck_fato.attr("cite", res.url)
                btn.html("Pr&oacute;ximo");
            }
        });
    }
});
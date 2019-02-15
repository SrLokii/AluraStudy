var tamanhoFrase = $(".frase").text();
var qntsPalavras = tamanhoFrase.split(" ").length;
var exibirNumPalavra = $("#tamanhoPalavra");
var campo = $("#textArea");
var tempoRestante = $("#tempoDigitacao").text();
var tempoInicial = tempoRestante;
exibirNumPalavra.text(qntsPalavras);

$(function () {
    inicializaContadores();
    inicializaCronometro();
    verificaDigitacao();
    resetJogo();
    $(".tabela").find(".botaoDelete").click(removeLinha);
});

function inicializaContadores() {
    campo.on("input", function () {
        var conteudo = campo.val();

        var contadorPalavras = conteudo.split(" ").length;
        $("#contadorPalavras").text(contadorPalavras);

        var contadorCaracteres = conteudo.length;
        $("#contadorCaracteres").text(contadorCaracteres);
    });
}
function finalizaJogo() {
    campo.attr("disabled", true);
    campo.addClass("campoDesativado");
    adicionaTabela();
}

function inicializaCronometro() {
    campo.one("focus", function () {
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempoDigitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                finalizaJogo();
                clearInterval(cronometroID);

            }
        },1000);

    });
}

function criaLinha(x,y) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(x);
    var colunaPontuacao = $("<td>").text(y);
    var colunaRemover = $("<td>")
    var iconeRemover = $("<i>").addClass("small").addClass("material-icons").text("delete");
    var anchorRemover = $("<a>").attr("href","#").addClass("botaoDelete");

    colunaRemover.append(anchorRemover.append(iconeRemover));

    linha.append(colunaUsuario);
    linha.append(colunaPontuacao);
    linha.append(colunaRemover);

    return linha;
    
}

function adicionaTabela() {
    var selecaoCorpoTabela = $(".tabela").find("tbody");
    var usuario = "Willians";
    var pontuacao = $("#contadorPalavras").text();
    var linha = criaLinha(usuario,pontuacao);
    linha.find(".botaoDelete").click(removeLinha);
    selecaoCorpoTabela.prepend(linha);
}

function removeLinha(event){
    event.preventDefault();
    $(this).parent().parent().remove();

}

function resetJogo() {
    $("#botaoReset").on("click", function () {
        campo.attr("disabled", false);
        campo.val("");
        $("#contadorPalavras").text("0");
        $("#contadorCaracteres").text("0");
        tempoRestante = tempoInicial;
        $("#tempoDigitacao").text(tempoInicial);
        campo.removeClass("campoDesativado");
        campo.removeClass("bordaVerde");
        campo.removeClass("bordaVermelha");
        inicializaCronometro();


    });
}
function verificaDigitacao() {
    campo.on("input", function () {
        var textoDigitado = campo.val();
        var comparavel = tamanhoFrase.substr(0, textoDigitado.length);
        if (textoDigitado == comparavel) {
            campo.addClass("bordaVerde");
            campo.removeClass("bordaVermelha");

        }
        else {
            campo.addClass("bordaVermelha");
            campo.removeClass("bordaVerde");

        }
    })



}





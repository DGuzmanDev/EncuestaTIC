const lenguajes = [
    "C",
    "C#",
    "C++",
    "CSS",
    "Go",
    "Java",
    "Javascript",
    "Kotlin",
    "Objective-C",
    "PHP",
    "Perl",
    "PowerShell",
    "Python",
    "R",
    "Ruby",
    "Rust",
    "Scala",
    "Shell",
    "Swift",
    "TypeScript"
];

function calcular_peso_total(resultados) {
    var peso_total = 0.0;

    for (let index = 0; index < resultados.length; index++) {
        peso_total += resultados[index].peso;
    }

    return peso_total;
}

function cargar_tabla(resultados) {
    var peso_total = calcular_peso_total(resultados);

    for (let index = 0; index < resultados.length; index++) {
        var resultado = resultados[index];
        var indice_porcentual = 0.0;
        var diferencia_porcentual_relativa = 0.0;

        if (peso_total > 0) {
            var indice_porcentual = (resultado.peso / peso_total) * 100;

            if (index !== (resultados.length - 1)) {
                var siguiente_resultado = resultados[index + 1];
                diferencia_porcentual_relativa = indice_porcentual - ((siguiente_resultado.peso / peso_total) * 100);

                if(siguiente_resultado === undefined){
                    console.log(index);
                }
            }
        }

        var tr =
            '<tr>' +
            "<td>" + (index + 1) + "</td>" +
            "<td>" + resultado.lenguaje + "</td>" +
            "<td>" + indice_porcentual + "%</td>" +
            "<td> +" + diferencia_porcentual_relativa + "% </td>" +
            "</tr>";

        $("#result-body").append(tr);
    }
}

function obtener_resultados() {
    return $.ajax({
        type: "GET",
        url:
            "/resultados",
        success: function (data, status) {
            cargar_tabla(data);
        },
        error: function (data, status) {
            window.location.replace("/Home/Error");
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8",
    });
}

$(document).ready(function () {
    console.log(
        "site.js JavaScript - Daniel Guzman Chaves - 03101 – Programación avanzada en web - UNED IIIQ 2023"
    );

    obtener_resultados();
});

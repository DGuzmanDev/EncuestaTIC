function animate_feedback(element_id, timeout, show_duration, hide_duration) {
    $("#" + element_id).show(show_duration);
    setTimeout(function () {
        $("#" + element_id).hide(hide_duration);
    }, timeout);
}

function cargar_lista_paises() {
    for (let index = 0; index < paises.length; index++) {
        var pais = paises[index];

        $('#Pais').append($('<option>', {
            value: pais,
            text: pais
        }));
    }
}

function cargar_lista_roles() {
    for (let index = 0; index < roles.length; index++) {
        var rol = roles[index];

        $('#Rol').append($('<option>', {
            value: rol,
            text: rol
        }));
    }
}

function cargar_listas_lenguajes() {
    for (let index = 0; index < lenguajes.length; index++) {
        var lenguaje = lenguajes[index];

        $('#LenguajePrincipal').append($('<option>', {
            value: lenguaje,
            text: lenguaje
        }));

        $('#LenguajeSecundario').append($('<option>', {
            value: lenguaje,
            text: lenguaje
        }));
    }
}

function registrar_evento_formulario() {
    $("#enviar").on('click', function (event) {
        event.preventDefault();

        var validForms = true;
        var form = $(".needs-validation")[0];
        $(form).addClass("was-validated");

        if (form.checkValidity() === false) {
            validForms = false;
        }

        if (!validForms) {
            animate_feedback("error_formulario", 3000, 500, 500);
        } else {
            enviar_encuesta();
            $(form).removeClass("was-validated");
            form.reset();
        }
    });
}

function enviar_encuesta() {
    var encuesta = {
        nombre: $("#Nombre").val(),
        apellidos: $("#Apellidos").val(),
        pais: $("#Pais").val(),
        rol: $("#Rol").val(),
        lenguajePrimario: $("#LenguajePrincipal").val(),
        lenguajeSecundario: $("#LenguajeSecundario").val()
    };

    return $.ajax({
        type: "POST",
        url: "/encuesta",
        data: JSON.stringify(encuesta),
        success: function (data, status) {
            animate_feedback("exito_formulario", 5000, 500, 500);
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
        "encuesta.js JavaScript - Daniel Guzman Chaves - 03101 – Programación avanzada en web - UNED IIIQ 2023"
    );

    cargar_lista_paises();
    cargar_lista_roles();
    cargar_listas_lenguajes();
    registrar_evento_formulario();
});
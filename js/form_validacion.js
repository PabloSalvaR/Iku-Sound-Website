var formulario = document.getElementById('form')

var validarNombre = function(e){
    if (formulario.nombre.value == 0) {
        alert("Completa el campo nombre");
        e.preventDefault()
    }
}

var validarEmail = function(e){
    if(formulario.email.value == 0) {
        alert("Completa el campo Email");
        e.preventDefault();
    }
}

var validarMensaje = function(e){
    if(formulario.mensaje.value == 0) {
        alert("Completa el texto del mensaje");
        e.preventDefault();
    }
}


var validar = function(e){
    validarNombre(e);
    validarEmail(e);
    validarMensaje(e);
};

form.addEventListener("submit", validar);



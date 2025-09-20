const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,8}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{8,16}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{1,8}$/ // 1 a 8 numeros.
};

const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, "usuario");
        break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre");
        break;
        case "password":
            validarCampo(expresiones.password, e.target, "password");
            validarPassword2();
        break;
        case "password2":
            validarPassword2();
        break;
        case "correo":
            validarCampo(expresiones.correo, e.target, "correo");
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, "telefono");
        break;
    }
};

const validarCampo = (expresion, input, campo) =>{
    const grupo = document.getElementById(`grupo_${campo}`);
    const icono = document.querySelector(`#grupo_${campo} i`);

    if(expresion.test(input.value)){
        grupo.classList.remove("formulario_grupo_incorrecto");
        grupo.classList.add("formulario_grupo_correcto");
        icono.classList.remove("bi-x-circle-fill");
        icono.classList.add("bi", "bi-check-circle-fill");
        document.querySelector(`#grupo_${campo} .formulario_input_error`).classList.remove("formulario_input_error_activo");
        campos[campo] = true;
    } else {
        grupo.classList.add("formulario_grupo_incorrecto");
        grupo.classList.remove("formulario_grupo_correcto");
        icono.classList.remove("bi-check-circle-fill");
        icono.classList.add("bi", "bi-x-circle-fill");
        document.querySelector(`#grupo_${campo} .formulario_input_error`).classList.add("formulario_input_error_activo");
        campos[campo] = false;
    }
};

const validarPassword2 = () =>{
    const inputPassword1 = document.getElementById("password");
    const inputPassword2 = document.getElementById("password2");
    const grupo = document.getElementById("grupo_password2");
    const icono = document.querySelector("#grupo_password2 i");

    if(inputPassword1.value !== inputPassword2.value || inputPassword2.value === ""){
        grupo.classList.add("formulario_grupo_incorrecto");
        grupo.classList.remove("formulario_grupo_correcto");
        icono.classList.remove("bi-check-circle-fill");
        icono.classList.add("bi", "bi-x-circle-fill");
        document.querySelector("#grupo_password2 .formulario_input_error").classList.add("formulario_input_error_activo");
        campos["password"] = false;
    } else {
        grupo.classList.remove("formulario_grupo_incorrecto");
        grupo.classList.add("formulario_grupo_correcto");
        icono.classList.remove("bi-x-circle-fill");
        icono.classList.add("bi", "bi-check-circle-fill");
        document.querySelector("#grupo_password2 .formulario_input_error").classList.remove("formulario_input_error_activo");
        campos["password"] = true;
    }
};

inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono){
        formulario.reset();

        document.getElementById("formulario_mensaje_exito").classList.add("formulario_mensaje_exito_activo");
        setTimeout(() =>{
            document.getElementById("formulario_mensaje_exito").classList.remove("formulario_mensaje_exito_activo"); 
        },5000);
        
        document.querySelectorAll(".formulario_grupo_correcto").forEach((icono) => {
            icono.classList.remove("formulario_grupo_correcto");
        });
    } else{
        document.getElementById("formulario_mensaje").classList.add("formulario_mensaje_activo");
    }
});

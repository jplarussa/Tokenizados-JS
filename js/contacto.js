// Declaro constantes que toman elementos del DOM
const domTitulo = document.getElementById("titulo-contacto");
const domSelector = document.getElementById("cryptocliente");
const domFormulario = document.getElementById("forminscrip");


// Chequeo cliente en sessionStorage y muestro bienvenida si existe.
let registrado;
let clientes = JSON.parse(sessionStorage.getItem("clientes")) || [];

clientes.length === 0 ? true : registrado = true;
if (registrado === true) {
    Toastify({
        text: `Hola de nuevo ${clientes[0].nombre}`,
        duration: 1500,
        gravity: "top",
        position: "center",
        style: {
            background: "#4a5259", 
        },
    }).showToast();
    domTitulo.textContent = `Usuario: ${clientes[0].nombre}`;
};

// Chequeo Cryptos en localStorage

let cryptos = JSON.parse(localStorage.getItem("cryptos")) || [];

class Cliente {
    constructor(literal) {
        this.id = clientes.length;
        this.nombre = literal.nombre;
        this.apellido = literal.apellido;
        this.email = literal.email;
        this.token = literal.token;
    }
}

// Renderizar las opciones select de cada crypto 
function cargarCryptos() {
    cryptos.forEach(item => {
        let option = document.createElement("option");
        option.setAttribute("value", item.name);
        option.innerHTML = `${item.name}`;

        // Lo insertamos
        domSelector.append(option);
    })
}
cargarCryptos();


// Capturamos eventos del formulario
domFormulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let nombreCliente = document.getElementById("nombrecliente");
    let apellidoCliente = document.getElementById("apellidocliente");
    let emailCliente = document.getElementById("emailcliente");
    let cryptoCliente = document.getElementById("cryptocliente");

    crearCliente(nombreCliente.value, apellidoCliente.value, emailCliente.value, cryptoCliente.value);


});

// Funcion Crear Cliente
const crearCliente = (nombre, apellido, email, token) => {
    if (clientes == "") {
        let nuevoCliente = new Cliente({
            id: clientes.length + 1,
            nombre: nombre,
            apellido: apellido,
            email: email,
            token: token
        });
        clientes.push(nuevoCliente);
        sessionStorage.setItem("clientes", JSON.stringify(clientes));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Gracias por suscribirte',
            showConfirmButton: true,
            timer: 2000
        });
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ya estás registrado',
            showConfirmButton: true,
            timer: 2000
        })
    }
};
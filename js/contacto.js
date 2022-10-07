let clientes = [];
let cryptos = [];
let cryptosStorage = JSON.parse(localStorage.getItem("cryptos"));

if (cryptosStorage) {
    cryptos = cryptosStorage;
}

const domUsuario = document.getElementById("forminscrip");
const domSelector = document.getElementById("cryptocliente");

// Renderizar las opciones select de cada crypto 
function renderizarCryptos() {
    cryptos.forEach(item => {
        let option = document.createElement("option");
        option.setAttribute("value", `"${item.name}"`);
        option.innerHTML = `${item.name}`;

        // Lo insertamos
        domSelector.append(option);
    })
}

renderizarCryptos();

let usuario;
let usuarioStorage = sessionStorage.getItem("usuario");
if(usuarioStorage){
    usuario = usuarioStorage;
    let mensaje = `Bienvenido ${usuario}`;
    domSelector.textContent(mensaje);
}

let nombrecliente = document.getElementById("nombrecliente");
let apellidocliente = document.getElementById("apellidocliente");
let emailcliente = document.getElementById("emailcliente");
let cryptocliente = document.getElementById("cryptocliente");

let formulario = document.getElementById("forminscrip-fc");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    let inputs = e.target.children;
    console.log(inputs[0].value);
    console.log(inputs[1].value);
    if(!inputs[0].value.includes(".gmail")){
    inputs[0].value = "";
    }
})
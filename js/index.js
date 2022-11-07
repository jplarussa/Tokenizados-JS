// API Coingecko con 15 cryptos de mayor MarketCap
const apigecko = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"

// Declaro constantes que toman elementos del DOM
const domTitulo = document.getElementById("titulo-contacto");
const domMonedas = document.getElementById("monedas");
const domBuscador = document.getElementById("search");
const domBoton = document.getElementById("boton");

// Creo Array de cryptos y variables que interactuan con session del usuario
let tokens = [];
let registrado;
let tokenDeUsuario;

// Chequeo cliente en sessionStorage y muestro bienvenida si existe.
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
    tokenDeUsuario = clientes[0].token;
};

// Función asincrona que levanta datos de la url proporcionada (API) y los graba en la variable tokens
const getTokens = async (url) => {    
    try {
        let response = await fetch(url);
        let data = await response.json();
        tokens = data;
        localStorage.setItem("cryptos", JSON.stringify(tokens));
    } catch (error) {
        console.log(error);
    }
};

//Llamo a la función con un Interval, para actualizar los datos de Coingecko cada 10 seg.
getTokens(apigecko);
setInterval( () => {
    getTokens(apigecko);
    if (domMonedas.innerHTML != "") {
        renderizarTokens(tokens);
    }
}, 10000);  

// Renderizo con el botón del HTML 
domBoton.addEventListener("click", () => {
    renderizarTokens(tokens);
});


// Funcion para renderizar las cotizaciones como tarjetas
function renderizarTokens (monedas) {
    domMonedas.innerHTML = "";
    
    // Renderizado de tarjeta
    monedas.forEach(token => {
        // Columna Bootstrap
        const nodoColumna = document.createElement("div");
        nodoColumna.classList.add("col", "mb-4");
        // Tarjeta y sus clases bootstrap
        const nodoCard = document.createElement("div");
        nodoCard.classList.add("card", "bg-secondary", "rounded-3", "shadow-sm", "bg-light", "h-100");
        const nodoCardTitle = document.createElement("div");
        nodoCardTitle.classList.add("card-header", "py-3");
        const nodoTokenTitle = document.createElement("h4");
        nodoTokenTitle.classList.add("my-0", "fw-normal");
        nodoTokenTitle.textContent = token.symbol.toUpperCase();
        const nodoCardBody = document.createElement("div");
        nodoCardBody.classList.add("card-body");
        const nodoCardPrice = document.createElement("H1");
        nodoCardPrice.classList.add("card-title", "pricing-card-title");
        nodoCardPrice.textContent = `$${Math.round(token.current_price * 100)/100}`;
        const nodoCardText = document.createElement("ul");
        nodoCardText.classList.add("list-unstyled", "mt-3", "mb-2");
        nodoCardText.innerHTML = `
        <li>${token.name}</li>
        <li>${Math.round(token.price_change_percentage_24h * 100)/100}%</li>
        <img class="w-50 mt-3 img-fluid card-img-bottom" src="${token.image}">
        `
        
        // Cambio el color de la tarjeta segun variacion de la cotizacion de las ultimas 24 hs - Verde / Rojo / Gris 
        switch (true) {
            // Si el token es el favorito del usuario, lo resaltamos de celeste
            case token.name == tokenDeUsuario:
                nodoCard.classList.add("border-info", "border", "border-5");
                case token.price_change_percentage_24h > 0:
                    nodoCard.classList.add("border-success");
                    nodoCardTitle.classList.add("bg-success", "border-success");
                    nodoCardPrice.classList.add("text-success");
                    nodoCardText.classList.add("text-success");
                    break;
                    case token.price_change_percentage_24h < 0:
                nodoCard.classList.add("border-danger");
                nodoCardTitle.classList.add("bg-danger", "border-danger");
                nodoCardPrice.classList.add("text-danger");
                nodoCardText.classList.add("text-danger");
                break;
                default:
                nodoCard.classList.add("border-secondary");
                nodoCardTitle.classList.add("bg-secondary", "border-secondary");
                nodoCardPrice.classList.add("text-secondary");
                nodoCardText.classList.add("text-secondary");
                break;
            }
            // Lo insertamos al HTML
            nodoCardTitle.append(nodoTokenTitle);
            nodoCardBody.append(nodoCardPrice, nodoCardText)
            nodoCard.append(nodoCardTitle, nodoCardBody);
            nodoColumna.append(nodoCard);
            domMonedas.append(nodoColumna);
        })   
    }

// Buscador de tokens por simbolo o nombre
function buscarTokens (monedas) {
    domBuscador.addEventListener("keyup", (e) => {
        let tokensFiltrados = tokens.filter((token) => {
            return token.symbol.toUpperCase().match(e.target.value.toUpperCase()) || token.name.toUpperCase().match(e.target.value.toUpperCase());
        });
        domMonedas.innerHTML = "";  

        renderizarTokens(tokensFiltrados);
    });
}
// Inicializo el buscador
buscarTokens();
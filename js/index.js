// API Coingecko con 15 cryptos de mayor MarketCap
apigecko = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"

// Declaro constantes que toman elementos del DOM
const domTitulo = document.getElementById("titulo-contacto");

// Creo Array de cryptos
let tokens = [];
let registrado;

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
    domTitulo.textContent = `"Usuario: ${clientes[0].nombre}!"`;
};


// Creo la clase constructora de Cryptos
class crypto {
    constructor(name, symbol, currentPrice, priceChange24h, lastDay) {
        this.name = name;
        this.symbol = symbol;
        this.currentPrice = currentPrice;
        this.priceChange24h = priceChange24h;
        this.lastDay = lastDay;
    }
}

const getTokens = async (url) => {    
    try {
        let response = await axios(url);
        let data = await response.data;
        tokens = data;
        localStorage.setItem("cryptos", JSON.stringify(tokens));
    } catch (error) {
        console.log(error);
    }
};

//Llamo a la función para traer datos de Coingecko
getTokens(apigecko);



const domMonedas = document.getElementById("monedas");
const domBoton = document.getElementById("boton");
// Muestro cotizaciones al clickear
domBoton.addEventListener("click", renderizarTokens)





// Renderizar las cotizaciones en tarjetas
function renderizarTokens() {
    domMonedas.innerHTML = "";
    tokens.forEach(item => {
        // Columna Bootstrap
        const nodoColumna = document.createElement("div");
        nodoColumna.classList.add("col");
        // Tarjeta
        const nodoCard = document.createElement("div");
        nodoCard.classList.add("card", "bg-secondary", "mb-4", "rounded-3", "shadow-sm", "bg-light");
        const nodoCardTitle = document.createElement("div");
        nodoCardTitle.classList.add("card-header", "py-3");
        const nodoTokenTitle = document.createElement("h4");
        nodoTokenTitle.classList.add("my-0", "fw-normal");
        nodoTokenTitle.textContent = item.symbol.toUpperCase();
        const nodoCardBody = document.createElement("div");
        nodoCardBody.classList.add("card-body");
        const nodoCardPrice = document.createElement("H1");
        nodoCardPrice.classList.add("card-title", "pricing-card-title");
        nodoCardPrice.textContent = `${item.current_price}`;
        const nodoCardText = document.createElement("ul");
        nodoCardText.classList.add("list-unstyled", "mt-3", "mb-4");
        nodoCardText.innerHTML = `
        <li>${item.name}</li>
        <li>${Math.round(item.price_change_percentage_24h * 100)/100}%</li>
        `
        // Cambio el color segun variacion de la cotizacion
        switch (true) {
            case item.price_change_percentage_24h > 0:
                nodoCard.classList.add("border-success");
                nodoCardTitle.classList.add("bg-success", "border-success");
                nodoCardPrice.classList.add("text-success");
                nodoCardText.classList.add("text-success");
                break;
            case item.price_change_percentage_24h < 0:
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
        // Lo insertamos
        nodoCardTitle.append(nodoTokenTitle);
        nodoCardBody.append(nodoCardPrice, nodoCardText)
        nodoCard.append(nodoCardTitle, nodoCardBody);
        nodoColumna.append(nodoCard);
        domMonedas.append(nodoColumna);
    })
}
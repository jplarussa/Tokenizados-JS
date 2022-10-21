// API Coingecko con 15 cryptos de mayor MarketCap
apigecko = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"

// Declaro constantes que toman elementos del DOM
const domTitulo = document.getElementById("titulo-contacto");

// Creo Array de cryptos
const tokens = [];
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
        let allTokens = [];
        let response = await fetch(url);
        data = await response.json();
        allTokens.push(...data);
        return allTokens;
    } catch (error) {
        console.log(error);
    }
};



// Creo instancias y las meto al array
let btc = new crypto("Bitcoin", "BTC", 18674, 0.018, 2)
let eth = new crypto("Ethereum", "ETH", 1260.50, 0.058, 2)
let bnb = new crypto("BNB", "BNB", 274, 0.008, 2)
let xrp = new crypto("XRP", "XRP", 0.486, 0.024, 1)
let ada = new crypto("Cardano", "ADA", 0.44, 0.022, 2)
let sol = new crypto("Solana", "SOL", 32.2, 0.024, 2)

tokens.push(btc);
tokens.push(eth);
tokens.push(bnb);
tokens.push(xrp);
tokens.push(ada);
tokens.push(sol);

// Cargo en LocalStorage el listado de cryptos
localStorage.setItem("cryptos", JSON.stringify(tokens));

const domMonedas = document.getElementById("monedas");
const domBoton = document.getElementById("boton");
// Muestro cotizaciones al clickear
domBoton.addEventListener("click", renderizarTokens)
let coco = getTokens(apigecko);
console.log(coco);


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
        nodoTokenTitle.textContent = item.symbol;
        const nodoCardBody = document.createElement("div");
        nodoCardBody.classList.add("card-body");
        const nodoCardPrice = document.createElement("H1");
        nodoCardPrice.classList.add("card-title", "pricing-card-title");
        nodoCardPrice.textContent = `${item.currentPrice}`;
        const nodoCardText = document.createElement("ul");
        nodoCardText.classList.add("list-unstyled", "mt-3", "mb-4");
        nodoCardText.innerHTML = `<li>${item.name}</li>`
        // Cambio el color segun variacion de la cotizacion
        switch (item.lastDay) {
            case 1:
                nodoCard.classList.add("border-success");
                nodoCardTitle.classList.add("bg-success", "border-success");
                nodoCardPrice.classList.add("text-success");
                nodoCardText.classList.add("text-success");
                break;
            case 2:
                nodoCard.classList.add("border-danger");
                nodoCardTitle.classList.add("bg-danger", "border-danger");
                nodoCardPrice.classList.add("text-danger");
                nodoCardText.classList.add("text-danger");
                break;
            default:
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
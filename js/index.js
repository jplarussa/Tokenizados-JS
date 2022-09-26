// Creo Array de cryptos
const tokens= [];

// Creo la clase constructora de Cryptos
class crypto{
    constructor(name,ticker,price,change,lastDay){
        this.name = name;
        this.ticker = ticker;
        this.price = price;
        this.change = change;
        this.lastDay = lastDay;
    }
}

// Creo instancias y las meto al array
let btc = new crypto("Bitcoin","BTC","18.674",0.018,2)
let eth = new crypto("Ethereum","ETH","1.260",0.058,2)
let bnb = new crypto("BNB","BNB","274",0.008,2)
let xrp = new crypto("XRP","XRP","0,486",0.024,1)
let ada = new crypto("Cardano","ADA","0,44",0.022,2)
let sol = new crypto("Solana","SOL","32,2",0.024,2)

tokens.push(btc);
tokens.push(eth);
tokens.push(bnb);
tokens.push(xrp);
tokens.push(ada);
tokens.push(sol);

const DOMmonedas = document.getElementById("monedas");

// Renderizar las cotizaciones en tarjetas
function renderizarTokens() {
    tokens.forEach( item => {
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
        nodoTokenTitle.textContent = item.ticker;
        const nodoCardBody = document.createElement("div");
        nodoCardBody.classList.add("card-body");
        const nodoCardPrice = document.createElement("H1");
        nodoCardPrice.classList.add("card-title", "pricing-card-title");
        nodoCardPrice.textContent = `$${item.price}`;
        const nodoCardText = document.createElement("ul");
        nodoCardText.classList.add("list-unstyled", "mt-3", "mb-4");
        nodoCardText.innerHTML = `<li>${item.name}</li>`
        // Cambio el color segun variacion de la cotizacion
        switch(item.lastDay) {
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
        DOMmonedas.append(nodoColumna);
    })
}
renderizarTokens()

// Ingreso del usuario y filtrado
let input = prompt("Indique la cryptomoneda para conocer su cotización:").toUpperCase();
let output = tokens.find((item) => item.ticker === input);

if (typeof output !== "undefined") {
    // Hago mas amigable la información de si subió o bajo la crypto seleccionada
    if (output.lastDay === 1) {
        output.lastDay = "Subió";
    } else if (output.lastDay === 2) {
        output.lastDay = "Bajo";
    } else {
        output.lastDay = "Neutro";
    };
    // Muestro el resultado
    let showToken = `
        Name: ${output.name}
        Ticker: ${output.ticker}
        Price: ${output.price}
        Change: ${output.change*100}%
        Last Day: ${output.lastDay}
    `;
    alert(showToken);
} else {
    showToken = "No existe cotización"
    alert(showToken);
}

// Funcion del botón web, resumen de cotizaciones
function cotizaciones () {
    const winners = tokens.filter(crypto => crypto.lastDay === 1);
    let showWinners = `Cryptos Ganadoras del día: \n`;
    winners.forEach(item => {
        showWinners += `${item.ticker} `;
    });
    alert(showWinners);
    console.log(showWinners);

    const losers = tokens.filter(crypto => crypto.lastDay === 2);
    let showLosers = `Cryptos Perdedoras del día: \n`;
    losers.forEach(item => {
        showLosers += `${item.ticker} `;
    });
    alert(showLosers);
    console.log(showLosers);
    
    console.log(tokens);
}


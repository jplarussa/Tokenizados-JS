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
let btc = new crypto("Bitcoin","BTC","18674",0.018,2)
let eth = new crypto("Ethereum","ETH","1260",0.058,2)
let bnb = new crypto("BNB","BNB","1260",0.008,2)
let xrp = new crypto("XRP","XRP","1260",0.024,1)
let ada = new crypto("Cardano","ADA","1260",0.022,2)
let sol = new crypto("Solana","SOL","1260",0.024,2)

tokens.push(btc);
tokens.push(eth);
tokens.push(bnb);
tokens.push(xrp);
tokens.push(ada);
tokens.push(sol);

// Ingreso del usuario y filtrado
let input = prompt("Indique la cryptomoneda para conocer su cotización:").toUpperCase();
let output = tokens.find((item) => item.ticker === input);
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
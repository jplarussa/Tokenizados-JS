// Creo Array de cryptos
const tokens= [];

class crypto{
    constructor(name,ticker,price,change,lastDay){
        this.name = name;
        this.ticker = ticker;
        this.price = price;
        this.change = change;
        this.lastDay = lastDay;
    }
}

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

console.log(tokens);

const winners = tokens.filter(crypto => crypto.lastDay === 1);
winners.forEach(item => {
    let mostrar = `Cryptos Ganadoras del día: \n ${item.ticker}`;
    alert(mostrar);
    console.log(mostrar);
});

const losers = tokens.filter(crypto => crypto.lastDay === 2);
losers.forEach(item => {
    let mostrar = `Cryptos Perdedoras del día: \n ${item.ticker}`;
    alert(mostrar);
    console.log(mostrar)
});


function cotizaciones () {
    
}
let clientes = [];
let cryptos = [];
let cryptosStorage = JSON.parse(localStorage.getItem("cryptos"));

if (cryptosStorage) {
    cryptos = cryptosStorage;
}

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
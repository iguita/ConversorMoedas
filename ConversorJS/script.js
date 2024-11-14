const convertButton = document.querySelector(".convert-button");
const currencySelectFrom = document.querySelector(".converterde");
const currencySelectTo = document.querySelector(".convertido");

function convertValues() {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value.replace(/[^\d.-]/g, ''));
    const CurrencyValuetoConvert = document.querySelector(".currency-convert"); // valor de entrada
    const CurrencyValueConverted = document.querySelector(".currency-converted"); // valor convertido

    // Valores simulados das moedas em relação ao Real
    const dolarToday = 5.81;
    const euroToday = 6.14;
    const libraToday = 7.39;
    const bitcoinToday = 541468;

    const rates = {
        dolar: dolarToday,
        euro: euroToday,
        libra: libraToday,
        bit: bitcoinToday,
        real: 1
    };

    if (!isNaN(inputCurrencyValue)) {
        const fromRate = rates[currencySelectFrom.value];
        const toRate = rates[currencySelectTo.value];
        let convertedValue;

        if (fromRate && toRate) {
            // Convertendo de uma moeda qualquer para outra
            convertedValue = (inputCurrencyValue * fromRate) / toRate;
            
            // Formatação do valor convertido
            if (currencySelectTo.value === "real") {
                CurrencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                }).format(convertedValue);
            } else if (currencySelectTo.value === "dolar") {
                CurrencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                }).format(convertedValue);
            } else if (currencySelectTo.value === "euro") {
                CurrencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR"
                }).format(convertedValue);
            } else if (currencySelectTo.value === "libra") {
                CurrencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP"
                }).format(convertedValue);
            } else if (currencySelectTo.value === "bit") {
                CurrencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                    style: "decimal",
                    minimumFractionDigits: 8,
                    maximumFractionDigits: 8
                }).format(convertedValue) + " BTC";
            }

            // Exibe o valor original convertido no formato de Real
            CurrencyValuetoConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
            }).format(inputCurrencyValue);
        }
    } else {
        alert("Por favor, insira um valor válido.");
    }
}


// Mapeamento das moedas para o caminho das bandeiras e nomes das moedas
const flagMap = {
    real: { src: "./assets/real.png", name: "Real" },
    dolar: { src: "./assets/dollar.png", name: "Dólar" },
    euro: { src: "./assets/euro.png", name: "Euro" },
    libra: { src: "./assets/libra.png", name: "Libra" },
    bit: { src: "./assets/bitcoin.png", name: "Bitcoin" }
};

//atualizar a bandeira e o nome da moeda durante seleção
function updateFlagAndName(selectElement, flagElementId, nameElementClass) {
    const selectedCurrency = selectElement.value;
    const flagElement = document.getElementById(flagElementId);
    const nameElement = document.querySelector(nameElementClass);

    if (flagMap[selectedCurrency]) {
        flagElement.src = flagMap[selectedCurrency].src;
        nameElement.innerText = flagMap[selectedCurrency].name;
    }
}

// atualizar bandeira e nome
document.querySelector(".converterde").addEventListener("change", function() {
    updateFlagAndName(this, "fromFlag", ".currency-box:first-of-type .moeda");
});

document.querySelector(".convertido").addEventListener("change", function() {
    updateFlagAndName(this, "toFlag", ".currency-box:last-of-type .moeda");
});

convertButton.addEventListener("click", convertValues);

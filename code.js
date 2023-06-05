let firstCurrency = document.getElementById("currency1");
let secondCurrency = document.getElementById("currency2");
let amount = document.getElementById("input");
let rate = document.getElementById("rate");
let getResult = document.getElementById("result")

// My API key
let key = "e4ead7a5ff594a8491881a15";

// Getting more currencies to add more options to my current ones
fetch(`https://v6.exchangerate-api.com/v6/${key}/codes`)
    .then((response) => response.json())
    .then((data) => {
        const { supported_codes } = data;
        const selectElements = document.querySelectorAll("select")

        // Create elements for option
        supported_codes.forEach((code) => {
            const optionElement = document.createElement("option")
            optionElement.value = code;
            optionElement.text = code;

            selectElements.forEach((select) => {
                select.appendChild(optionElement.cloneNode(true))
            });
        });
    })
.catch((error) => {
    console.log("Error fetching currency options:", error);
});



// Now calculating the currencies
function calculate() {
    let currency_1 = firstCurrency.value
    let currency_2 = secondCurrency.value

    fetch(`https://v6.exchangerate-api.com/v6/${key}/pair/${currency_1}/${currency_2}`)
    .then(response => response.json())
    .then(data => {
        const {conversion_rate} = data;
        const convertedAmount = (amount.value * conversion_rate).toFixed(2);

        rate.innerHTML = `${amount.value} ${currency_1} = ${convertedAmount} ${currency_2}`
    })
}

// Event listners
getResult.addEventListener("click", calculate)
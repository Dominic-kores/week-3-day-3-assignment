// ------------------------------
// Currency Converter
// ------------------------------

// Select HTML elements
const currencyForm = document.getElementById("currency-form");
const amountInput = document.getElementById("amount");

const fromCurrency =
    document.getElementById("from-currency");

const toCurrency =
    document.getElementById("to-currency");

const swapBtn =
    document.getElementById("swap-btn");

const statusElement =
    document.getElementById("currency-status");

const resultElement =
    document.getElementById("currency-result");


// ------------------------------
// Convert currency
// ------------------------------

const convertCurrency = async () => {

    // Get information entered by the user
    const amount = Number(amountInput.value);

    const from = fromCurrency.value;
    const to = toCurrency.value;

    // Validate the amount
    if (!amount || amount <= 0) {

        statusElement.textContent =
            "Please enter a valid amount.";

        resultElement.textContent = "";

        return;
    }

    // API URL
    const API_URL =
        `https://open.er-api.com/v6/latest/${from}`;

    try {

        // Show loading state
        statusElement.textContent =
            "Loading exchange rate...";

        resultElement.textContent = "";

        // Request exchange-rate data
        const response = await fetch(API_URL);

        // Check whether request succeeded
        if (!response.ok) {
            throw new Error(
                "Unable to fetch exchange rates."
            );
        }

        // Convert JSON response into JavaScript object
        const data = await response.json();

        // Get conversion rate
        const rate = data.rates[to];

        if (!rate) {
            throw new Error(
                "Exchange rate not available."
            );
        }

        // Calculate converted value
        const convertedAmount = amount * rate;

        // Clear loading message
        statusElement.textContent = "";

        // Display result
        resultElement.textContent =
            `${from} ${amount.toLocaleString()} = ` +
            `${to} ${convertedAmount.toLocaleString(
                undefined,
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            )}`;

    } catch (error) {

        // Show friendly error message
        statusElement.textContent =
            "Sorry, the exchange rate could not be loaded. Please try again.";

        console.error(error);
    }
};


// ------------------------------
// Form submission
// ------------------------------

currencyForm.addEventListener(
    "submit",
    (event) => {

        // Prevent browser refresh
        event.preventDefault();

        convertCurrency();
    }
);


// ------------------------------
// Swap currencies
// ------------------------------

swapBtn.addEventListener(
    "click",
    () => {

        // Save the current From currency
        const temporaryCurrency =
            fromCurrency.value;

        // Swap the values
        fromCurrency.value =
            toCurrency.value;

        toCurrency.value =
            temporaryCurrency;

        // Convert again if an amount exists
        if (amountInput.value) {
            convertCurrency();
        }
    }
);
let items = [];
let totalRP = 0;
let selectedItems = null; 
let itemsAdded = false;

// Define the VP packages available
const vpPackages = [
    { vp: 475, cost: 4.99 },
    { vp: 1000, cost: 9.99 },
    { vp: 2050, cost: 19.99 },
    { vp: 3650, cost: 34.99 },
    { vp: 5350, cost: 49.99 },
    { vp: 11000, cost: 99.99 }
];

// Define currency conversion rates (example rates)
const currencyRates = {
    USD: 1,         // 1 USD = 1 USD (base currency)
    EUR: 0.88,      // 1 USD = 0.88 EUR
    GBP: 0.78,      // 1 USD = 0.78 GBP
    CAD: 0.73       // 1 USD = 0.73 CAD
    // Add more currencies and rates as needed
};

function calculateVP(rpCost, currency) {
    // Validate RP cost (optional: you may add more specific validation)
    if (isNaN(rpCost) || rpCost <= 0) {
        alert('Please enter a valid RP cost.');
        return; // Exit function early if validation fails
    }

    // Perform calculations based on rpCost and currency
    let vpCost = rpCost * getConversionRate(currency); // Example function to get conversion rate

    // Find VP packages that are closest to or exceed the calculated VP cost
    let selectedPackages = [];
    let remainingVP = vpCost;

    for (let i = vpPackages.length - 1; i >= 0; i--) {
        while (remainingVP >= vpPackages[i].vp) {
            remainingVP -= vpPackages[i].vp;
            selectedPackages.push(vpPackages[i]);
        }
    }

    // If there's remaining VP needed, add the smallest package to cover it
    if (remainingVP > 0) {
        selectedPackages.push(vpPackages[0]); // Add the smallest package
    }

    // Update UI with selected VP packages
    updateVPPackages(selectedPackages);
}

function updateVPPackages(packages) {
    const vpPackagesDiv = document.getElementById('vpPackages');
    vpPackagesDiv.innerHTML = '';

    let totalCost = 0;

    packages.forEach(pkg => {
        const packageElement = document.createElement('p');
        packageElement.textContent = `${pkg.vp} VP - $${pkg.cost.toFixed(2)}`;
        vpPackagesDiv.appendChild(packageElement);

        totalCost += pkg.cost;
    });

    // Display the total cost in the selected currency if items have been added
    if (itemsAdded) {
        const selectedCurrency = document.getElementById('currency').value;
        const totalCostElement = document.getElementById('totalCost');

        if (totalCostElement) {
            totalCostElement.textContent = `Total $: ${selectedCurrency} ${totalCost.toFixed(2)}`;
        } else {
            console.error('Element with id="totalCost" not found.');
        }
    }
}


function getConversionRate(currency) {
    return currencyRates[currency] || 1; // Default to 1 if currency rate not found (USD)
}

// Initialize the application after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add item button click event handler
    const addItemButton = document.getElementById('addItemButton');
    addItemButton.addEventListener('click', function() {
        addItem();
    });

    // Currency select change event handler
    const currencySelect = document.getElementById('currency');
    currencySelect.addEventListener('change', function() {
        // Update selectedItems with currency selection
        if (selectedItems) {
            selectedItems.currency = currencySelect.value;
        }
    });
});


function addItem() {
    // Get the RP cost entered by the user
    let rpCost = document.getElementById('itemCost').value.trim();
    
    // Get the selected currency
    let currency = document.getElementById('currency').value;

    // Check if RP cost and currency are provided
    if (rpCost === '' || currency === 'none') {
        alert('Please enter RP cost and select a currency.');
        return; // Exit function early if validation fails
    }

    // Store selected items
    selectedItems = {
        rpCost: parseFloat(rpCost),
        currency: currency
    };

    itemsAdded = true; // Set flag to true after adding items

    // Proceed with adding the item and calculating VP
    calculateVP(selectedItems.rpCost, selectedItems.currency); // Pass rpCost and currency to calculateVP function
}

function updateVPCosts() {
    const selectedCurrency = document.getElementById('currency').value;
    const vpPackagesDiv = document.getElementById('vpPackages');

    // Check if vpPackagesDiv is null (element with id="vpPackages" not found)
    if (!vpPackagesDiv) {
        console.error('Element with id="vpPackages" not found in the DOM.');
        return;
    }

    // Clear previous content
    vpPackagesDiv.innerHTML = '';

    // Calculate VP costs in selected currency
    vpPackages.forEach(pkg => {
        const convertedCost = pkg.cost * getConversionRate(selectedCurrency);
        const packageElement = document.createElement('p');
        packageElement.textContent = `${pkg.vp} VP - ${selectedCurrency} ${convertedCost.toFixed(2)}`;
        vpPackagesDiv.appendChild(packageElement);
    });
}

function resetCalculator() {
    items = [];
    totalRP = 0;
    itemsAdded = false; // Reset flag
    updateItemList();
    updateTotalRP();
    updateVPPackages([], 0); // Reset VP packages display
}

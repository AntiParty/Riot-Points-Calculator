let items = [];
let totalRP = 0;
let totalCost = 0;

// Define the VP packages available
const vpPackages = [
    { vp: 475, cost: 4.99 },
    { vp: 1000, cost: 9.99 },
    { vp: 2050, cost: 19.99 },
    { vp: 3650, cost: 34.99 },
    { vp: 5350, cost: 49.99 },
    { vp: 11000, cost: 99.99 }
];

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

    // Proceed with adding the item and calculating VP
    calculateVP(parseFloat(rpCost), currency); // Pass rpCost and currency to calculateVP function
}


function updateItemList() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    items.forEach((cost, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Item ${index + 1}: ${cost} RP`;
        itemList.appendChild(listItem);
    });
}

function updateTotalRP() {
    document.getElementById('totalRP').textContent = totalRP;
}

function calculateVP(rpCost, currency) {
    // Validate RP cost (optional: you may add more specific validation)
    if (isNaN(rpCost) || rpCost <= 0) {
        alert('Please enter a valid RP cost.');
        return; // Exit function early if validation fails
    }

    // Perform calculations based on rpCost and currency
    let vpCost = rpCost * getConversionRate(currency); // Example function to get conversion rate

    // Update UI with calculated VP cost
    document.getElementById('totalVP').textContent = vpCost.toFixed(2);
}

function updateVPPackages(packages, totalCost) {
    const vpPackagesDiv = document.getElementById('vpPackages');
    vpPackagesDiv.innerHTML = '';

    packages.forEach(pkg => {
        const packageElement = document.createElement('p');
        packageElement.textContent = `${pkg.vp} VP - $${pkg.cost.toFixed(2)}`;
        vpPackagesDiv.appendChild(packageElement);
    });

    const totalCostElement = document.createElement('p');
    totalCostElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
    vpPackagesDiv.appendChild(totalCostElement);
}

function resetCalculator() {
    items = [];
    totalRP = 0;
    updateItemList();
    updateTotalRP();
    updateVPPackages([], 0); // Reset VP packages display
}
// Define currency conversion rates (example rates)
const currencyRates = {
    USD: 1,         // 1 USD = 1 USD (base currency)
    EUR: 0.88,      // 1 USD = 0.88 EUR
    GBP: 0.78,       // 1 USD = 0.78 GBP
    CAD: 0.73
    // Add more currencies and rates as needed
};

// Function to update VP costs based on selected currency
function updateVPCosts() {
    const selectedCurrency = document.getElementById('currency').value;
    const vpPackagesDiv = document.getElementById('vpPackages');

    // Clear previous content
    vpPackagesDiv.innerHTML = '';

    // Get the selected currency rate
    const rate = currencyRates[selectedCurrency];

    // Calculate VP costs in selected currency
    vpPackages.forEach(pkg => {
        const convertedCost = pkg.cost * rate;
        const packageElement = document.createElement('p');
        packageElement.textContent = `${pkg.vp} VP - ${selectedCurrency} ${convertedCost.toFixed(2)}`;
        vpPackagesDiv.appendChild(packageElement);
    });
}
function calculateVP() {
    let vpNeeded = totalRP;
    let selectedPackages = [];
    let totalCost = 0;

    for (let i = vpPackages.length - 1; i >= 0; i--) {
        while (vpNeeded >= vpPackages[i].vp) {
            vpNeeded -= vpPackages[i].vp;
            selectedPackages.push(vpPackages[i]);
            totalCost += vpPackages[i].cost;
        }
    }

    if (vpNeeded > 0) {
        selectedPackages.push(vpPackages[0]);
        totalCost += vpPackages[0].cost;
    }

    // Update total VP and VP packages for selected currency
    updateTotalVP(selectedPackages);
    updateVPPackages(selectedPackages, totalCost);
}

function updateTotalVP(packages) {
    const selectedCurrency = document.getElementById('currency').value;
    const rate = currencyRates[selectedCurrency];
    const totalVP = packages.reduce((total, pkg) => total + pkg.vp, 0);
    const convertedTotalCost = totalCost * rate;

    document.getElementById('totalVP').textContent = totalVP;
    document.getElementById('totalCost').textContent = `${selectedCurrency} ${convertedTotalCost.toFixed(2)}`;
}


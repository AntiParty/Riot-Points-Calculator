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
    const itemCostInput = document.getElementById('itemCost');
    const itemCost = parseInt(itemCostInput.value);

    if (!isNaN(itemCost) && itemCost > 0) {
        items.push(itemCost);
        totalRP += itemCost;

        updateItemList();
        updateTotalRP();
        calculateVP();

        itemCostInput.value = '';
    } else {
        alert('Please enter a valid item cost.');
    }
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

    document.getElementById('totalVP').textContent = selectedPackages.reduce((total, pkg) => total + pkg.vp, 0);
    updateVPPackages(selectedPackages, totalCost);
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


import './env.js';
let items = [];
let totalRP = 0;
let vpPackages = [];
console.log('DISCORD_WEBHOOK_URL:', window.env.DISCORD_WEBHOOK_URL);


// Function to fetch VP packages from the JSON file (for browser)
async function fetchVPPackages() {
    try {
        const response = await fetch('vpPackages.json');
        vpPackages = await response.json();
        console.log('VP Packages fetched:', vpPackages);
    } catch (error) {
        console.error('Error fetching VP packages:', error);
    }
}

// Browser-specific event listeners and operations
if (typeof window !== 'undefined') {
    // Call the function to fetch VP packages on page load
    fetchVPPackages();

    // DOM manipulation and interaction
    document.addEventListener('DOMContentLoaded', function() {
        const addItemButton = document.getElementById('addItemButton');
        const currencySelect = document.getElementById('currency');

        addItemButton.addEventListener('click', function() {
            addItem();
            calculateVP();
        });

        currencySelect.addEventListener('change', function() {
            if (totalRP > 0) {
                calculateVP();
            }
        });

        document.getElementById('feedbackButton').addEventListener('click', function() {
            document.getElementById('feedbackModal').style.display = 'block';
        });

        document.querySelector('.close').addEventListener('click', function() {
            document.getElementById('feedbackModal').style.display = 'none';
        });

        document.getElementById('feedbackForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const feedback = document.getElementById('feedback').value;
            sendFeedback(feedback);
            alert('Thank you for your feedback!');
            document.getElementById('feedbackModal').style.display = 'none';
        });
    });
}

// Function to add an item (for browser)
function addItem() {
    if (typeof window !== 'undefined') {
        let rpCost = document.getElementById('itemCost').value.trim();
        let currency = document.getElementById('currency').value;

        if (rpCost === '' || currency === 'none') {
            alert('Please enter RP cost and select a currency.');
            return;
        }

        items.push(parseFloat(rpCost));
        totalRP += parseFloat(rpCost);
        updateItemList();
        updateTotalRP(totalRP);
    }
}

// Function to update the item list (for browser)
function updateItemList() {
    if (typeof window !== 'undefined') {
        const itemList = document.getElementById('itemList');
        itemList.innerHTML = '';

        items.forEach((cost, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Item ${index + 1}: ${cost} RP`;
            itemList.appendChild(listItem);
        });
    }
}

// Function to update the total RP (for browser)
function updateTotalRP(totalRP) {
    if (typeof window !== 'undefined') {
        document.getElementById('totalRPValue').textContent = totalRP.toFixed(0);
    }
}

// Function to calculate VP (for browser)
function calculateVP() {
    if (typeof window !== 'undefined') {
        let vpNeeded = totalRP;
        let selectedPackages = [];
        let totalCost = 0;
        const selectedCurrency = document.getElementById('currency').value;

        for (let i = vpPackages.length - 1; i >= 0; i--) {
            while (vpNeeded >= vpPackages[i].vp) {
                vpNeeded -= vpPackages[i].vp;
                selectedPackages.push(vpPackages[i]);
                totalCost += vpPackages[i].costs[selectedCurrency];
            }
        }

        if (vpNeeded > 0) {
            selectedPackages.push(vpPackages[0]);
            totalCost += vpPackages[0].costs[selectedCurrency];
        }

        updateTotalVP(selectedPackages);
        updateVPPackages(selectedPackages, totalCost, selectedCurrency);
    }
}

// Function to update total VP (for browser)
function updateTotalVP(packages) {
    if (typeof window !== 'undefined') {
        const totalVP = packages.reduce((total, pkg) => total + pkg.vp, 0);
        document.getElementById('totalVPValue').textContent = totalVP.toFixed(2);
    }
}

// Function to update VP packages display (for browser)
function updateVPPackages(packages, totalCost, currency) {
    if (typeof window !== 'undefined') {
        const vpPackagesDiv = document.getElementById('vpPackages');
        vpPackagesDiv.innerHTML = '';

        packages.forEach(pkg => {
            const packageElement = document.createElement('p');
            packageElement.textContent = `${pkg.vp} VP - ${currency} ${pkg.costs[currency].toFixed(2)}`;
            vpPackagesDiv.appendChild(packageElement);
        });

        const totalCostElement = document.createElement('p');
        totalCostElement.innerHTML = `Total Cost: <span class="total-cost">${currency} ${totalCost.toFixed(2)}</span>`;
        vpPackagesDiv.appendChild(totalCostElement);
    }
}

// Function to reset the calculator (for browser)
function resetCalculator() {
    if (typeof window !== 'undefined') {
        items = [];
        totalRP = 0;
        updateItemList();
        updateTotalRP(0);
        updateVPPackages([], 0, 'USD'); // Assuming USD is default
    }
}

// Function to send feedback to Discord via webhook
async function sendFeedback(feedback) {
    const webhookURL = window.env.DISCORD_WEBHOOK_URL;

    try {
        if (!webhookURL) {
            throw new Error('Webhook URL is not defined.');
        }

        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: `**User Feedback:** ${feedback}` })
        });

        if (response.ok) {
            console.log('Feedback sent successfully');
        } else {
            console.error('Error sending feedback:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending feedback:', error.message);
    }
}

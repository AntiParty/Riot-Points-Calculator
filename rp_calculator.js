let items = [];
let totalRP = 0;
let vpPackages = [];

// Function to fetch VP packages (used in both environments)
async function fetchVPPackages() {
    try {
        const response = await fetch('vpPackages.json'); // For browser fetch API
        vpPackages = await response.json();
        console.log('VP Packages fetched:', vpPackages);
    } catch (error) {
        console.error('Error fetching VP packages:', error);
    }
}

// Function to handle adding an item
function addItem(rpCost) {
    if (rpCost === '' || isNaN(rpCost)) {
        throw new Error('RP cost must be a number.');
    }
    items.push(parseFloat(rpCost));
    totalRP += parseFloat(rpCost);
}

// Function to update the item list
function updateItemList() {
    return items.map((cost, index) => `Item ${index + 1}: ${cost} RP`).join('<br>');
}

// Function to calculate VP needed
function calculateVP(selectedCurrency) {
    let vpNeeded = totalRP;
    let selectedPackages = [];
    let totalCost = 0;

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

    return { selectedPackages, totalCost };
}

// Example function to send feedback (replace with actual implementation)
async function sendFeedback(feedback) {
    try {
        const webhookURL = process.env.DISCORD_WEBHOOK_URL; // Use environment variable for Node.js

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
            throw new Error(`Error sending feedback: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error sending feedback:', error.message);
    }
}

// Export functions for use in Node.js or other modules
module.exports = {
    fetchVPPackages,
    addItem,
    updateItemList,
    calculateVP,
    sendFeedback
};

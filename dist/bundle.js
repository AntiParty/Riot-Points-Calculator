/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./rp_calculator.js":
/*!**************************!*\
  !*** ./rp_calculator.js ***!
  \**************************/
/***/ (() => {

eval("\r\nlet items = [];\r\nlet totalRP = 0;\r\nlet vpPackages = [];\r\nconsole.log('window.env:', window.env); // Check if window.env is defined\r\nconsole.log('DISCORD_WEBHOOK_URL:', window.env.DISCORD_WEBHOOK_URL); // Check if DISCORD_WEBHOOK_URL is defined\r\n\r\n\r\n\r\n// Function to fetch VP packages from the JSON file (for browser)\r\nasync function fetchVPPackages() {\r\n    try {\r\n        const response = await fetch('vpPackages.json');\r\n        vpPackages = await response.json();\r\n        console.log('VP Packages fetched:', vpPackages);\r\n    } catch (error) {\r\n        console.error('Error fetching VP packages:', error);\r\n    }\r\n}\r\n\r\n// Browser-specific event listeners and operations\r\nif (typeof window !== 'undefined') {\r\n    // Call the function to fetch VP packages on page load\r\n    fetchVPPackages();\r\n\r\n    // DOM manipulation and interaction\r\n    document.addEventListener('DOMContentLoaded', function() {\r\n        const addItemButton = document.getElementById('addItemButton');\r\n        const currencySelect = document.getElementById('currency');\r\n\r\n        addItemButton.addEventListener('click', function() {\r\n            addItem();\r\n            calculateVP();\r\n        });\r\n\r\n        currencySelect.addEventListener('change', function() {\r\n            if (totalRP > 0) {\r\n                calculateVP();\r\n            }\r\n        });\r\n\r\n        document.getElementById('feedbackButton').addEventListener('click', function() {\r\n            document.getElementById('feedbackModal').style.display = 'block';\r\n        });\r\n\r\n        document.querySelector('.close').addEventListener('click', function() {\r\n            document.getElementById('feedbackModal').style.display = 'none';\r\n        });\r\n\r\n        document.getElementById('feedbackForm').addEventListener('submit', function(event) {\r\n            event.preventDefault();\r\n            const feedback = document.getElementById('feedback').value;\r\n            sendFeedback(feedback);\r\n            alert('Thank you for your feedback!');\r\n            document.getElementById('feedbackModal').style.display = 'none';\r\n        });\r\n    });\r\n}\r\n\r\n// Function to add an item (for browser)\r\nfunction addItem() {\r\n    if (typeof window !== 'undefined') {\r\n        let rpCost = document.getElementById('itemCost').value.trim();\r\n        let currency = document.getElementById('currency').value;\r\n\r\n        if (rpCost === '' || currency === 'none') {\r\n            alert('Please enter RP cost and select a currency.');\r\n            return;\r\n        }\r\n\r\n        items.push(parseFloat(rpCost));\r\n        totalRP += parseFloat(rpCost);\r\n        updateItemList();\r\n        updateTotalRP(totalRP);\r\n    }\r\n}\r\n\r\n// Function to update the item list (for browser)\r\nfunction updateItemList() {\r\n    if (typeof window !== 'undefined') {\r\n        const itemList = document.getElementById('itemList');\r\n        itemList.innerHTML = '';\r\n\r\n        items.forEach((cost, index) => {\r\n            const listItem = document.createElement('li');\r\n            listItem.textContent = `Item ${index + 1}: ${cost} RP`;\r\n            itemList.appendChild(listItem);\r\n        });\r\n    }\r\n}\r\n\r\n// Function to update the total RP (for browser)\r\nfunction updateTotalRP(totalRP) {\r\n    if (typeof window !== 'undefined') {\r\n        document.getElementById('totalRPValue').textContent = totalRP.toFixed(0);\r\n    }\r\n}\r\n\r\n// Function to calculate VP (for browser)\r\nfunction calculateVP() {\r\n    if (typeof window !== 'undefined') {\r\n        let vpNeeded = totalRP;\r\n        let selectedPackages = [];\r\n        let totalCost = 0;\r\n        const selectedCurrency = document.getElementById('currency').value;\r\n\r\n        for (let i = vpPackages.length - 1; i >= 0; i--) {\r\n            while (vpNeeded >= vpPackages[i].vp) {\r\n                vpNeeded -= vpPackages[i].vp;\r\n                selectedPackages.push(vpPackages[i]);\r\n                totalCost += vpPackages[i].costs[selectedCurrency];\r\n            }\r\n        }\r\n\r\n        if (vpNeeded > 0) {\r\n            selectedPackages.push(vpPackages[0]);\r\n            totalCost += vpPackages[0].costs[selectedCurrency];\r\n        }\r\n\r\n        updateTotalVP(selectedPackages);\r\n        updateVPPackages(selectedPackages, totalCost, selectedCurrency);\r\n    }\r\n}\r\n\r\n// Function to update total VP (for browser)\r\nfunction updateTotalVP(packages) {\r\n    if (typeof window !== 'undefined') {\r\n        const totalVP = packages.reduce((total, pkg) => total + pkg.vp, 0);\r\n        document.getElementById('totalVPValue').textContent = totalVP.toFixed(2);\r\n    }\r\n}\r\n\r\n// Function to update VP packages display (for browser)\r\nfunction updateVPPackages(packages, totalCost, currency) {\r\n    if (typeof window !== 'undefined') {\r\n        const vpPackagesDiv = document.getElementById('vpPackages');\r\n        vpPackagesDiv.innerHTML = '';\r\n\r\n        packages.forEach(pkg => {\r\n            const packageElement = document.createElement('p');\r\n            packageElement.textContent = `${pkg.vp} VP - ${currency} ${pkg.costs[currency].toFixed(2)}`;\r\n            vpPackagesDiv.appendChild(packageElement);\r\n        });\r\n\r\n        const totalCostElement = document.createElement('p');\r\n        totalCostElement.innerHTML = `Total Cost: <span class=\"total-cost\">${currency} ${totalCost.toFixed(2)}</span>`;\r\n        vpPackagesDiv.appendChild(totalCostElement);\r\n    }\r\n}\r\n\r\n// Function to reset the calculator (for browser)\r\nfunction resetCalculator() {\r\n    if (typeof window !== 'undefined') {\r\n        items = [];\r\n        totalRP = 0;\r\n        updateItemList();\r\n        updateTotalRP(0);\r\n        updateVPPackages([], 0, 'USD'); // Assuming USD is default\r\n    }\r\n}\r\n\r\n// Function to send feedback to Discord via webhook\r\nasync function sendFeedback(feedback) {\r\n    const webhookURL = window.env.DISCORD_WEBHOOK_URL;\r\n\r\n    try {\r\n        if (!webhookURL) {\r\n            throw new Error('Webhook URL is not defined.');\r\n        }\r\n\r\n        const response = await fetch(webhookURL, {\r\n            method: 'POST',\r\n            headers: {\r\n                'Content-Type': 'application/json'\r\n            },\r\n            body: JSON.stringify({ content: `**User Feedback:** ${feedback}` })\r\n        });\r\n\r\n        if (response.ok) {\r\n            console.log('Feedback sent successfully');\r\n        } else {\r\n            console.error('Error sending feedback:', response.statusText);\r\n        }\r\n    } catch (error) {\r\n        console.error('Error sending feedback:', error.message);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://riot-points-calculator/./rp_calculator.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./rp_calculator.js"]();
/******/ 	
/******/ })()
;
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development', // Or 'production'
    entry: './rp_calculator.js', // Adjust entry point as per your setup
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // Output directory path
    },
    plugins: [
        new Dotenv({
            path: './.env', // Path to your .env file
            safe: true, // Load only variables that match defined schema
            systemvars: true, // Load all the predefined 'process.env' variables
            defaults: false // Do not override 'process.env' variables
        })
    ]
};

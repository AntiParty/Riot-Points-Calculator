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
      path: './.env',
      safe: true,
      systemvars: true
    })
  ]
};

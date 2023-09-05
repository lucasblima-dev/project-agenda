const path = require('path');

module.exports = {
  mode: 'development', //production
  entry: './frontend/main.js',
  /*entry: ['core-js/stable', 'regenerator-runtime/runtime', './frontend/main.js']*/ 
  //Essa opção torna obsoleta a escolha pela importação via arquivo ".js" principal
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  devtool: 'source-map'
};

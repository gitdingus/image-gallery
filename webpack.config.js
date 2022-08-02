const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /template\.html$/i,
        type: 'asset/source',
      },
      {
        test: /\.(jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ],
  },
};

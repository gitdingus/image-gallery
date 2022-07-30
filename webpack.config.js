const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    type: {
      library: 'umd',
    },
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
        test: /template\.html$/,
        type: 'asset/source',
      },
    ],
  },
};

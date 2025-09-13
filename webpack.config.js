const path = require('path');
const webpack = require('webpack');

let keys;
try {
  keys = require("./keys.ts");
} catch (err) {
  try {
    keys = require("./keys.js");
  } catch {
    keys = { GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || "" };
  }
}

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(keys.GOOGLE_MAPS_API_KEY),
    }),
  ],
};
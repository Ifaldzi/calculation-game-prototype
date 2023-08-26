/* eslint-disable @typescript-eslint/no-var-requires */
const CopyPlugin = require('copy-webpack-plugin');
// import CopyPlugin from 'copy-webpack-plugin';
const path = require('path');
// import path from 'path';

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    filename: 'index.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './public' },
        { from: 'src/Configs/config.cfg', to: 'Configs' },
      ],
    }),
  ],
};

const path = require('path')
const ROOT_DIR = path.resolve(__dirname, './')

const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const mocker = require('api-mocker-middleware')

const ExtractTextPlugin = require("extract-text-webpack-plugin")
const ASSET_PATH = process.env.ASSET_PATH || './src'

function getFileAbsolutePath(filePath) {
  return path.resolve(ROOT_DIR, filePath)
}

module.exports = {
	entry: './src/index.js',
  output: {
    path: path.join(__dirname, './src'),
    filename: './src/bundle.js',
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html'
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:7925'
    }),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dome'
    }),
    new ExtractTextPlugin({
      filename: "[name].[contenthash].css",
      disable: process.env.NODE_ENV === "development"
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loaders: 'babel-loader'
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loaders: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    before(app) {
      mocker(app, {path: getFileAbsolutePath('./mock')});
    }
  }
}
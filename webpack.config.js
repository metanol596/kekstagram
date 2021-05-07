const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
  context: path.resolve(__dirname, 'source'),
  mode: 'development',
  entry: './js/main.js',
  devtool: 'source-map',
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    assetModuleFilename: 'img/[name][ext][query]'
  },
  devServer: {
		contentBase: path.resolve(__dirname, 'build/'),
		open: true,
		compress: true,
		hot: true,
		port: 3000,
	},
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'source/index.html'),
			filename: 'index.html',
			minify: {
        collapseWhitespace: isProd,
			}
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'source/img'), to: path.resolve(__dirname, 'build/img') },
        { from: path.resolve(__dirname, 'source/photos'), to: path.resolve(__dirname, 'build/photos') },
        { from: path.resolve(__dirname, 'source/fonts'), to: path.resolve(__dirname, 'build/fonts') },
      ]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.css$/i,
				use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            }
          },
          'css-loader',
        ],
      },
      {
        test: /\.(|png|jpg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(|woff2|woff)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './fonts/[name].[ext]',
              publicPath: '../'
            },
          },
        ],
      },
    ]
  }
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devServer: {
    contentBase: __dirname + '/deploy/dist',
    inline: true,
    hot: true,
    host: 'localhost',
    port: 3000
  },
  entry: [
    './src/index.js',
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'deploy/dist'),
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              useRelativePath: true,
              limit: 10000
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      minify: false,
      template: './index.html',
    }),
  ],
};

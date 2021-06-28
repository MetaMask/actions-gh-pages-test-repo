const path = require('path');
const fs = require('fs');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST = path.resolve(__dirname, 'public');

// eslint-disable-next-line node/no-sync
const appDirectory = fs.realpathSync(process.cwd(), 'utf8');
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
// eslint-disable-next-line import/no-dynamic-require
const prefix = require(resolveApp('package.json')).homepage;

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: DIST,
    publicPath: DIST,
  },
  devServer: {
    contentBase: DIST,
    port: 9011,
    writeToDisk: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      publicPath: prefix,
    }),
    new NodePolyfillPlugin({
      excludeAliases: ['stream', 'buffer'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/u,
        use: 'ts-loader',
        exclude: /node_modules/u,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      // eslint-disable-next-line node/no-extraneous-require
      buffer: require.resolve('buffer-browserify'),
    },
  },
};

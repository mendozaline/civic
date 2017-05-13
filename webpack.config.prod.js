/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack'); //
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { resolve } = require('path');
const WebpackMd5Hash = require('webpack-md5-hash');
// need to require.resolve to get absolute path
const babelLoader = require.resolve('babel-loader');

const commitSha = require('child_process').execSync('git rev-parse --short HEAD').toString().trim();
const { defaultConfig, composeConfig } = require('@hackoregon/webpacker');

const config = {
  resolve: {
    extensions: ['', '.js', '.json'],
  },
  devtool: 'source-map',
  target: 'web',
  output: {
    path: resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
  },
  plugins: [
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production'), __DEV__: false }),
    new HtmlWebpackPlugin({
      template: 'src/template.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
      commitSha,
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer],
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
    // new ManifestPlugin(),
    // new ChunkManifestPlugin({
    //   filename: 'chunk-manifest.json',
    //   manifestVariable: 'webpackManifest',
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // exclude: /node_modules/,
        include: resolve(__dirname, 'src'),
        loader: babelLoader,
        query: {
          presets: [
            'react',
            'stage-1',
            [
              'es2015', {
                modules: false,
              },
            ],
          ],
          plugins: ['transform-regenerator', 'transform-object-rest-spread', 'transform-es2015-destructuring', 'transform-class-properties', 'syntax-dynamic-import'],
        },
      },
// {
//         test: /\.svg(\?v=\d+.\d+.\d+)?$/,
//         loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]',
//       }
    ],
  },
};

const entry = {
  entry: {
    main: resolve(__dirname, 'src/client'),
    vendor: ['react', 'react-dom', 'react-helmet', 'react-redux', 'react-router'],
  },
};

module.exports = composeConfig(defaultConfig, config, entry);
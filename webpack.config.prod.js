var webpack             = require('webpack');
var HtmlWebpackPlugin   = require('html-webpack-plugin');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var ManifestPlugin      = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

module.exports = {
    devtool: 'hidden-source-map',

    entry: {
        app: [
            './src/index.js',
        ],
        vendor: [
            'react',
            'react-dom',
        ]
    },

    output: {
        path: __dirname + '/dist/',
        filename: '[name].[chunkhash].js',
        publicPath: '/',
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.svg'],
        modules: [
            'src',
            'node_modules',
        ],
    },

    module: {
        loaders: [
            {
                test: /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract("style", "css", "sass")
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }, {
                test: /\.(jpe?g|gif|png)$/i,
                loader: 'url-loader?limit=10000'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.svg?$/,
                loader: 'svg-sprite?name=[name]_[hash]!svgo'
            }
        ],
    },

    plugins: [
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: 'index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            },
            __DEVELOPMENT__: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.js',
        }),
        new ExtractTextPlugin('app.[chunkhash].css', { allChunks: true }),
        new ManifestPlugin({
            basePath: '/',
        }),
        new ChunkManifestPlugin({
            filename: "chunk-manifest.json",
            manifestVariable: "webpackManifest",
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            }
        }),
    ]
};

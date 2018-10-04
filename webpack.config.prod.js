var webpack             = require('webpack');
var HtmlWebpackPlugin   = require('html-webpack-plugin');
var ManifestPlugin      = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var path                = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
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
        extensions: ['*', '.js', '.jsx', '.svg'],
        modules: [
            'src',
            'node_modules',
        ],
    },

    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    { 
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            localIdentName: '[local]__[path][name]__[hash:base64:5]',
                            modules: true,
                            minimize: true,
                            sourceMap: false,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: loader => [
                                require('postcss-import')({
                                root: path.resolve(__dirname),
                                path: path.resolve(__dirname, 'src', 'styles'),
                                }),
                                require('postcss-mixins')(),
                                require('postcss-icss-values')(),
                                require('postcss-nesting')(),
                                require('precss')(),
                                require('postcss-color-function')(),
                                require('postcss-reporter')(),
                                require('postcss-discard-comments')(),
                                require('autoprefixer')({ flexbox: false }),
                            ],
                        }
                    }
                ]
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.(jpe?g|gif|png)$/i,
                use: { loader: 'url-loader?limit=10000' }
            }, {
                test: /\.json$/,
                use: { loader: 'json-loader' }
            }, {
                test: /\.svg?$/,
                use: { loader: 'svg-sprite-loader?name=[name]_[hash]!svgo' }
            },
            
        ],
    },

    optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
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
        new MiniCssExtractPlugin(),
        new ManifestPlugin({
            basePath: '/',
        }),
        new ChunkManifestPlugin({
            filename: "chunk-manifest.json",
            manifestVariable: "webpackManifest",
        }),
    ]
};

var webpack             = require('webpack');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',

    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/dev-server',
            './src/index.js'
        ],
        vendor: [
            'react',
            'react-dom',
        ],
    },

    output: {
        path: __dirname,
        pathinfo: true,
        filename: 'app.js',
        publicPath: '/',
    },

    resolve: {
        extensions: ['*', '.js', '.jsx', '.svg'],
        modules: [
            'src',
            'node_modules',
        ],
    },

    devServer: {
        stats: 'errors-only',
        historyApiFallback: {
            index: '/'
        }
    },

    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }, {
                test: /\.jsx?$/,
                exclude: [/node_modules/, /.+\.config.js/],
                use: { 
                    loader: 'babel-loader',
                    query: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                },
            }, {
                test: /\.(jpe?g|gif|png)$/i,
                use: { loader: 'url-loader?limit=10000' },
            }, {
                test: /\.json$/,
                use: { loader:  'json-loader' }
            }, {
                test: /\.svg?$/,
                use: { loader: 'svg-sprite-loader?name=[name]_[hash]' }
            }
        ],
    },

    plugins: [
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: 'index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
            CLIENT: JSON.stringify(true),
                'NODE_ENV': JSON.stringify('development')
            }
        }),
    ]
};

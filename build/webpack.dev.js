const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    getPath,
    getHtmlMinifierOpt,
    minHtmlBuffer,
    APP_DIR,
    DIST_DIR,
    PUBLIC_DIR,
    NODE_ENV,
} = require('./utils');

if (NODE_ENV !== 'development') {
    throw new Error('require NODE_ENV = development');
}

module.exports = {
    mode: NODE_ENV,
    entry: getPath('main.js', APP_DIR),
    output: {
        path: DIST_DIR,
    },
    module: {
        rules: [{
            test: /\.js$/,
            enforce: 'pre',
            exclude: /node_modules/,
            use: {
                // check coding style and reduce code smell
                loader: 'eslint-loader',
            },
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                // transform es6 to es5
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
        }, {
            test: /\.scss$/,
            use: [{
                // creates style nodes from JS strings
                loader: 'style-loader',
            }, {
                // translates CSS into CommonJS
                loader: 'css-loader',
                options: {
                    importLoaders: 2,
                },
            }, {
                // transform CSS
                loader: 'postcss-loader',
            }, {
                // compiles Sass to CSS
                loader: 'sass-loader',
                options: {
                    includePaths: [getPath('styles', APP_DIR)],
                },
            }],
        }],
    },
    plugins: [
        // remove all files in dist
        new CleanWebpackPlugin(['./*'], {
            root: DIST_DIR,
        }),
        // replace code
        new webpack.DefinePlugin({
            'ENV': {
                'name': JSON.stringify(NODE_ENV),
            },
        }),
        // copy files
        new CopyWebpackPlugin([{
            context: APP_DIR,
            from: 'components/**/*.html',
            transform: minHtmlBuffer,
        }, {
            context: APP_DIR,
            from: 'pages/**/*.html',
            transform: minHtmlBuffer,
        }, {
            context: PUBLIC_DIR,
            from: '.',
            to: getPath('public', DIST_DIR),
        }]),
        // create index.html
        new HtmlWebpackPlugin({
            template: getPath('index.html', APP_DIR),
            minify: getHtmlMinifierOpt(),
        }),
    ],
};

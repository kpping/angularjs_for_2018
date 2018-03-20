const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { LicenseWebpackPlugin } = require('license-webpack-plugin');
const {
    getPath,
    getHtmlMinifierOpt,
    minHtmlBuffer,
    APP_DIR,
    DIST_DIR,
    PUBLIC_DIR,
    NODE_ENV,
 } = require('./utils');

if (NODE_ENV !== 'production') {
    throw new Error('require NODE_ENV = production');
}

module.exports = {
    mode: NODE_ENV,
    entry: getPath('main.js', APP_DIR),
    output: {
        path: DIST_DIR,
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].bundle.js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                'otherjs': {
                    test: /node_modules\/(?!(@uirouter|angular))/,
                    chunks: 'initial',
                    name: 'otherjs',
                    enforce: true,
                },
                'angular': {
                    test: /node_modules\/angular/,
                    chunks: 'initial',
                    name: 'angular',
                    enforce: true,
                },
                '@uirouter': {
                    test: /node_modules\/@uirouter/,
                    chunks: 'initial',
                    name: '@uirouter',
                    enforce: true,
                },
                'common': {
                    test: /(?!(node_modules))/,
                    name: 'common',
                    minChunks: 2,
                    enforce: true,
                },
            },
        },
        runtimeChunk: true,
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                // transform es6 to es5
                loader: 'babel-loader',
            },
        }, {
            test: /\.scss$/,
            use: [{
                // extract style nodes from JS strings
                loader: MiniCssExtractPlugin.loader,
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
        // extract license out from code
        new LicenseWebpackPlugin({
            pattern: /^(MIT|ISC|BSD.*)$/,
            suppressErrors: true,
            perChunkOutput: false,
            outputFilename: `public/licenses0.txt`
        }),
        // extract style nodes from JS strings
        new MiniCssExtractPlugin(),
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

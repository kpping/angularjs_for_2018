const devCfg = require('./webpack.dev');
const { DIST_DIR } = require('./utils');
const webpack = require('webpack');

const cfg = Object.assign({}, devCfg, {
    devServer: {
        contentBase: DIST_DIR,
        hot: true,
    },
});
cfg.plugins = cfg.plugins.concat([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
]);
module.exports = cfg;

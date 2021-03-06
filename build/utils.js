const path = require('path');
const minHtmlStr = require('html-minifier').minify;

function getPath(relPath, context = __dirname) {
    return path.resolve(context, relPath);
}
exports.getPath = getPath;

function getHtmlMinifierOpt() {
    return {
        minimize: true,
        collapseWhitespace: true,
        conservativeCollapse: false,
        minifyCSS: true,
        minifyJS: true,
        attrs: false,
    };
}
exports.getHtmlMinifierOpt = getHtmlMinifierOpt;

function minHtmlBuffer(htmlBuf) {
    return minHtmlStr(htmlBuf.toString(), getHtmlMinifierOpt());
}
exports.minHtmlBuffer = minHtmlBuffer;

// directory
exports.ROOT_DIR = getPath('../');
exports.PUBLIC_DIR = getPath('../public');
exports.APP_DIR = getPath('../app');
exports.DIST_DIR = getPath('../dist');

exports.NODE_ENV = process.env.NODE_ENV || 'development';

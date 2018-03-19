const path = require('path');
const minHtmlStr = require('html-minifier').minify;

function getPath(relPath, context = __dirname) {
    return path.resolve(context, relPath);
}
exports.getPath = getPath;

function getHtmlMinifierOpt() {
    return {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
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

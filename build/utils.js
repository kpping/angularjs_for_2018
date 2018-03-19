const path = require('path');

function getPath(relPath, context = __dirname) {
    return path.resolve(context, relPath);
}
exports.getPath = getPath;

// directory
exports.ROOT_DIR = getPath('../');
exports.PUBLIC_DIR = getPath('../public');
exports.APP_DIR = getPath('../app');
exports.DIST_DIR = getPath('../dist');

exports.NODE_ENV = process.env.NODE_ENV || 'development';

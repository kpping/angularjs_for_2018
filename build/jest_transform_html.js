const { minHtmlBuffer } = require('./utils');

module.exports = {
    process(src) {
        return `module.exports='${minHtmlBuffer(src)}'`;
    },
};

module.exports = (ctx) => ({
    plugins: {
        'autoprefixer': true,
        'cssnano': ctx.env !== 'production'
            ? false
            : {
                discardComments: { removeAll: true },
                reduceIdents: false,
            },
    },
});

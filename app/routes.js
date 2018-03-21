// HACK: workaround for running app in nodejs without
// webpack env e.g. jest
// TODO: write jest transform instead of adding this snippet
if (!require.ensure) {
    require.ensure = (deps, cb) => cb(require);
}

export const routes = [{
    name: 'foo',
    url: '/foo',
    template: '<page-foo></page-foo>',
    loadScript: ($q) => {
        const deferred = $q.defer();
        require.ensure([], () => {
            deferred.resolve(require('./pages/foo/mod').moduleName);
        });
        return deferred.promise;
    },
}, {
    name: 'bar',
    url: '/bar',
    template: '<page-bar></page-bar>',
    loadScript: ($q) => {
        const deferred = $q.defer();
        require.ensure([], () => {
            deferred.resolve(require('./pages/bar/mod').moduleName);
        });
        return deferred.promise;
    },
}];

// HACK: work around for jest
if (ENV.name === 'test') {
    require.ensure = angular.noop;
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

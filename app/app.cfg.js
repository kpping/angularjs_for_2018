import { routes } from './routes';

function getLazyLoad(loadScript) {
    if (!loadScript) {
        return undefined;
    }

    return ($transition) => {
        // get native injector bacause
        // $transition.injector don't have loadNewModules
        const $injector = $transition.injector().get('$injector');

        // use $q to resolve after script is loaded
        const $q = $injector.get('$q');

        return loadScript($q).then(n => $injector.loadNewModules([n]));
    };
}

const DI = [
    '$compileProvider',
    '$locationProvider',
    '$stateProvider',
    '$urlRouterProvider',
];
export function config(
    $compileProvider,
    $locationProvider,
    $stateProvider,
    $urlRouterProvider,
) {
    $compileProvider.debugInfoEnabled(ENV.name === 'development');

    $locationProvider.html5Mode(false).hashPrefix('!');

    routes.forEach((r) => {
        const {
            name, url, template, loadScript,
        } = r;

        $stateProvider.state(name, {
            url,
            template,
            lazyLoad: getLazyLoad(loadScript),
        });
    });

    $urlRouterProvider.otherwise(routes.filter(r => r.defaultUrl).map(r => r.url)[0]);
}
config.$inject = DI;

import { moduleName } from './mod';

describe('<hello-popup>', () => {
    let $rootScope;
    let $compile;
    let $injector;

    beforeEach(() => {
        // load app mod in mock env
        angular.mock.module('app');

        // get mock tools
        angular.mock.inject((_$rootScope_, _$compile_, _$injector_) => {
            $rootScope = _$rootScope_;
            $compile = _$compile_;
            $injector = _$injector_;
        });

        // load component.hello-popup mod
        $injector.loadNewModules([moduleName]);
    });

    test('should bind ctrl.word, expect "hello"', () => {
        const jqEl = $compile('<hello-popup></hello-popup>')($rootScope);
        $rootScope.$digest();

        expect(jqEl.html()).toContain('hello');
    });
});

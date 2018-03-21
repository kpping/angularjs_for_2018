import { moduleName } from './mod';

describe('helloPopupSer', () => {
    let $injector;
    let helloPopupSer;

    beforeEach(() => {
        // load app mod in mock env
        angular.mock.module('app');

        // get mock tools
        angular.mock.inject((_$injector_) => {
            $injector = _$injector_;
        });

        // load component.hello-popup mod
        $injector.loadNewModules([moduleName]);

        helloPopupSer = $injector.get('helloPopupSer');
    });

    test('should show <hello-popup> modal, child of <body>', () => {
        helloPopupSer.showHelloPopup();

        const helloPopupJqEl = angular.element(document).find('body').find('hello-popup');

        expect(helloPopupJqEl[0]).toBeDefined();
    });
});

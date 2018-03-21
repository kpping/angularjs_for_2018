import { HelloPopupCtrl } from './ctrl';

describe('HelloPopupCtrl', () => {
    let $controller;

    beforeEach(() => {
        // create fake mod
        angular.module('fake', []).controller('HelloPopupCtrl', HelloPopupCtrl);

        // load fake mod in mock env
        angular.mock.module('fake');

        // get mock tools
        angular.mock.inject((_$controller_) => {
            $controller = _$controller_;
        });
    });

    test('should have closeHelloPopup function', () => {
        // mock passed $scope
        const $scope = {};

        // load registered ctrl
        const ctrl = $controller('HelloPopupCtrl', { $scope });

        expect(typeof ctrl.closeHelloPopup).toBe('function');
    });

    test('closeHelloPopup should call $scope.hideModal', () => {
        // mock passed $scope
        const mockHideModal = jest.fn();
        const $scope = { hideModal: mockHideModal };

        // load registered ctrl
        const ctrl = $controller('HelloPopupCtrl', { $scope });

        // action
        ctrl.closeHelloPopup();

        expect(mockHideModal).toBeCalled();
    });
});

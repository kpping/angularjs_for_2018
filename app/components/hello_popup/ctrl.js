const DI = [
    '$scope',
];
export class HelloPopupCtrl {
    constructor(...args) {
        args.forEach((di, index) => { this[DI[index]] = di; });
    }

    closeHelloPopup() {
        this.$scope.hideModal();
    }
}
HelloPopupCtrl.$inject = DI;

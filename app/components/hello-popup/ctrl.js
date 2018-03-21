const DI = [
    '$scope',
];
export class HelloPopupCtrl {
    constructor(...args) {
        args.forEach((di, index) => { this[DI[index]] = di; });

        this.word = 'hello';
    }

    closeHelloPopup() {
        this.$scope.hideModal();
    }
}
HelloPopupCtrl.$inject = DI;

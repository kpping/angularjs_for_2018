const DI = [
    'modalSer',
];
export class HelloPopupSer {
    constructor(...args) {
        args.forEach((di, index) => { this[DI[index]] = di; });
    }

    showHelloPopup() {
        return this.modalSer.showModal('<hello-popup class="popup-backdrop-1"></hello-popup>');
    }
}
HelloPopupSer.$inject = DI;

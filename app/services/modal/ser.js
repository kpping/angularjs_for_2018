import {
    getBodyJqEl,
    lockBody,
    unlockBody,
    cropBody,
    uncropBody,
} from './helper';

const DI = [
    '$rootScope',
    '$compile',
];
export class ModalSer {
    constructor(...args) {
        args.forEach((di, index) => { this[DI[index]] = di; });

        // used to generate unique modalId
        this.seqId = 0;

        // total displayed popup
        this.total = 0;

        // hashmap modalId: modalObj
        // used to hide modal
        this.modalObjStore = {};
    }

    generateModalId() {
        this.seqId += 1;
        return `modal_${this.seqId}`;
    }

    increaseTotal() {
        this.total += 1;
    }

    decreaseTotal() {
        this.total = Math.max(this.total - 1, 0);
    }

    createModalObj(htmlStr, modalData) {
        const modalId = this.generateModalId();
        const modalScope = this.createModalScope(modalId, modalData);
        const modalJqEl = this.$compile(htmlStr)(modalScope);

        return { modalId, modalScope, modalJqEl };
    }

    createModalScope(modalId, modalData) {
        const modalScope = angular.extend(this.$rootScope.$new(true), {
            hideModal: this.hideModal.bind(this, modalId),
            modalData,
        });

        modalScope.$on('$destroy', this.removeModalObj.bind(this, modalId));

        return modalScope;
    }

    removeModalObj(modalId) {
        this.decreaseTotal();

        const { modalJqEl } = this.modalObjStore[modalId];

        delete this.modalObjStore[modalId];

        modalJqEl.remove();

        this.cssUnlockUnCropBody();
    }

    cssUnlockUnCropBody() {
        if (this.total !== 0) { return; }
        unlockBody();
        uncropBody();
    }

    hideModal(modalId) {
        const modalObj = this.modalObjStore[modalId];
        if (modalObj) {
            modalObj.modalScope.$destroy();
        }
    }

    cssLockCropBody() {
        if (this.total !== 1) { return; }
        lockBody();
        cropBody();
    }

    showModal(htmlStr = '', modalData) {
        this.increaseTotal();

        const modalObj = this.createModalObj(htmlStr, modalData);
        const { modalId, modalJqEl } = modalObj;

        this.modalObjStore[modalId] = modalObj;

        getBodyJqEl().append(modalJqEl);

        this.cssLockCropBody();

        return this.hideModal.bind(this, modalId);
    }
}
ModalSer.$inject = DI;

import { greetOnInit } from './helpers';

const DI = [
    '$log',
    'helloPopupSer',
    '$timeout',
];
export class FooCtrl {
    constructor(...args) {
        args.forEach((di, index) => { this[DI[index]] = di; });

        greetOnInit(this.$log);
    }

    showHelloPopup() {
        this.$timeout(this.helloPopupSer.showHelloPopup(), 2000);
    }
}
FooCtrl.$inject = DI;

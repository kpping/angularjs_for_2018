import { greetOnInit } from './helpers';

const DI = [
    '$log',
];
export class BarCtrl {
    constructor(...args) {
        args.forEach((di, index) => { this[DI[index]] = di; });

        greetOnInit(this.$log.info);
    }
}
BarCtrl.$inject = DI;

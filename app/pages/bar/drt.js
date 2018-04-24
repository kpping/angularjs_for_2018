import { BarCtrl } from './ctrl';
import style from './style.scss';

const DI = [
    'cssModClassSer',
];
export class BarDrt {
    constructor(...args) {
        args.forEach((di, index) => { this[DI[index]] = di; });

        this.controller = BarCtrl;
        this.controllerAs = 'ctrl';
        this.restrict = 'E';
        this.scope = {};
        this.template = require('./t.html');
    }

    static getInstance(...args) {
        return new BarDrt(...args);
    }

    beforeCompile(scope) {
        this.cssModClassSer.register(scope, style);
    }

    compile() {
        return {
            pre: this.beforeCompile.bind(this),
        };
    }
}
BarDrt.getInstance.$inject = DI;

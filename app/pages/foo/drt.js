import { FooCtrl } from './ctrl';
import style from './style.scss';

const DI = [
    'cssModClassSer',
];
export class FooDrt {
    constructor(...args) {
        args.forEach((di, index) => { this[DI[index]] = di; });

        this.controller = FooCtrl;
        this.controllerAs = 'ctrl';
        this.restrict = 'E';
        this.scope = {};
        this.template = require('./t.html');
    }

    static getInstance(...args) {
        return new FooDrt(...args);
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
FooDrt.getInstance.$inject = DI;

import { LoremCtrl } from './ctrl';
import style from './style.scss';

const DI = [
    'cssModClassSer',
];
export class LoremDrt {
    constructor(...args) {
        args.forEach((di, index) => { this[DI[index]] = di; });

        this.controller = LoremCtrl;
        this.controllerAs = 'ctrl';
        this.restrict = 'E';
        this.scope = {};
        this.template = require('./t.html');
    }

    static getInstance(...args) {
        return new LoremDrt(...args);
    }

    beforeCompile(scope) {
        this.cssModClassSer.register(scope, style);
    }

    afterCompile(scope) {
        this.cssModClassSer.unregister(scope);
    }

    compile() {
        return {
            pre: this.beforeCompile.bind(this),
            post: this.afterCompile.bind(this),
        };
    }
}
LoremDrt.getInstance.$inject = DI;

import { HelloPopupCtrl } from './ctrl';
import style from './style.scss';

const DI = [
    'cssModClassSer',
];
export class HelloPopupDrt {
    constructor(...args) {
        args.forEach((di, index) => { this[DI[index]] = di; });

        this.controller = HelloPopupCtrl;
        this.controllerAs = 'ctrl';
        this.restrict = 'E';
        this.scope = false; // use modalScope
        this.template = require('./t.html');
    }

    static getInstance(...args) {
        return new HelloPopupDrt(...args);
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
HelloPopupDrt.getInstance.$inject = DI;

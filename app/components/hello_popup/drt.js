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
        this.templateUrl = 'components/hello_popup/t.html';
    }

    static getInstance(...args) {
        return new HelloPopupDrt(...args);
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
HelloPopupDrt.getInstance.$inject = DI;

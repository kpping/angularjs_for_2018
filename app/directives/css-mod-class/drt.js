import { CSS_MOD_OBJ } from './ser';

const DI = [];
export class CssModClassDrt {
    constructor(...args) {
        args.forEach((di, index) => { this[DI[index]] = di; });

        this.restrict = 'A';
    }

    static getInstance(...args) {
        return new CssModClassDrt(...args);
    }

    afterCompile(scope, jqEl, attr) {
        const cssModObj = scope[CSS_MOD_OBJ];
        const attrCssModClass = attr.cssModClass || '';
        const classList = attrCssModClass.split(' ');

        classList.forEach((c) => {
            jqEl.addClass(cssModObj[c]);
        });
    }

    compile() {
        return { post: this.afterCompile.bind(this) };
    }
}
CssModClassDrt.getInstance.$inject = DI;

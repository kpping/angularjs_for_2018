export const CSS_MOD_OBJ = 'CSS_MOD_OBJ';

const DI = [];
export class CssModClassSer {
    constructor(...args) {
        args.forEach((di, index) => { this[DI[index]] = di; });
    }

    register(scope, cssModObj) {
        scope[CSS_MOD_OBJ] = cssModObj;
    }

    unregister(scope) {
        delete scope[CSS_MOD_OBJ];
    }
}
CssModClassSer.$inject = DI;

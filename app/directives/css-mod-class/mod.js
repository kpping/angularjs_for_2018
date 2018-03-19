import camel from 'camel-case';
import { CssModClassDrt } from './drt';
import { CssModClassSer } from './ser';

export const moduleName = 'directive.css-mod-class';

angular.module(moduleName, [
]).directive(camel('css-mod-class'), CssModClassDrt.getInstance).service('cssModClassSer', CssModClassSer);

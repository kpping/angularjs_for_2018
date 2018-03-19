import camel from 'camel-case';
import { BarDrt } from './drt';
import { moduleName as LoremModuleName } from '../../components/lorem/mod';

export const moduleName = 'page.bar';

angular.module(moduleName, [
    LoremModuleName,
]).directive(camel(moduleName), BarDrt.getInstance);

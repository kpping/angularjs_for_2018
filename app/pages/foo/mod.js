import camel from 'camel-case';
import { FooDrt } from './drt';
import { moduleName as LoremModuleName } from '../../components/lorem/mod';
import { moduleName as HelloPopupModuleName } from '../../components/hello_popup/mod';

export const moduleName = 'page.foo';

angular.module(moduleName, [
    LoremModuleName,
    HelloPopupModuleName,
]).directive(camel(moduleName), FooDrt.getInstance);

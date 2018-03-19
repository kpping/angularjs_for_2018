import camel from 'camel-case';
import { HelloPopupDrt } from './drt';
import { HelloPopupSer } from './ser';

export const moduleName = 'component.hello_popup';

angular.module(moduleName, [
]).directive(camel('hello-popup'), HelloPopupDrt.getInstance).service('helloPopupSer', HelloPopupSer);

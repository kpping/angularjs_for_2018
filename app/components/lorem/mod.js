import camel from 'camel-case';
import { LoremDrt } from './drt';

export const moduleName = 'component.lorem';

angular.module(moduleName, [
]).directive(camel('lorem'), LoremDrt.getInstance);

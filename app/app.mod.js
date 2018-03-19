import './styles/global.scss';

import { config } from './app.cfg';
import { moduleName as ComponentsModuleName } from './components/components.mod';
import { moduleName as DirectivesModuleName } from './directives/directives.mod';
import { moduleName as ServicesModuleName } from './services/services.mod';

const moduleName = 'app';

// create app module
angular.module(moduleName, [
    'ngMessages',
    'ui.router',
    ComponentsModuleName,
    DirectivesModuleName,
    ServicesModuleName,
]).config(config);

// boostrap app module
angular.element(() => {
    angular.bootstrap(document, [moduleName]);
});

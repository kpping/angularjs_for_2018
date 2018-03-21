const angular = require('angular');
Object.defineProperty(window, 'angular', { value: angular });
Object.defineProperty(window, 'scrollTo', { value: angular.noop });

require('angular-mocks');

require('./app/main');

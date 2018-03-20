const angular = require('angular');
Object.defineProperty(window, 'angular', { value: angular });

require('angular-mocks');

require('./app/main');

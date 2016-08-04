(function() {
'use strict';

// Declare app level module which depends on views, and components
angular.module('jointJSApp', [
    'ngRoute',
    'jointJSApp.stencil',
    'jointJSApp.validator',
    'jointJSApp.inlineEdit',
    'jointJSApp.graphToSVG'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/stencil'});
}]);
})();
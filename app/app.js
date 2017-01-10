(function() {
'use strict';

// Declare app level module which depends on views, and components
angular.module('jointJSApp', [
    'ngRoute',
    'jointJSApp.stencil',
    'jointJSApp.validator',
    'jointJSApp.inlineEdit',
    'jointJSApp.graphToSVG',
    'jointJSApp.zoom'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/stencil'});
    SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function(toElement) {
        return toElement.getScreenCTM().inverse().multiply(this.getScreenCTM());
    };
}]);
})();
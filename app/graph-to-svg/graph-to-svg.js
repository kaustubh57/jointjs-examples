/**
 * Created by kaustubh on 7/12/16.
 */
(function() {
    'use strict';

    angular.module('jointJSApp.graphToSVG', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/graphToSVG', {
                templateUrl: 'graph-to-svg/graph-to-svg.html',
                controller: 'GraphToSVGCtrl'
            });
        }])

        .controller('GraphToSVGCtrl', [function() {
            graphToSVG();
        }]);

    var graphToSVG = function() {
        (function() {

            var graph = new joint.dia.Graph;
            var paper = new joint.dia.Paper({
                el: $('#paper-holder-create'),
                width: 400,
                height: 300,
                gridSize: 1,
                model: graph,
                interactive: false
            });

            var r = new joint.shapes.basic.Rect({
                position: { x: 50, y: 50 }, size: { width: 70, height: 40 },
                attrs: { rect: { fill: '#2ECC71' }, text: { text: 'rect', fill: 'black' } }
            });

            var c = new joint.shapes.basic.Circle({
                position: { x: 220, y: 170 }, size: { width: 80, height: 40 },
                attrs: { circle: { fill: '#9B59B6' }, text: { text: 'circle', fill: 'white' } }
            });

            var t = new joint.shapes.basic.Text({
                position: { x: 200, y: 70 },
                size: { width: 120, height: 60 },
                attrs: { text: { text: 'Text', fill: 'black' } }
            });

            graph.addCells([r, c, t]);

            paper.on('cell:mouseover', function(cellView, event, x, y) {
                cellView.$el[0].style.cursor = "default";
                return false;
            });

            paper.toSVG(function(svg) {
                var dataImageUri = 'data:image/svg+xml,' + encodeURIComponent(svg);
                $('#svgPreview').attr('src', dataImageUri);
            }, {preserveDimensions: true});
            $('#btn-open-svg').on('click', function() { paper.openAsSVG(); });
        }());
    };

})();
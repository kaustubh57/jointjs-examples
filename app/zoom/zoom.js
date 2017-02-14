(function() {
'use strict';

angular.module('jointJSApp.zoom', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/zoom', {
    templateUrl: 'zoom/zoom.html',
    controller: 'ZoomCtrl'
  });
}])

.controller('ZoomCtrl', [function() {
    zoom();
}]);

var zoom = function() {

    (function() {

        var graph = new joint.dia.Graph;
        var paper = new joint.dia.Paper({
            width: 300,
            height: 300,
            model: graph
        });

        var paperScroller = new joint.ui.PaperScroller({
            autoResizePaper: false,
            paper: paper
        });
        paperScroller.$el.css({
            width: 300,
            height: 300
        });

        $('#paper-holder-create-zoom').append(paperScroller.render().el);

        var r = new joint.shapes.basic.Rect({ 
            position: { x: 50, y: 50 }, size: { width: 70, height: 40 },
            attrs: { rect: { fill: '#2ECC71' }, text: { text: 'rect', fill: 'black' } }
        });

        graph.addCells([r]);

        $('#zoom-in').on('click', function() {
            var cells = graph.getElements();
            for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
                var cell =  cells[cellIndex];
                var cellSize = cell.get('size');
                cell.resize(cellSize.width*1.2, cellSize.height*1.2);
            }
        });

        $('#zoom-out').on('click', function() {
            var cells = graph.getElements();
            for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
                var cell =  cells[cellIndex];
                var cellSize = cell.get('size');
                cell.resize(cellSize.width*0.8, cellSize.height*0.8);
            }
        });

        $('#btn-center').on('click', function() {
            paperScroller.center();
        });

    }());
};
})();
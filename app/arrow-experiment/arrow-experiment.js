(function() {
'use strict';

angular.module('jointJSApp.arrowExperiment', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/arrowExperiment', {
    templateUrl: 'arrow-experiment/arrow-experiment.html',
    controller: 'ArrowExperimentCtrl'
  });
}])

.controller('ArrowExperimentCtrl', [function() {
    arrowExperiment();
}]);

var arrowExperiment = function() {
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#arrow-experiment'),
        width: 400,
        height: 300,
        gridSize: 1,
        model: graph
    });

    paper.on('cell:pointerup', function(cellView) {
        // We don't want a Halo for links.
        if (cellView.model instanceof joint.dia.Link) return;

        var halo = new joint.ui.Halo({ graph: graph, paper: paper, cellView: cellView });
        halo.render();
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

    $('#graph-json').html(udpateGraphJSONDiv(graph));

    graph.on('change', function() {
        udpateGraphJSONDiv(this);
    });

};

var udpateGraphJSONDiv = function(graph) {
    $('#graph-json').html(JSON.stringify(graph));
}
})();
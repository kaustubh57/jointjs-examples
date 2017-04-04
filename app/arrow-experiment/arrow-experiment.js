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

// Custom link view
joint.shapes.basic.ArrowLinkView = joint.dia.LinkView.extend({

    addVertex: function(vertex) {
        console.log("******** Custom vertex add method... START ********");
        var vertices = (this.model.get('vertices') || []).slice();
        console.log("Vertex count >>> " + vertices.length);
        // if (vertices.length >= 1) {
        //     return;
        // }
        joint.shapes.basic.ArrowLinkView.__super__.addVertex.apply(this, arguments);
        console.log("******** Custom vertex add method... END ********");
    }
});

var arrowExperiment = function() {
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#arrow-experiment'),
        width: 400,
        height: 300,
        gridSize: 1,
        model: graph,
        linkView: joint.shapes.basic.ArrowLinkView
        // interactive: { vertexAdd: false }
    });

    paper.on('cell:pointerup', function(cellView) {
        // We don't want a Halo for links.
        if (cellView.model instanceof joint.dia.Link) return;

        var halo = new joint.ui.Halo({ graph: graph, paper: paper, cellView: cellView });
        halo.render();
    });

    paper.on('cell:pointerdblclick', function(cellView, evt) {

        joint.ui.TextEditor.edit(evt.target, {
            cellView: cellView,
            // textProperty: 'attrs/text/text'
            // textProperty: 'content'
            textProperty: cellView.model instanceof joint.shapes.basic.TextBlock ? 'content' : 'attrs/text/text'
            // textProperty: cellView.model.isLink() ? 'labels/0/attrs/text/text' : 'content'
        });
    });

    paper.on('blank:pointerdown', function(cellView, evt) {
        joint.ui.TextEditor.close();
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
        // markup: '<g class="rotatable"><g class="scalable"></g><text/></g>',
        markup: '<g class="rotatable"><text/></g>',
        position: { x: 100, y: 70 },
        size: { width: 120, height: 60 },
        attrs: {
            text: { text: 'Text5', fill: 'black' },
            rect: {'fill-opacity':0, stroke:0}
        }
    });

    var textBlock = new joint.shapes.basic.TextBlock({
        markup: [
            '<g class="rotatable">',
            '<g class="scalable"><rect/></g>',
            '<text class="content"></text>',
            // '<text></text>',
            '</g>'
        ].join(''),
        position: { x: 200, y: 70 },
        size: { width: 120, height: 60 },
        attrs: {
            rect: {'fill-opacity':0, stroke:0}
        },
        content: 'Text Block 11'
    });

    var l = new joint.dia.Link({
        labelMarkup: [ // overriding the label markup adding the event attribute
            '<g class="label">',
            '<rect event="avoid-vertex-creation"/>',
            '<text event="avoid-vertex-creation"/>',
            '</g>'
        ].join(''),
        source: { id: r.id },
        target: { id: c.id },
        labels: [
            { position: .5, attrs: { text: { text: 'label' } } }
        ]
    });

    // graph.addCells([r, c, t, l]);
    graph.addCells([t, textBlock]);

    $('#graph-json').html(udpateGraphJSONDiv(graph));

    graph.on('change', function() {
        udpateGraphJSONDiv(this);
    });

};

var udpateGraphJSONDiv = function(graph) {
    $('#graph-json').html(JSON.stringify(graph));
}
})();
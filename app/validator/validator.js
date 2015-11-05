(function() {
'use strict';

angular.module('jointJSApp.validator', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/validator', {
    templateUrl: 'validator/validator.html',
    controller: 'ValidatorCtrl'
  });
}])

.controller('ValidatorCtrl', [function() {
    validator();
}]);

var validator = function() {

    (function() {

        var graph = new joint.dia.Graph;
        var paper = new joint.dia.Paper({
            el: $('#paper-holder-create'),
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

        // Below is an example showing how to use Validator and also some common validation functions.
        // -------------------------------------------------------------------------------------------
        var commandManager = new joint.dia.CommandManager({ graph: graph });
        var validator = new joint.dia.Validator({ commandManager: commandManager });

        // register validation functions
        validator.validate('change:position', clear);
        validator.validate('change:position', clearLog);
        // VALIDATION FUNCTIONS
        //-------------------
        // check whether an element being placed on empty paper
        function clear(err, command, next) {
            console.log('test clear... function');
            if (validateOverlap(command)) {
                var message = "validation on overlap";
                alert(message);
                return next(message); 
            }
        };
        
        function clearLog() {
            console.log('test... clear log...');
        };
        
        function validateOverlap(command) {
            // Parameter "command" contains all cells attributes (command.data.attributes) in case
            // it was added or removed to/from graph.
            // Otherwise (in case an attribute was changed) it keeps only changed attribute
            // (command.data.previous, command.data.next) - in order to know rest of the attributes
            // you have to get them from the graph.
            var t = command.data.attributes || graph.getCell(command.data.id).toJSON();
            var area = g.rect(t.position.x, t.position.y, t.size.width, t.size.height);
            return _.find(graph.getElements(), function (e) {
                var position = e.get('position');
                var size = e.get('size');
                return (e.id !== t.id && area.intersect(g.rect(position.x, position.y, size.width, size.height)));

            });
        }

    }());
};
})();
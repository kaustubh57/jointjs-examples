(function() {
'use strict';

angular.module('jointJSApp.inlineEdit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/inlineEdit', {
    templateUrl: 'inline-edit/inline-edit.html',
    controller: 'InlineEditCtrl'
  });
}])

.controller('InlineEditCtrl', [function() {
    inlineEdit();
}]);

var inlineEdit = function() {
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        model: graph,
        width: 1000,
        height: 600,
        gridSize: 1
    });
    
    $('#inlineEditField').append(paper.el);
    //document.body.appendChild(paper.el);
    var r = (new joint.shapes.basic.Rect({
        position: { x: 50, y: 80 },
        size: { width: 100, height: 80 },
        attrs: { text: { text: 'This is my long text that should automagically wrap.' } }
    })).addTo(graph);

    // Call wrap text right after we add this element to the graph so that
    // the text wrapping is applied immediately on this element.
    wrapText(r);

    paper.on('cell:pointerclick', function(view) {
        if (view.model.isLink()) return;
        var ft = new joint.ui.FreeTransform({ cellView: view });
        ft.render();
    });

    // Inline text editing setup.
    var ed;
    paper.on('cell:pointerdblclick', function(cellView, evt) {
        var text = joint.ui.TextEditor.getTextElement(evt.target);
        if (text) {
            if (ed) ed.remove(); // Remove old editor if there was one.
            ed = new joint.ui.TextEditor({ text: text });
            ed.render(paper.el);

            ed.on('text:change', function(newText) {
                // Set the new text to the property that you use to change text in your views.
                cellView.model.attr('text/text', newText);
                // See wrapText() for details on why we store the originalText property.
                cellView.model.prop('originalText', newText);
                wrapText(cellView.model);
            });
        }
    });

    function wrapText(cell) {
        var text = cell.prop('originalText') || cell.attr('text/text');
        // Store the original text, i.e. text before we apply the text breaking.
        // This is because the text breaking adds additional new line characters and
        // removes spaces if necessary.
        cell.prop('originalText', text);
        var lines = joint.util.breakText(text, { width: Math.max(10, cell.get('size').width) });
        cell.attr('text/text', lines);
    }
    graph.on('change:size', wrapText);
};
})();
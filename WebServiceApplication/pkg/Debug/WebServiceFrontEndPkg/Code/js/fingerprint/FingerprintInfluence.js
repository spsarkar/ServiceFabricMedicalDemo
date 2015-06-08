import $ from 'jquery'

(function($) {
    'use strict';

    function FingerprintInfluence(elem, params) {
        this.$elem = $(elem);

        this.fingerprintTree = params.fingerprintTree;
        this.treeView = params.fingerprintTree.treeView;
        this.fingerprintTree.selectedNodeChangingCallbacks.add(this.selectedNodeChanging.bind(this));
        this.fingerprintTree.selectedNodeChangedCallbacks.add(this.selectedNodeChanged.bind(this));
    };

    // use a prototype because that way every instance
    // can be extended at once, by anyone, to add new functionality

    FingerprintInfluence.prototype = {
        constructor: FingerprintInfluence,

        selectedNodeChanging: function(e) {
            var node = this.treeView.dataItem(e.node);
            this.createChart(node);
        },

        selectedNodeChanged: function(e) {            
        },
        
        rgb2hex: function (rgb){
            rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
            return (rgb && rgb.length === 4) ? '#' +
                ('0' + parseInt(rgb[1],10).toString(16)).slice(-2) +
                ('0' + parseInt(rgb[2],10).toString(16)).slice(-2) +
                ('0' + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
        },

        createChart: function(node) {
            var data = [];
            for (var i = 0; i < node.Children.length; i++)
            {
                var child = node.Children[i];
                if (child.IsEnabled && child.Index !== null)
                {
                    data.push({
                        category: child.Name,
                        value: child.Relevance,
                        color: this.rgb2hex(window.Fingerprint.getNodeColor(child.Index))
                    });
                }
            }
            this.$elem.empty();
            this.$elem.height(350).kendoChart({
                title: {
                    text: 'Feature influence'
                },
                legend: {
                   visible: false
                },
                seriesDefaults: {
                    labels: {
                        template: "#= kendo.format('{0:P0}', percentage) # - #= category #",
                        position: 'outsideEnd',
                        visible: true,
                        background: 'transparent',
                        align: 'column'
                    }
                },
                series: [{
                    type: 'donut',
                    data: data
                }],
                tooltip: {
                    visible: true,
                    template: "#= kendo.format('{0:P0}', percentage) # - #= category #"
                }
            });    
        }
    }

    // jQuery plugin
    $.fn.fingerprintInfluence = function(params) {

        return this.each(function() {

            var $this = $(this);
            if (!$this.data('FingerprintInfluence')) {
                $this.data('FingerprintInfluence', new FingerprintInfluence(this, params));
            }
        });
    };
}($));

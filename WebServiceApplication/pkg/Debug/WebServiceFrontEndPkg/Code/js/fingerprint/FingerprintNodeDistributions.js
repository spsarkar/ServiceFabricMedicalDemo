import $ from 'jquery'

(function($) {
    'use strict';

    function FingerprintDistributions(elem, params) {
        this.$elem = $(elem);

        this.fingerprintTree = params.fingerprintTree;
        this.treeView = params.fingerprintTree.treeView;
        this.fingerprintTree.selectedNodeChangingCallbacks.add(this.selectedNodeChanging.bind(this));
        this.fingerprintTree.selectedNodeChangedCallbacks.add(this.selectedNodeChanged.bind(this));
    };

    // use a prototype because that way every instance of a DateTimeWidget
    // can be extended at once, by anyone, to add new functionality

    FingerprintDistributions.prototype = {
        constructor: FingerprintDistributions,

        selectedNodeChanging: function(e) {
            var node = this.treeView.dataItem(e.node);
            console.info('Selecting: ' + node.id);
            $.ajax({
                url: this.fingerprintTree.params.baseUrl + '/distribution/' + 
                     this.fingerprintTree.params.dataset + '/' + this.fingerprintTree.params.id + '/' + node.id +
                     this.fingerprintTree.getDisabledQuery(),
                context: document.body
            }).done(function(data) {
                this.createChart(node, data);
            }.bind(this));
        },

        selectedNodeChanged: function(e) {
        },

        createChart: function(node, data) {

            var closestXValue = data.XAxis.reduce(function(prev, curr) {
                return (Math.abs(curr - node.Value) < Math.abs(prev - node.Value) ? curr : prev);
            });

            var xIndex = data.XAxis.indexOf(closestXValue);
            this.$elem.empty();
            this.$elem.kendoChart({
                chartArea: {
                    height: 350
                },
                seriesColors: ['blue', 'red'],
                seriesDefaults: {
                    type: 'area'
                },
                title: {
                    text: 'Distributions'
                },
                legend: {
                    position: 'bottom'
                },
                series: [
                    {
                        name: 'Control',
                        data: data.ControlValues
                    }, {
                        name: 'Positive',
                        data: data.PositiveValues
                    }
                ],
                categoryAxis: {
                    categories: data.XAxis,
                    labels: {
                        visible: true,
                        step: 10
                    },
                    majorGridLines: {
                        visible: true,
                        step: 10
                    },
                    majorTicks: {
                        visible: true,
                        step: 10,
                        size: 10
                    },
                    notes: {
                        data: [
                            {
                                value: Math.floor(xIndex),
                                label: {
                                    text: 'DSI\n' + node.Index.toFixed(2)
                                }
                            }
                        ],
                        line: {
                            length: 200,
                            width: 4,
                            color: '#444444'
                        },
                        icon: {
                            background: '#444444',
                            border: {
                                width: 2,
                                color: '#444444'
                            }
                        },
                        label: {
                            color: 'white',
                            font: '10px sans-serif'
                        }
                    }
                }
            });
        }
    }

    // jQuery plugin
    $.fn.fingerprintDistributions = function(params) {

        return this.each(function() {

            var $this = $(this);
            if (!$this.data('fingerprintDistributions')) {
                $this.data('fingerprintDistributions', new FingerprintDistributions(this, params));
            }
        });
    };
}($));

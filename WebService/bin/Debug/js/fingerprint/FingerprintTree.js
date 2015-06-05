import $ from 'jquery'
import kendo from 'kendo'

(function ($) {
    'use strict';

    var fingerprintNodeTemplate =
        '# \
        var index = new Number(item.Index); \
        var value = item.Value; \
        var relevance = new Number(item.Relevance); \
        if(isNaN(item.Value)==false)  { \
            value = new Number(item.Value); \
            value = value.toFixed(2) \
        } \
        # \
        # \
            var node = Fingerprint.createNode(item.Index, item.Relevance); \
        # \
        #= node # #: item.Name # (#= index.toFixed(2)#)';

    var FingerprintTree = function (elem, params) {
        this.$elem = $(elem);

        this.params = params;
        this.params.urlPath = '/fingerprint/' + this.params.dataset + '/' + this.params.id;
        this.disabled = [];

        this.treeData = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                    url: this.params.baseUrl + this.params.urlPath,
                    dataType: 'json'
                }
            },
            schema: {
                model: {
                    id: 'Name',
                    children: 'Children',
                    hasChildren: 'HasChildren'
                }
            }
        });

        var treeView = this.$elem.kendoTreeView({
            dataSource: this.treeData,
            loadOnDemand: false,
            dataTextField: 'Name',
            template: kendo.template(fingerprintNodeTemplate),
            dataBound: this.dataBound.bind(this),
            select: this.selectedNodeChanging.bind(this),
            change: this.selectedNodeChanged.bind(this),
            checkboxes: {
                checkChildren: true,
                template: '<input type="checkbox" checked />'
            },
            check: this.nodeChecked.bind(this)
        }).data('kendoTreeView');

        this.treeView = treeView;
        this.selectedNodeChangingCallbacks = $.Callbacks();
        this.selectedNodeChangedCallbacks = $.Callbacks();        
    };

    // use a prototype because that way every instance of a DateTimeWidget
    // can be extended at once, by anyone, to add new functionality

    FingerprintTree.prototype = {
        constructor: FingerprintTree,

        getByName: function(data, name) {

            for (var i = 0; i < data.length; i++) {
                if (data[i].Name === this.selectedItem.Name) {
                    return this.treeView.findByUid(data[i].uid);
                }
                else if (data[i].hasChildren) {
                    return this.getByName(data[i].children._data, name);
                }                
            }

            return null;
        },

        dataBound: function(e) {
            if (e.node === undefined) {
                this.treeView.expand('.k-first');
                this.setExpanded(this.expanded);
                if (this.selectedItem) {
                    var data = this.treeView.dataSource.data();
                    var select = this.getByName(data, this.selectedItem.Name);
                    if (select) {
                        this.treeView.select(select);
                        this.treeView.trigger("select", { 
                            node: select
                        });
                    }
                }
            }
        },

        updateId: function (id) {
            this.params.id = id;
            this.params.urlPath = '/fingerprint/' + this.params.dataset + '/' + this.params.id
            this.treeData.transport.options.read.url = this.params.baseUrl + this.params.urlPath;
            this.treeView.dataSource.read();
        },

        selectedNodeChanging: function (e) {
            this.selectedItem = this.treeView.dataItem(e.node);
            this.selectedNodeChangingCallbacks.fire(e);
        },

        selectedNodeChanged: function () {
            this.selectedNodeChangedCallbacks.fire();
        },

        getExpanded: function(){
            var self = this;
            var result = {};
            $(".k-item", this.$elem).each(function () {
                var item = self.treeView.dataItem(this);
                result[item.Name] = item.expanded;
            });

            return result;
        },

        setExpanded: function(expanded){
            var self = this;
            this.expanding = true;
            if (expanded) {
                $(".k-item", this.$elem).each(function () {
                    var item = self.treeView.dataItem(this);
                    if (item && expanded[item.Name]) {
                        self.treeView.expand(this);
                    }
                    if (item && !item.IsEnabled) {
                        var cb = $(this).find('[type=checkbox]').first();
                       // var cb = $(this).closest(':checkbox');
                        cb.click();
                    }
                });
            }

            this.expanding = false;

            /*$(".k-item", this.$elem).each(function () {
                var item = self.treeView.dataItem(this);
                if (item && item.IsEnabled) {
                    var cb = $(this).closest(':checkbox');
                    cb = cb;
                }
            });*/
        },

        updateDisabled: function(node) {
            var item = this.treeView.dataItem(node);
            if (!item.checked)
            {
                this.disabled.push(item.Name);
            } else {
                var index = $.inArray(item.Name, this.disabled);
                if (index > -1) {
                   this.disabled.splice(index, 1);
                }
            }
        },

        getDisabledQuery: function() {
            return this.disabled.length > 0 
                ? '?disabled=' + this.disabled.join("&disabled=")
                : '';
        },

        nodeChecked: function(e) {
            if (this.expanding) {
                return;
            }
            
            this.updateDisabled(e.node);

            this.params.urlPath = '/fingerprint/' + this.params.dataset + '/' + this.params.id
            this.treeData.transport.options.read.url = this.params.baseUrl + this.params.urlPath + this.getDisabledQuery();
            this.expanded = this.getExpanded();
            this.treeView.dataSource.read();
        }
    };

    // also, latch onto something to expose to the wider world
    window.FingerprintTree = FingerprintTree;

    // jQuery plugin
    $.fn.fingerprintTree = function (params) {

        return this.each(function () {

            var $this = $(this);

            // check if we'd already worked on this element
            // if not, new up a widget and store against the element
            if (!$this.data('fingerprintTree')) {
                $this.data('fingerprintTree', new FingerprintTree(this, params));
            }
        });
    };
}($));

var Fingerprint = (function () {
    'use strict';

    function getNodeColor(index) {
        if (index === null) {
            return 'rgba(192,192,192,1);';
        }

        if (Math.abs(index - 0.5) < 0.005) {
            return 'rgba(0,0,0,0);';
        }

        var r = Math.min(index * 510.0, 255.0);
        if (index >= 0.5) {
            r = 255;
        } else if (r < 0.0) {
            r = 0.0;
        }

        var b = Math.min((1.0 - index) * 510.0, 255);
        if (index <= 0.5) {
            b = 255;
        } else if (b < 0.0) {
            b = 0.0;
        }

        var g = Math.min(r, b);

        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);

        return 'rgba(' + r + ',' + g + ',' + b + ',1);';
    }

    function getNodeSize(relevance) {
        var height = 7.0 + (relevance * 18.0);
        var width = 7.0 + (relevance * 54.0);

        return 'width: ' + Math.ceil(width) + 'px; height: ' + Math.ceil(height) + 'px;';
    }

    function getNodeStyle(index, relevance) {
        if (relevance == 0) {
            index = null;
        }
        var bg = 'background-color: ' + getNodeColor(index);
        var size = getNodeSize(relevance);

        return bg + size;
    }

    function createNode(index, relevance) {
        var nodeStyle = getNodeStyle(index, relevance);
        return '<div class="fingerprint-node" style="' + nodeStyle + '"></div>';
    }

    return {
        createNode: createNode,
        getNodeColor: getNodeColor
    }
}());

window.Fingerprint = Fingerprint;

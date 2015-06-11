import riot from 'riot'
import $ from 'jquery'

import 'css/fingerprint.css'
import '../fingerprint/FingerprintTree.js'
import '../fingerprint/FingerprintNodeDistributions.js'
import '../fingerprint/FingerprintInfluence.js'

import './file-uploader.tag'

riot.tag('app-content',

    `<div class="container">
        <div class="row">
            <div class="col-sm-6">
                <div class="panel panel-default">
                    <div class="panel-heading">Image processing</div>
                    <div class="panel-body">
                        <div class="row">
                            <file-uploader file_uploader={opts.fileUploader}></file-uploader>
                            <div style="margin:0 0 10px" class="col-sm-12"></div>
                            <div style="margin:0 0 10px" class="col-sm-12"></div>
                            <div class="col-sm-12">
                                <div id="progress-bar-container" class="progress progress-striped active center-block" style="height:24px">
                                    <div id="progress-bar" class="progress-bar" style="width: 0%"></div>
                                </div>
                            </div>
                            <div class="col-xs-12">
                                <div id="files"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--div class="col-sm-6">
                <div class="panel panel-default">
                    <div class="panel-heading">Clinical data</div>
                    <div class="panel-body">
                        <div class="alert alert-info" role="alert">
                            This panel will eventually allow adding clinical data manually or
                            by selecting a preselected demo subject.
                        </div>
                    </div>
                </div>
            </div-->
            <div class="col-sm-6">
                <div class="panel panel-default">
                    <div class="panel-heading">Disease State Fingerprint</div>
                    <div class="panel-body">
                        <div class="fingeprint-container" style="height: 484px; overflow-y: scroll">
                            <div id="fingerprint">
                                <div class="alert alert-info" role="alert">
                                    Load and analyze an MRI to see DSF visualization.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
        <div class="row">
            <div class="col-sm-12">
                <div class="panel panel-default">
                    <div class="panel-heading">Disease State Index</div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <div id="distribution">
                                    <div class="alert alert-info" role="alert">
                                        Load and analyze an MRI to see DSI distributions.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div id="influence">
                                    <div class="alert alert-info" role="alert">
                                        Load and analyze an MRI to see DSI influence.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </div>`,

    function(opts) {
        var uploadButton = $('<button/>')
            .addClass('btn btn-primary')
            .text('Begin analysis')
            .on('click', function () {
                var $this = $(this),
                    data = $this.data();
                $this
                    .off('click')
                    .text('Abort')
                    .on('click', function () {
                        $this.remove();
                        data.abort();
                    });
                data.submit();
            });

        opts.fileUploader.on(opts.fileUploader.FILE_ADDED, (files) => {
             $('#files').append(uploadButton.clone(true).data(files));
        });

        opts.fileUploader.on(opts.fileUploader.FILE_PROGRESS, (data) => {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress-bar-container .progress-bar').css(
                'width',
                progress + '%'
            );
        });

        opts.fileUploader.on(opts.fileUploader.FILE_UPLOADED, (data) => {
            var $files = $('#files');
            $files.empty();
             $('#progress-bar-container .progress-bar').css(
                'width', '0%'
            );
 
            // Create fingerprint tree
            var fingerprint = $('#fingerprint').fingerprintTree({
                id: 14,
                dataset: 'ADNI',
                baseUrl: opts.config.apiBaseUrl
            }).data('fingerprintTree');

            // Create fingerprint distributions
            $('#distribution').fingerprintDistributions({
                fingerprintTree: fingerprint
            });     

            $('#distribution').html(
                '<div class="fingerprint-distributions-flash"><h3>Select a node to see the subject\'s' +
                ' data in relation to distributions of control and disease cases.</h3><p>In this example,' +
                ' the background data are mild cognitive impairment (MCI) subjects,some of which' +
                ' progressed to Alzheimer\'s disease within the next three years. Stable MCIs appear' +
                ' as blue distributions, progressive MCIs as red distributions.</p></div>');  

            $('#influence').empty();

            $('#influence').fingerprintInfluence({
                fingerprintTree: fingerprint
            });
        });
    }   
);

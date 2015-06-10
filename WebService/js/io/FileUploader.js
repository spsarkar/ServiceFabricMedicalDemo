import $ from 'jquery'
import riot from 'riot'
import 'blueimp-file-upload'

export default class FileUploader {
    constructor(config) {
        riot.observable(this);

        this.config = config;

        this.FILE_ADDED = 'file_added';
        this.FILE_PROGRESS = 'file_progress';
        this.FILE_UPLOADED = 'file_uploaded';        
    }

    apply($elem) {
        var self = this;
        $elem.fileupload({
            url: this.config.apiBaseUrl + '/analyze/Submit/upload',
            dataType: 'json',
            add: function(e, data) {
                self.trigger(self.FILE_ADDED, data);
            },
            progressall: function(e, data) {
                self.trigger(self.FILE_PROGRESS, data);
            },
            done: function(e, data) {
                self.trigger(self.FILE_UPLOADED, data);
            }
        }).prop('disabled', !$.support.fileInput)
          .parent()
          .addClass($.support.fileInput ? undefined : 'disabled');
    }
}

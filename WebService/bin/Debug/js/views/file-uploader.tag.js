import 'css/dragdrop.css'

import riot from 'riot'

riot.tag('file-uploader',

    `<div class="col-sm-12">
        <span class="btn btn-primary btn-file btn-block">
            Select a T1 MRI file for processing... <input id="file-upload" type="file" name="files[]" multiple="" accept=".nii.gz">
        </span>
    </div>`,

    function(opts) {
        this.parent.on('mount', () => {
            var $elem = $('#file-upload');
            opts.fileUploader.apply($elem);
        });
    }
);

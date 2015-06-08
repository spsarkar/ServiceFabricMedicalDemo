import 'css/cornerstone.css'

import riot from 'riot'

riot.tag('image-viewer',

    `<div class="col-sm-12">
        <div id="im1" data-index="0" style="width:384px;height:384px;background:#000000" class="cornerstone-enabled-image center-block" oncontextmenu="return false" unselectable='on' onselectstart='return false;' onmousedown='return false;'>
            <div class="topleft" style="position: absolute;top:7px; left:7px; color: #fff;line-height: 100%;">
            </div>
            <div class="topright" style="position: absolute;top:7px; right:7px; color: #fff;line-height: 100%;">
            </div>
            <div class="bottomright" style="position: absolute;bottom:7px; right:7px; color: #fff;line-height: 100%;">
            </div>
            <div class="bottomleft" style="position: absolute;bottom:7px; left:7px; color: #fff;line-height: 100%;">
            </div>
        </div>
    </div>`,

    function(opts) {
        this.parent.on('mount', function() {
            opts.imageViewer.apply($("#im1"));
                /*file.data.context = $('<button/>').text('Upload')
                        .appendTo($('#files'))
                        .click(function () {
                            image.data.context = $('<p/>').text('Uploading...').replaceAll($(this));
                            image.data.submit();
                });*/
        });
    }
)

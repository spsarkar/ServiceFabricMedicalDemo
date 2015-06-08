import riot from 'riot'
import cornerstone from '../../lib/cornerstone.js'
import cornerstoneTools from '../../lib/cornerstoneTools.js'

export default class ImageViewer {
    constructor() {
        riot.observable(this);
        cornerstone.imageCache.setMaximumSizeBytes(1000 * 1024 * 1024);
    }

    apply($element) {
        this.$element = $element;
        this.element = this.$element.get(0); 
        cornerstone.enable(this.element);
    }

    applyMouseControlsOnce() {
        cornerstoneTools.mouseInput.enable(this.element);
        cornerstoneTools.mouseWheelInput.enable(this.element);
        cornerstoneTools.wwwc.activate(this.element, 1);
        cornerstoneTools.pan.activate(this.element, 2); // pan is the default tool for middle mouse button
        cornerstoneTools.zoom.activate(this.element, 4); // zoom is the default tool for right mouse button

        this.$element.on('mousewheel DOMMouseScroll', e => {
            if (e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0) {
                this.prevSlice();
            } else {
                this.nextSlice();
            }
            return false;
        });

        ImageViewer.prototype.applyMouseControlsOnce = () => {};
    }

    show(image) {
        this.image = image;
        this.showCurrentSlice();
        this.applyMouseControlsOnce();
    }

    showCurrentSlice() {
        var imageId = this.image.getScheme() + '://' + this.image.slice;

        cornerstone.loadAndCacheImage(imageId).then(slice => {
            cornerstone.displayImage(this.element, slice);
        });
    }

    nextSlice() {
        if (this.image.slice < this.image.maxSlice) {
            this.image.slice += 1;
            this.showCurrentSlice();
        }
    }
    
    prevSlice() {
        if (this.image.slice > 0) {
            this.image.slice -= 1;
            this.showCurrentSlice();
        }
    }
}
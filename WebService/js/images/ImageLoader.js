import riot from 'riot'
import cornerstone from '../../lib/cornerstone.js'
import NiftiGzipUint8Image from './NiftiGzipUint8Image.js'

export default class ImageLoader {
    constructor() {
        riot.observable(this);
        cornerstone.registerImageLoader(NiftiGzipUint8Image.getScheme(), imageId => { 
            return this.loadImage(imageId);
        });

        this.IMAGE_LOADED = 'image_loaded';
    }

    loadImageFile(imageFile) {
        if (NiftiGzipUint8Image.isMatch(imageFile.name)) {
            this.image = new NiftiGzipUint8Image(imageFile);
            this.image.on(this.image.IMAGE_READY, (image) => {
                this.trigger(this.IMAGE_LOADED, image);
            });
        } else {
            throw 'Unsupported file format, expected .nii.gz file.';
        }
    }

    loadImage(imageId) {

        var slice = this.image.getSlice(imageId.slice(10));
        var image = {
            imageId: imageId,
            minPixelValue : 0,
            maxPixelValue : 257,
            slope: 1.0,
            intercept: 0,
            windowCenter : 127,
            windowWidth : 256,
            render: cornerstone.renderGrayscaleImage,
            getPixelData: () => slice,
            rows: 256,
            columns: 256,
            height: 256,
            width: 256,
            color: false,
            columnPixelSpacing: .8984375,
            rowPixelSpacing: .8984375,
            sizeInBytes: 256 * 256 * 2
        };

        // Data loader earlier, resolve immediately and return
        var deferred = $.Deferred();        
        deferred.resolve(image);
        return deferred;
    }
}
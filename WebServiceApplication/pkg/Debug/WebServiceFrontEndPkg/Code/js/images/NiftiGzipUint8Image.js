import riot from 'riot'
import pako from 'pako'

export default class NiftiGzipUint16Image {

    static getScheme(){
        return '.nii.gz';
    }

    getScheme() {
        return NiftiGzipUint16Image.getScheme();
    }

    static isMatch(fileName) {
        return fileName.match(/.nii.gz$/);
    }

    constructor(file) {
        riot.observable(this);

        if (!file.name.match(/.nii.gz$/)) {
            throw 'Unsupported file format, expected .nii.gz file.';
        }

        this.file = file;
        this.reader = new FileReader();
        this.reader.onloadend = (file) => this.fileLoaded(file);
        this.reader.readAsArrayBuffer(this.file);

        this.IMAGE_READY = 'image_ready';
    }

    fileLoaded(file) {
        this.data = pako.inflate(this.reader.result);
        this.slice = 60;
        this.maxSlice = 127;
        this.trigger(this.IMAGE_READY, this);
    }

    getSlice(slice) {
        var array = new Uint8Array(this.data.buffer, 348+(256*256*slice), 256*256);
        return array;
    }
}
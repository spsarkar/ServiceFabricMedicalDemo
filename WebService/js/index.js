import 'css/index.css'

import Config from './config/Config'
import ConnectionStatus from './connections/ConnectionStatus'
import FileUploader from './io/FileUploader'
import ImageLoader from './images/ImageLoader'
import ImageViewer from './images/ImageViewer'

var config = new Config();
var connectionStatus = new ConnectionStatus(config);
var fileUploader = new FileUploader(config);
var imageLoader = new ImageLoader();
var imageViewer = new ImageViewer();

fileUploader.on(fileUploader.FILE_ADDED, imageFile => {
    imageLoader.loadImageFile(imageFile.files[0]);
});

imageLoader.on(imageLoader.IMAGE_LOADED, image => {
    imageViewer.show(image);
});

import './views/app-header.tag'
import './views/app-content.tag'
import './views/app-footer.tag'

riot.mount('app-header', config.user);
riot.mount('app-content', { config, fileUploader, imageViewer });
riot.mount('app-footer', connectionStatus);

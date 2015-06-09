/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	__webpack_require__(11);
	
	var Config = _interopRequire(__webpack_require__(1));
	
	var ConnectionStatus = _interopRequire(__webpack_require__(2));
	
	var FileUploader = _interopRequire(__webpack_require__(3));
	
	var ImageLoader = _interopRequire(__webpack_require__(4));
	
	var ImageViewer = _interopRequire(__webpack_require__(5));
	
	var config = new Config();
	var connectionStatus = new ConnectionStatus(config);
	var fileUploader = new FileUploader(config);
	var imageLoader = new ImageLoader();
	var imageViewer = new ImageViewer();
	
	fileUploader.on(fileUploader.FILE_ADDED, function (imageFile) {
	    imageLoader.loadImageFile(imageFile.files[0]);
	});
	
	imageLoader.on(imageLoader.IMAGE_LOADED, function (image) {
	    imageViewer.show(image);
	});
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(8);
	
	riot.mount("app-header", config.user);
	riot.mount("app-content", { config: config, fileUploader: fileUploader, imageViewer: imageViewer });
	riot.mount("app-footer", connectionStatus);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var $ = _interopRequire(__webpack_require__(9));
	
	var User = _interopRequire(__webpack_require__(13));
	
	var Config = function Config() {
	    _classCallCheck(this, Config);
	
	    this.apiBaseUrl = $("meta[name=\"env:url:api\"]").attr("content");
	    this.agentBaseUrl = $("meta[name=\"env:url:agent\"]").attr("content");
	    this.user = new User();
	};
	
	module.exports = Config;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var riot = _interopRequire(__webpack_require__(10));
	
	var ConnectionStatus = function ConnectionStatus(config) {
	    _classCallCheck(this, ConnectionStatus);
	
	    riot.observable(this);
	    this.config = config;
	
	    this.apiMessage = "Pending...";
	    this.apiStatus = "warning";
	
	    this.agentMessage = "Pending...";
	    this.agentStatus = "warning";
	
	    this.CHANGED = "changed";
	    updateStatus(this);
	};
	
	module.exports = ConnectionStatus;
	
	function updateStatus(self) {
	    $.ajax({
	        type: "GET",
	        url: self.config.apiBaseUrl + "/analyze/ping/",
	    }).done(function (response) {
	        self.apiMessage = response.Name;
	        self.apiStatus = "success";
	    }).error(function () {
	        self.api = "Missing valid token, unable to call API";
	        self.apiStatus = "danger";
	    }).complete(function () {
	        self.trigger(self.CHANGED);
	    });
	
	    $.ajax({
	        type: "GET",
	        url: self.config.apiBaseUrl + "/analyze/ping/"
	    }).done(function (response) {
	        self.agentMessage = response;
	        self.agentStatus = "success";
	    }).error(function () {
	        self.agent = "Unable to call Agent.";
	        self.agentStatus = "danger";
	    }).complete(function () {
	        self.trigger(self.CHANGED);
	    });
	
	    setTimeout(function () {
	        return updateStatus(self);
	    }, 120000);
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var $ = _interopRequire(__webpack_require__(9));
	
	var riot = _interopRequire(__webpack_require__(10));
	
	__webpack_require__(32);
	
	var FileUploader = (function () {
	    function FileUploader(config) {
	        _classCallCheck(this, FileUploader);
	
	        riot.observable(this);
	
	        this.config = config;
	
	        this.FILE_ADDED = "file_added";
	        this.FILE_PROGRESS = "file_progress";
	        this.FILE_UPLOADED = "file_uploaded";
	    }
	
	    _createClass(FileUploader, {
	        apply: {
	            value: function apply($elem) {
	                var self = this;
	                $elem.fileupload({
	                    url: this.config.apiBaseUrl + "/analyze/upload",
	                    dataType: "json",
	                    beforeSend: function beforeSend(xhr) {
	                        xhr.setRequestHeader("Authorization", "Bearer " + self.config.user.idToken);
	                    },
	                    add: function add(e, data) {
	                        self.trigger(self.FILE_ADDED, data);
	                    },
	                    progressall: function progressall(e, data) {
	                        self.trigger(self.FILE_PROGRESS, data);
	                    },
	                    done: function done(e, data) {
	                        self.trigger(self.FILE_UPLOADED, data);
	                    }
	                }).prop("disabled", !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : "disabled");
	            }
	        }
	    });
	
	    return FileUploader;
	})();
	
	module.exports = FileUploader;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var riot = _interopRequire(__webpack_require__(10));
	
	var cornerstone = _interopRequire(__webpack_require__(14));
	
	var NiftiGzipUint8Image = _interopRequire(__webpack_require__(16));
	
	var ImageLoader = (function () {
	    function ImageLoader() {
	        var _this = this;
	
	        _classCallCheck(this, ImageLoader);
	
	        riot.observable(this);
	        cornerstone.registerImageLoader(NiftiGzipUint8Image.getScheme(), function (imageId) {
	            return _this.loadImage(imageId);
	        });
	
	        this.IMAGE_LOADED = "image_loaded";
	    }
	
	    _createClass(ImageLoader, {
	        loadImageFile: {
	            value: function loadImageFile(imageFile) {
	                var _this = this;
	
	                if (NiftiGzipUint8Image.isMatch(imageFile.name)) {
	                    this.image = new NiftiGzipUint8Image(imageFile);
	                    this.image.on(this.image.IMAGE_READY, function (image) {
	                        _this.trigger(_this.IMAGE_LOADED, image);
	                    });
	                } else {
	                    throw "Unsupported file format, expected .nii.gz file.";
	                }
	            }
	        },
	        loadImage: {
	            value: function loadImage(imageId) {
	
	                var slice = this.image.getSlice(imageId.slice(10));
	                var image = {
	                    imageId: imageId,
	                    minPixelValue: 0,
	                    maxPixelValue: 257,
	                    slope: 1,
	                    intercept: 0,
	                    windowCenter: 127,
	                    windowWidth: 256,
	                    render: cornerstone.renderGrayscaleImage,
	                    getPixelData: function () {
	                        return slice;
	                    },
	                    rows: 256,
	                    columns: 256,
	                    height: 256,
	                    width: 256,
	                    color: false,
	                    columnPixelSpacing: 0.8984375,
	                    rowPixelSpacing: 0.8984375,
	                    sizeInBytes: 256 * 256 * 2
	                };
	
	                // Data loader earlier, resolve immediately and return
	                var deferred = $.Deferred();
	                deferred.resolve(image);
	                return deferred;
	            }
	        }
	    });
	
	    return ImageLoader;
	})();
	
	module.exports = ImageLoader;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var riot = _interopRequire(__webpack_require__(10));
	
	var cornerstone = _interopRequire(__webpack_require__(14));
	
	var cornerstoneTools = _interopRequire(__webpack_require__(15));
	
	var ImageViewer = (function () {
	    function ImageViewer() {
	        _classCallCheck(this, ImageViewer);
	
	        riot.observable(this);
	        cornerstone.imageCache.setMaximumSizeBytes(1000 * 1024 * 1024);
	    }
	
	    _createClass(ImageViewer, {
	        apply: {
	            value: function apply($element) {
	                this.$element = $element;
	                this.element = this.$element.get(0);
	                cornerstone.enable(this.element);
	            }
	        },
	        applyMouseControlsOnce: {
	            value: function applyMouseControlsOnce() {
	                var _this = this;
	
	                cornerstoneTools.mouseInput.enable(this.element);
	                cornerstoneTools.mouseWheelInput.enable(this.element);
	                cornerstoneTools.wwwc.activate(this.element, 1);
	                cornerstoneTools.pan.activate(this.element, 2); // pan is the default tool for middle mouse button
	                cornerstoneTools.zoom.activate(this.element, 4); // zoom is the default tool for right mouse button
	
	                this.$element.on("mousewheel DOMMouseScroll", function (e) {
	                    if (e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0) {
	                        _this.prevSlice();
	                    } else {
	                        _this.nextSlice();
	                    }
	                    return false;
	                });
	
	                ImageViewer.prototype.applyMouseControlsOnce = function () {};
	            }
	        },
	        show: {
	            value: function show(image) {
	                this.image = image;
	                this.showCurrentSlice();
	                this.applyMouseControlsOnce();
	            }
	        },
	        showCurrentSlice: {
	            value: function showCurrentSlice() {
	                var _this = this;
	
	                var imageId = this.image.getScheme() + "://" + this.image.slice;
	
	                cornerstone.loadAndCacheImage(imageId).then(function (slice) {
	                    cornerstone.displayImage(_this.element, slice);
	                });
	            }
	        },
	        nextSlice: {
	            value: function nextSlice() {
	                if (this.image.slice < this.image.maxSlice) {
	                    this.image.slice += 1;
	                    this.showCurrentSlice();
	                }
	            }
	        },
	        prevSlice: {
	            value: function prevSlice() {
	                if (this.image.slice > 0) {
	                    this.image.slice -= 1;
	                    this.showCurrentSlice();
	                }
	            }
	        }
	    });
	
	    return ImageViewer;
	})();
	
	module.exports = ImageViewer;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var riot = _interopRequire(__webpack_require__(10));
	
	riot.tag("app-header", "<nav role=\"navigation\" class=\"navbar navbar-default\">\n        <div class=\"container\">\n            <div class=\"navbar-header\">\n                <button type=\"button\" data-target=\"#menu\" data-toggle=\"collapse\" class=\"navbar-toggle\">\n                    <span class=\"sr-only\">Toggle navigation</span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                </button>\n                <a href=\"#\" class=\"navbar-brand\">Service Fabric Multi Deployment Demo</a>\n            </div>\n            <div id=\"menu\" class=\"collapse navbar-collapse\">\n                <ul class=\"nav navbar-nav navbar-right\">\n                    <li><a href=\"#/profile\">Signed in as <span class=\"username\"></span></a></li>\n                    <li><a id=\"logout\" href=\"#\">Logout</a></li>\n                </ul>            \n            </div>\n        </div>\n    </nav>", function (user) {
	
	    this.on("mount", function () {
	        $(".username").html(user.profile.name);
	        $("#logout").on("click", function () {
	            user.logout();
	        });
	    });
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var riot = _interopRequire(__webpack_require__(10));
	
	var $ = _interopRequire(__webpack_require__(9));
	
	__webpack_require__(17);
	
	__webpack_require__(19);
	
	__webpack_require__(20);
	
	__webpack_require__(21);
	
	__webpack_require__(22);
	
	__webpack_require__(23);
	
	riot.tag("app-content", "<div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-sm-6\">\n                <div class=\"panel panel-default\">\n                    <div class=\"panel-heading\">Image processing</div>\n                    <div class=\"panel-body\">\n                        <div class=\"row\">\n                            <file-uploader file_uploader={opts.fileUploader}></file-uploader>\n                            <div style=\"margin:0 0 10px\" class=\"col-sm-12\"></div>\n                            <image-viewer image_viewer={opts.imageViewer}></image-viewer>\n                            <div style=\"margin:0 0 10px\" class=\"col-sm-12\"></div>\n                            <div class=\"col-sm-12\">\n                                <div id=\"progress-bar-container\" class=\"progress progress-striped active center-block\" style=\"height:24px\">\n                                    <div id=\"progress-bar\" class=\"progress-bar\" style=\"width: 0%\"></div>\n                                </div>\n                            </div>\n                            <div class=\"col-xs-12\">\n                                <div id=\"files\"></div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <!--div class=\"col-sm-6\">\n                <div class=\"panel panel-default\">\n                    <div class=\"panel-heading\">Clinical data</div>\n                    <div class=\"panel-body\">\n                        <div class=\"alert alert-info\" role=\"alert\">\n                            This panel will eventually allow adding clinical data manually or\n                            by selecting a preselected demo subject.\n                        </div>\n                    </div>\n                </div>\n            </div-->\n            <div class=\"col-sm-6\">\n                <div class=\"panel panel-default\">\n                    <div class=\"panel-heading\">Disease State Fingerprint</div>\n                    <div class=\"panel-body\">\n                        <div class=\"fingeprint-container\" style=\"height: 484px; overflow-y: scroll\">\n                            <div id=\"fingerprint\">\n                                <div class=\"alert alert-info\" role=\"alert\">\n                                    Load and analyze an MRI to see DSF visualization.\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>    \n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <div class=\"panel panel-default\">\n                    <div class=\"panel-heading\">Disease State Index</div>\n                    <div class=\"panel-body\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-6\">\n                                <div id=\"distribution\">\n                                    <div class=\"alert alert-info\" role=\"alert\">\n                                        Load and analyze an MRI to see DSI distributions.\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"col-sm-6\">\n                                <div id=\"influence\">\n                                    <div class=\"alert alert-info\" role=\"alert\">\n                                        Load and analyze an MRI to see DSI influence.\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>        \n    </div>", function (opts) {
	    var uploadButton = $("<button/>").addClass("btn btn-primary").text("Begin analysis").on("click", function () {
	        var $this = $(this),
	            data = $this.data();
	        $this.off("click").text("Abort").on("click", function () {
	            $this.remove();
	            data.abort();
	        });
	        data.submit();
	    });
	
	    opts.fileUploader.on(opts.fileUploader.FILE_ADDED, function (files) {
	        $("#files").append(uploadButton.clone(true).data(files));
	    });
	
	    opts.fileUploader.on(opts.fileUploader.FILE_PROGRESS, function (data) {
	        var progress = parseInt(data.loaded / data.total * 100, 10);
	        $("#progress-bar-container .progress-bar").css("width", progress + "%");
	    });
	
	    opts.fileUploader.on(opts.fileUploader.FILE_UPLOADED, function (data) {
	        var $files = $("#files");
	        $files.empty();
	        $("#progress-bar-container .progress-bar").css("width", "0%");
	
	        // Create fingerprint tree
	        var fingerprint = $("#fingerprint").fingerprintTree({
	            id: 14,
	            dataset: "ADNI",
	            baseUrl: opts.config.apiBaseUrl
	        }).data("fingerprintTree");
	
	        // Create fingerprint distributions
	        $("#distribution").fingerprintDistributions({
	            fingerprintTree: fingerprint
	        });
	
	        $("#distribution").html("<div class=\"fingerprint-distributions-flash\"><h3>Select a node to see the subject's" + " data in relation to distributions of control and disease cases.</h3><p>In this example," + " the background data are mild cognitive impairment (MCI) subjects,some of which" + " progressed to Alzheimer's disease within the next three years. Stable MCIs appear" + " as blue distributions, progressive MCIs as red distributions.</p></div>");
	
	        $("#influence").empty();
	
	        $("#influence").fingerprintInfluence({
	            fingerprintTree: fingerprint
	        });
	    });
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var riot = _interopRequire(__webpack_require__(10));
	
	riot.tag("app-footer", "<div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-sm-3\">\n                <h5>API access <span class=\"label label-{ apiStatus }\"> { apiMessage } </span></h5>\n            </div>\n            <div class=\"col-sm-3\">\n                <h5>Agent status <span class=\"label label-{ agentStatus }\"> { agentMessage } </span></h5>\n            </div>\n        </div>\n    </div>", function (connectionStatus) {
	    var _this = this;
	
	    this.updateConnectionStatus = function () {
	        this.apiMessage = connectionStatus.apiMessage;
	        this.apiStatus = connectionStatus.apiStatus;
	        this.agentMessage = connectionStatus.agentMessage;
	        this.agentStatus = connectionStatus.agentStatus;
	
	        this.update();
	    };
	
	    this.updateConnectionStatus();
	
	    connectionStatus.on(connectionStatus.CHANGED, function () {
	        _this.updateConnectionStatus();
	    });
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = jQuery;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = riot;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(24)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!C:\\Users\\Jussi\\Documents\\GitHub\\Combinostics.Demo\\src\\Combinostics.Demo.Web\\node_modules\\css-loader\\index.js!C:\\Users\\Jussi\\Documents\\GitHub\\Combinostics.Demo\\src\\Combinostics.Demo.Web\\css\\index.css", function() {
			var newContent = require("!!C:\\Users\\Jussi\\Documents\\GitHub\\Combinostics.Demo\\src\\Combinostics.Demo.Web\\node_modules\\css-loader\\index.js!C:\\Users\\Jussi\\Documents\\GitHub\\Combinostics.Demo\\src\\Combinostics.Demo.Web\\css\\index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(26)();
	exports.push([module.id, "html {\r\n    position: relative;\r\n    min-height: 100%;\r\n}\r\n\r\nbody {\r\n    /* Margin bottom by footer height */\r\n    margin-bottom: 60px;\r\n    background: ghostwhite; \r\n}\r\n\r\n.footer {\r\n  position: absolute;\r\n  bottom: 0;\r\n  width: 100%;\r\n  /* Set the fixed height of the footer here */\r\n  height: 60px;\r\n  background-color: #f5f5f5;\r\n}\r\n", ""]);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var jwt_decode = _interopRequire(__webpack_require__(34));
	
	var User = (function () {
	    function User() {
	        _classCallCheck(this, User);
	
	        this.idToken = getIdToken();
	        this.profile = jwt_decode(this.idToken);
	        this.expiryDate = new Date(this.profile.exp * 1000);
	    }
	
	    _createClass(User, {
	        logout: {
	            value: function logout() {
	                localStorage.removeItem("id_token");
	                window.location = "/logout";
	            }
	        }
	    });
	
	    return User;
	})();
	
	module.exports = User;
	
	function getIdToken() {
	    var idToken = localStorage.getItem("id_token");
	
	    if (!idToken || location.hash !== "") {
	        if (location.hash === "") {
	            $("body").append("<br/>No id_token, please get one.");
	        } else {
	            // Save the JWT token
	            var idToken = location.hash.slice(1);
	            localStorage.setItem("id_token", idToken);
	
	            // Remove ugly JWT token from URL
	            history.pushState("", document.title, window.location.pathname);
	        }
	    }
	
	    return idToken;
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*! cornerstone - v0.7.1 - 2015-02-24 | (c) 2014 Chris Hafey | https://github.com/chafey/cornerstone */
	"use strict";
	
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    function disable(element) {
	        if (element === undefined) {
	            throw "disable: element element must not be undefined";
	        }
	
	        // Search for this element in this list of enabled elements
	        var enabledElements = cornerstone.getEnabledElements();
	        for (var i = 0; i < enabledElements.length; i++) {
	            if (enabledElements[i].element === element) {
	                // We found it!
	
	                // Fire an event so dependencies can cleanup
	                var eventData = {
	                    element: element
	                };
	                $(element).trigger("CornerstoneElementDisabled", eventData);
	
	                // remove the child dom elements that we created (e.g.canvas)
	                enabledElements[i].element.removeChild(enabledElements[i].canvas);
	
	                // remove this element from the list of enabled elements
	                enabledElements.splice(i, 1);
	                return;
	            }
	        }
	    }
	
	    // module/private exports
	    cornerstone.disable = disable;
	
	    return cornerstone;
	})(cornerstone);
	/**
	 * This module is responsible for enabling an element to display images with cornerstone
	 */
	var cornerstone = (function ($, cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    /**
	     * sets a new image object for a given element
	     * @param element
	     * @param image
	     */
	    function displayImage(element, image, viewport) {
	        if (element === undefined) {
	            throw "displayImage: parameter element cannot be undefined";
	        }
	        if (image === undefined) {
	            throw "displayImage: parameter image cannot be undefined";
	        }
	
	        var enabledElement = cornerstone.getEnabledElement(element);
	
	        enabledElement.image = image;
	
	        if (enabledElement.viewport === undefined) {
	            enabledElement.viewport = cornerstone.getDefaultViewport(enabledElement.canvas, image);
	        }
	
	        // merge viewport
	        if (viewport) {
	            for (var attrname in viewport) {
	                if (viewport[attrname] !== null) {
	                    enabledElement.viewport[attrname] = viewport[attrname];
	                }
	            }
	        }
	
	        var now = new Date();
	        var frameRate;
	        if (enabledElement.lastImageTimeStamp !== undefined) {
	            var timeSinceLastImage = now.getTime() - enabledElement.lastImageTimeStamp;
	            frameRate = (1000 / timeSinceLastImage).toFixed();
	        } else {}
	        enabledElement.lastImageTimeStamp = now.getTime();
	
	        var newImageEventData = {
	            viewport: enabledElement.viewport,
	            element: enabledElement.element,
	            image: enabledElement.image,
	            enabledElement: enabledElement,
	            frameRate: frameRate
	        };
	
	        $(enabledElement.element).trigger("CornerstoneNewImage", newImageEventData);
	
	        cornerstone.updateImage(element);
	    }
	
	    // module/private exports
	    cornerstone.displayImage = displayImage;
	
	    return cornerstone;
	})($, cornerstone);
	/**
	 * This module is responsible for immediately drawing an enabled element
	 */
	
	var cornerstone = (function ($, cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    /**
	     * Immediately draws the enabled element
	     *
	     * @param element
	     */
	    function draw(element) {
	        var enabledElement = cornerstone.getEnabledElement(element);
	
	        if (enabledElement.image === undefined) {
	            throw "draw: image has not been loaded yet";
	        }
	
	        cornerstone.drawImage(enabledElement);
	    }
	
	    // Module exports
	    cornerstone.draw = draw;
	
	    return cornerstone;
	})($, cornerstone);
	/**
	 * This module is responsible for drawing an image to an enabled elements canvas element
	 */
	
	var cornerstone = (function ($, cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    /**
	     * Internal API function to draw an image to a given enabled element
	     * @param enabledElement
	     * @param invalidated - true if pixel data has been invalidated and cached rendering should not be used
	     */
	    function drawImage(enabledElement, invalidated) {
	
	        var start = new Date();
	
	        enabledElement.image.render(enabledElement, invalidated);
	
	        var context = enabledElement.canvas.getContext("2d");
	
	        var end = new Date();
	        var diff = end - start;
	        //console.log(diff + ' ms');
	
	        var eventData = {
	            viewport: enabledElement.viewport,
	            element: enabledElement.element,
	            image: enabledElement.image,
	            enabledElement: enabledElement,
	            canvasContext: context,
	            renderTimeInMs: diff
	        };
	
	        $(enabledElement.element).trigger("CornerstoneImageRendered", eventData);
	        enabledElement.invalid = false;
	    }
	
	    // Module exports
	    cornerstone.drawImage = drawImage;
	
	    return cornerstone;
	})($, cornerstone);
	/**
	 * This module is responsible for drawing invalidated enabled elements
	 */
	
	var cornerstone = (function ($, cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    /**
	     * Draws all invalidated enabled elements and clears the invalid flag after drawing it
	     */
	    function drawInvalidated() {
	        var enabledElements = cornerstone.getEnabledElements();
	        for (var i = 0; i < enabledElements.length; i++) {
	            var ee = enabledElements[i];
	            if (ee.invalid === true) {
	                cornerstone.drawImage(ee);
	            }
	        }
	    }
	
	    // Module exports
	    cornerstone.drawInvalidated = drawInvalidated;
	
	    return cornerstone;
	})($, cornerstone);
	/**
	 * This module is responsible for enabling an element to display images with cornerstone
	 */
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    function enable(element) {
	        if (element === undefined) {
	            throw "enable: parameter element cannot be undefined";
	        }
	
	        var canvas = document.createElement("canvas");
	        element.appendChild(canvas);
	
	        var el = {
	            element: element,
	            canvas: canvas,
	            image: undefined, // will be set once image is loaded
	            invalid: false, // true if image needs to be drawn, false if not
	            data: {}
	        };
	        cornerstone.addEnabledElement(el);
	
	        cornerstone.resize(element, true);
	
	        return element;
	    }
	
	    // module/private exports
	    cornerstone.enable = enable;
	
	    return cornerstone;
	})(cornerstone);
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    function getElementData(el, dataType) {
	        var ee = cornerstone.getEnabledElement(el);
	        if (ee.data.hasOwnProperty(dataType) === false) {
	            ee.data[dataType] = {};
	        }
	        return ee.data[dataType];
	    }
	
	    function removeElementData(el, dataType) {
	        var ee = cornerstone.getEnabledElement(el);
	        delete ee.data[dataType];
	    }
	
	    // module/private exports
	    cornerstone.getElementData = getElementData;
	    cornerstone.removeElementData = removeElementData;
	
	    return cornerstone;
	})(cornerstone);
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    var enabledElements = [];
	
	    function getEnabledElement(element) {
	        if (element === undefined) {
	            throw "getEnabledElement: parameter element must not be undefined";
	        }
	        for (var i = 0; i < enabledElements.length; i++) {
	            if (enabledElements[i].element == element) {
	                return enabledElements[i];
	            }
	        }
	
	        throw "element not enabled";
	    }
	
	    function addEnabledElement(enabledElement) {
	        if (enabledElement === undefined) {
	            throw "getEnabledElement: enabledElement element must not be undefined";
	        }
	
	        enabledElements.push(enabledElement);
	    }
	
	    function getEnabledElementsByImageId(imageId) {
	        var ees = [];
	        enabledElements.forEach(function (enabledElement) {
	            if (enabledElement.image && enabledElement.image.imageId === imageId) {
	                ees.push(enabledElement);
	            }
	        });
	        return ees;
	    }
	
	    function getEnabledElements() {
	        return enabledElements;
	    }
	
	    // module/private exports
	    cornerstone.getEnabledElement = getEnabledElement;
	    cornerstone.addEnabledElement = addEnabledElement;
	    cornerstone.getEnabledElementsByImageId = getEnabledElementsByImageId;
	    cornerstone.getEnabledElements = getEnabledElements;
	
	    return cornerstone;
	})(cornerstone);
	/**
	 * This module will fit an image to fit inside the canvas displaying it such that all pixels
	 * in the image are viewable
	 */
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    /**
	     * Adjusts an images scale and center so the image is centered and completely visible
	     * @param element
	     */
	    function fitToWindow(element) {
	        var enabledElement = cornerstone.getEnabledElement(element);
	        var defaultViewport = cornerstone.getDefaultViewport(enabledElement.canvas, enabledElement.image);
	        enabledElement.viewport.scale = defaultViewport.scale;
	        enabledElement.viewport.translation.x = defaultViewport.translation.x;
	        enabledElement.viewport.translation.y = defaultViewport.translation.y;
	        enabledElement.viewport.rotation = defaultViewport.rotation;
	        enabledElement.viewport.hflip = defaultViewport.hflip;
	        enabledElement.viewport.vflip = defaultViewport.vflip;
	        cornerstone.updateImage(element);
	    }
	
	    cornerstone.fitToWindow = fitToWindow;
	
	    return cornerstone;
	})(cornerstone);
	
	/**
	 * This module generates a lut for an image
	 */
	
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    /**
	     * Creates a LUT used while rendering to convert stored pixel values to
	     * display pixels
	     *
	     * @param image
	     * @returns {Array}
	     */
	    function generateLut(image, windowWidth, windowCenter, invert) {
	        if (image.lut === undefined) {
	            image.lut = new Int16Array(image.maxPixelValue - Math.min(image.minPixelValue, 0) + 1);
	        }
	        var lut = image.lut;
	
	        var maxPixelValue = image.maxPixelValue;
	        var minPixelValue = image.minPixelValue;
	        var slope = image.slope;
	        var intercept = image.intercept;
	        var localWindowWidth = windowWidth;
	        var localWindowCenter = windowCenter;
	
	        var modalityLutValue;
	        var voiLutValue;
	        var clampedValue;
	        var storedValue;
	
	        // NOTE: As of Nov 2014, most javascript engines have lower performance when indexing negative indexes.
	        // We improve performance by offsetting the pixel values for signed data to avoid negative indexes
	        // when generating the lut and then undo it in storedPixelDataToCanvasImagedata.  Thanks to @jpambrun
	        // for this contibution!
	
	        if (invert === true) {
	            for (storedValue = image.minPixelValue; storedValue <= maxPixelValue; storedValue++) {
	                modalityLutValue = storedValue * slope + intercept;
	                voiLutValue = ((modalityLutValue - localWindowCenter) / localWindowWidth + 0.5) * 255;
	                clampedValue = Math.min(Math.max(voiLutValue, 0), 255);
	                lut[storedValue + -minPixelValue] = Math.round(255 - clampedValue);
	            }
	        } else {
	            for (storedValue = image.minPixelValue; storedValue <= maxPixelValue; storedValue++) {
	                modalityLutValue = storedValue * slope + intercept;
	                voiLutValue = ((modalityLutValue - localWindowCenter) / localWindowWidth + 0.5) * 255;
	                clampedValue = Math.min(Math.max(voiLutValue, 0), 255);
	                lut[storedValue + -minPixelValue] = Math.round(clampedValue);
	            }
	        }
	    }
	
	    // Module exports
	    cornerstone.generateLut = generateLut;
	
	    return cornerstone;
	})(cornerstone);
	
	/**
	 * This module contains a function to get a default viewport for an image given
	 * a canvas element to display it in
	 *
	 */
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    /**
	     * Creates a new viewport object containing default values for the image and canvas
	     * @param canvas
	     * @param image
	     * @returns viewport object
	     */
	    function getDefaultViewport(canvas, image) {
	        if (canvas === undefined) {
	            throw "getDefaultViewport: parameter canvas must not be undefined";
	        }
	        if (image === undefined) {
	            throw "getDefaultViewport: parameter image must not be undefined";
	        }
	        var viewport = {
	            scale: 1,
	            translation: {
	                x: 0,
	                y: 0
	            },
	            voi: {
	                windowWidth: image.windowWidth,
	                windowCenter: image.windowCenter },
	            invert: image.invert,
	            pixelReplication: false,
	            rotation: 0,
	            hflip: false,
	            vflip: false
	        };
	
	        // fit image to window
	        var verticalScale = canvas.height / image.rows;
	        var horizontalScale = canvas.width / image.columns;
	        if (horizontalScale < verticalScale) {
	            viewport.scale = horizontalScale;
	        } else {
	            viewport.scale = verticalScale;
	        }
	        return viewport;
	    }
	
	    // module/private exports
	    cornerstone.getDefaultViewport = getDefaultViewport;
	
	    return cornerstone;
	})(cornerstone);
	
	/**
	 * This module returns a subset of the stored pixels of an image
	 */
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    /**
	     * Returns an array of stored pixels given a rectangle in the image
	     * @param element
	     * @param x
	     * @param y
	     * @param width
	     * @param height
	     * @returns {Array}
	     */
	    function getStoredPixels(element, x, y, width, height) {
	        if (element === undefined) {
	            throw "getStoredPixels: parameter element must not be undefined";
	        }
	
	        x = Math.round(x);
	        y = Math.round(y);
	        var ee = cornerstone.getEnabledElement(element);
	        var storedPixels = [];
	        var index = 0;
	        var pixelData = ee.image.getPixelData();
	        for (var row = 0; row < height; row++) {
	            for (var column = 0; column < width; column++) {
	                var spIndex = (row + y) * ee.image.columns + (column + x);
	                storedPixels[index++] = pixelData[spIndex];
	            }
	        }
	        return storedPixels;
	    }
	
	    /**
	     * Returns array of pixels with modality LUT transformation applied
	     */
	    function getPixels(element, x, y, width, height) {
	
	        var storedPixels = getStoredPixels(element, x, y, width, height);
	        var ee = cornerstone.getEnabledElement(element);
	        var slope = ee.image.slope;
	        var intercept = ee.image.intercept;
	
	        var modalityPixels = storedPixels.map(function (pixel) {
	            return pixel * slope + intercept;
	        });
	
	        return modalityPixels;
	    }
	
	    // module exports
	    cornerstone.getStoredPixels = getStoredPixels;
	    cornerstone.getPixels = getPixels;
	
	    return cornerstone;
	})(cornerstone);
	/**
	 * This module deals with caching images
	 */
	
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    var imageCache = {};
	
	    var cachedImages = [];
	
	    var maximumSizeInBytes = 1024 * 1024 * 1024; // 1 GB
	    var cacheSizeInBytes = 0;
	
	    function setMaximumSizeBytes(numBytes) {
	        if (numBytes === undefined) {
	            throw "setMaximumSizeBytes: parameter numBytes must not be undefined";
	        }
	        if (numBytes.toFixed === undefined) {
	            throw "setMaximumSizeBytes: parameter numBytes must be a number";
	        }
	
	        maximumSizeInBytes = numBytes;
	        purgeCacheIfNecessary();
	    }
	
	    function purgeCacheIfNecessary() {
	        // if max cache size has not been exceeded, do nothing
	        if (cacheSizeInBytes <= maximumSizeInBytes) {
	            return;
	        }
	
	        // cache size has been exceeded, create list of images sorted by timeStamp
	        // so we can purge the least recently used image
	        function compare(a, b) {
	            if (a.timeStamp > b.timeStamp) {
	                return -1;
	            }
	            if (a.timeStamp < b.timeStamp) {
	                return 1;
	            }
	            return 0;
	        }
	        cachedImages.sort(compare);
	
	        // remove images as necessary
	        while (cacheSizeInBytes > maximumSizeInBytes) {
	            var lastCachedImage = cachedImages[cachedImages.length - 1];
	            cacheSizeInBytes -= lastCachedImage.sizeInBytes;
	            delete imageCache[lastCachedImage.imageId];
	            lastCachedImage.imagePromise.reject();
	            cachedImages.pop();
	        }
	    }
	
	    function putImagePromise(imageId, imagePromise) {
	        if (imageId === undefined) {
	            throw "getImagePromise: imageId must not be undefined";
	        }
	        if (imagePromise === undefined) {
	            throw "getImagePromise: imagePromise must not be undefined";
	        }
	
	        if (imageCache.hasOwnProperty(imageId) === true) {
	            throw "putImagePromise: imageId already in cache";
	        }
	
	        var cachedImage = {
	            loaded: false,
	            imageId: imageId,
	            imagePromise: imagePromise,
	            timeStamp: new Date(),
	            sizeInBytes: 0
	        };
	
	        imageCache[imageId] = cachedImage;
	        cachedImages.push(cachedImage);
	
	        imagePromise.then(function (image) {
	            cachedImage.loaded = true;
	
	            if (image.sizeInBytes === undefined) {
	                throw "putImagePromise: image does not have sizeInBytes property or";
	            }
	            if (image.sizeInBytes.toFixed === undefined) {
	                throw "putImagePromise: image.sizeInBytes is not a number";
	            }
	            cachedImage.sizeInBytes = image.sizeInBytes;
	            cacheSizeInBytes += cachedImage.sizeInBytes;
	            purgeCacheIfNecessary();
	        });
	    }
	
	    function getImagePromise(imageId) {
	        if (imageId === undefined) {
	            throw "getImagePromise: imageId must not be undefined";
	        }
	        var cachedImage = imageCache[imageId];
	        if (cachedImage === undefined) {
	            return undefined;
	        }
	
	        // bump time stamp for cached image
	        cachedImage.timeStamp = new Date();
	        return cachedImage.imagePromise;
	    }
	
	    function removeImagePromise(imageId) {
	        if (imageId === undefined) {
	            throw "removeImagePromise: imageId must not be undefined";
	        }
	        var cachedImage = imageCache[imageId];
	        if (cachedImage === undefined) {
	            throw "removeImagePromise: imageId must not be undefined";
	        }
	        cachedImages.splice(cachedImages.indexOf(cachedImage), 1);
	        cacheSizeInBytes -= cachedImage.sizeInBytes;
	        delete imageCache[imageId];
	
	        return cachedImage.imagePromise;
	    }
	
	    function getCacheInfo() {
	        return {
	            maximumSizeInBytes: maximumSizeInBytes,
	            cacheSizeInBytes: cacheSizeInBytes,
	            numberOfImagesCached: cachedImages.length
	        };
	    }
	
	    function purgeCache() {
	        while (cachedImages.length > 0) {
	            var removedCachedImage = cachedImages.pop();
	            delete imageCache[removedCachedImage.imageId];
	            removedCachedImage.imagePromise.reject();
	        }
	        cacheSizeInBytes = 0;
	    }
	
	    // module exports
	
	    cornerstone.imageCache = {
	        putImagePromise: putImagePromise,
	        getImagePromise: getImagePromise,
	        removeImagePromise: removeImagePromise,
	        setMaximumSizeBytes: setMaximumSizeBytes,
	        getCacheInfo: getCacheInfo,
	        purgeCache: purgeCache
	    };
	
	    return cornerstone;
	})(cornerstone);
	
	/**
	 * This module deals with ImageLoaders, loading images and caching images
	 */
	
	var cornerstone = (function ($, cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    var imageLoaders = {};
	
	    var unknownImageLoader;
	
	    function loadImageFromImageLoader(imageId) {
	        var colonIndex = imageId.indexOf(":");
	        var scheme = imageId.substring(0, colonIndex);
	        var loader = imageLoaders[scheme];
	        var imagePromise;
	        if (loader === undefined || loader === null) {
	            if (unknownImageLoader !== undefined) {
	                imagePromise = unknownImageLoader(imageId);
	                return imagePromise;
	            } else {
	                return undefined;
	            }
	        }
	        imagePromise = loader(imageId);
	
	        // broadcast an image loaded event once the image is loaded
	        // This is based on the idea here: http://stackoverflow.com/questions/3279809/global-custom-events-in-jquery
	        imagePromise.then(function (image) {
	            $(cornerstone).trigger("CornerstoneImageLoaded", { image: image });
	        });
	
	        return imagePromise;
	    }
	
	    // Loads an image given an imageId and returns a promise which will resolve
	    // to the loaded image object or fail if an error occurred.  The loaded image
	    // is not stored in the cache
	    function loadImage(imageId) {
	        if (imageId === undefined) {
	            throw "loadImage: parameter imageId must not be undefined";
	        }
	
	        var imagePromise = cornerstone.imageCache.getImagePromise(imageId);
	        if (imagePromise !== undefined) {
	            return imagePromise;
	        }
	
	        imagePromise = loadImageFromImageLoader(imageId);
	        if (imagePromise === undefined) {
	            throw "loadImage: no image loader for imageId";
	        }
	
	        return imagePromise;
	    }
	
	    // Loads an image given an imageId and returns a promise which will resolve
	    // to the loaded image object or fail if an error occurred.  The image is
	    // stored in the cache
	    function loadAndCacheImage(imageId) {
	        if (imageId === undefined) {
	            throw "loadAndCacheImage: parameter imageId must not be undefined";
	        }
	
	        var imagePromise = cornerstone.imageCache.getImagePromise(imageId);
	        if (imagePromise !== undefined) {
	            return imagePromise;
	        }
	
	        imagePromise = loadImageFromImageLoader(imageId);
	        if (imagePromise === undefined) {
	            throw "loadAndCacheImage: no image loader for imageId";
	        }
	
	        cornerstone.imageCache.putImagePromise(imageId, imagePromise);
	
	        return imagePromise;
	    }
	
	    // registers an imageLoader plugin with cornerstone for the specified scheme
	    function registerImageLoader(scheme, imageLoader) {
	        imageLoaders[scheme] = imageLoader;
	    }
	
	    // Registers a new unknownImageLoader and returns the previous one (if it exists)
	    function registerUnknownImageLoader(imageLoader) {
	        var oldImageLoader = unknownImageLoader;
	        unknownImageLoader = imageLoader;
	        return oldImageLoader;
	    }
	
	    // module exports
	
	    cornerstone.loadImage = loadImage;
	    cornerstone.loadAndCacheImage = loadAndCacheImage;
	    cornerstone.registerImageLoader = registerImageLoader;
	    cornerstone.registerUnknownImageLoader = registerUnknownImageLoader;
	
	    return cornerstone;
	})($, cornerstone);
	/**
	 * This module contains a function to make an image is invalid
	 */
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    /**
	     * Sets the invalid flag on the enabled element and fire an event
	     * @param element
	     */
	    function invalidate(element) {
	        var enabledElement = cornerstone.getEnabledElement(element);
	        enabledElement.invalid = true;
	        var eventData = {
	            element: element
	        };
	        $(enabledElement.element).trigger("CornerstoneInvalidated", eventData);
	    }
	
	    // module exports
	    cornerstone.invalidate = invalidate;
	
	    return cornerstone;
	})(cornerstone);
	/**
	 * This module contains a function to immediately invalidate an image
	 */
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    /**
	     * Forces the image to be updated/redrawn for the specified enabled element
	     * @param element
	     */
	    function invalidateImageId(imageId) {
	
	        var enabledElements = cornerstone.getEnabledElementsByImageId(imageId);
	        enabledElements.forEach(function (enabledElement) {
	            cornerstone.drawImage(enabledElement, true);
	        });
	    }
	
	    // module exports
	    cornerstone.invalidateImageId = invalidateImageId;
	
	    return cornerstone;
	})(cornerstone);
	/**
	 * This module contains a helper function to covert page coordinates to pixel coordinates
	 */
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    /**
	     * Converts a point in the page coordinate system to the pixel coordinate
	     * system
	     * @param element
	     * @param pageX
	     * @param pageY
	     * @returns {{x: number, y: number}}
	     */
	
	    function pageToPixel(element, pageX, pageY) {
	        var ee = cornerstone.getEnabledElement(element);
	
	        if (ee.image === undefined) {
	            throw "image has not been loaded yet";
	        }
	
	        // TODO: replace this with a transformation matrix
	
	        // convert the pageX and pageY to the canvas client coordinates
	        var rect = element.getBoundingClientRect();
	        var clientX = pageX - rect.left - window.pageXOffset;
	        var clientY = pageY - rect.top - window.pageYOffset;
	
	        // translate the client relative to the middle of the canvas
	        var middleX = clientX - rect.width / 2;
	        var middleY = clientY - rect.height / 2;
	
	        // scale to image coordinates middleX/middleY
	        var viewport = ee.viewport;
	
	        // apply the scale
	        var widthScale = ee.viewport.scale;
	        var heightScale = ee.viewport.scale;
	        if (ee.image.rowPixelSpacing < ee.image.columnPixelSpacing) {
	            widthScale = widthScale * (ee.image.columnPixelSpacing / ee.image.rowPixelSpacing);
	        } else if (ee.image.columnPixelSpacing < ee.image.rowPixelSpacing) {
	            heightScale = heightScale * (ee.image.rowPixelSpacing / ee.image.columnPixelSpacing);
	        }
	
	        var scaledMiddleX = middleX / widthScale;
	        var scaledMiddleY = middleY / heightScale;
	
	        // apply pan offset
	        var imageX = scaledMiddleX - viewport.translation.x;
	        var imageY = scaledMiddleY - viewport.translation.y;
	
	        //Apply Flips       
	        if (viewport.hflip) {
	            imageX *= -1;
	        }
	
	        if (viewport.vflip) {
	            imageY *= -1;
	        }
	
	        //Apply rotations
	        if (viewport.rotation !== 0) {
	            var angle = viewport.rotation * Math.PI / 180;
	
	            var cosA = Math.cos(angle);
	            var sinA = Math.sin(angle);
	
	            var newX = imageX * cosA - imageY * sinA;
	            var newY = imageX * sinA + imageY * cosA;
	
	            if (viewport.rotation === 90 || viewport.rotation === 270 || viewport.rotation === -90 || viewport.rotation === -270) {
	                newX *= -1;
	                newY *= -1;
	            }
	
	            imageX = newX;
	            imageY = newY;
	        }
	
	        // translate to image top left
	        imageX += ee.image.columns / 2;
	        imageY += ee.image.rows / 2;
	
	        return {
	            x: imageX,
	            y: imageY
	        };
	    }
	
	    // module/private exports
	    cornerstone.pageToPixel = pageToPixel;
	
	    return cornerstone;
	})(cornerstone);
	
	/**
	 * This module is responsible for drawing an image to an enabled elements canvas element
	 */
	
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    var colorRenderCanvas = document.createElement("canvas");
	    var colorRenderCanvasContext;
	    var colorRenderCanvasData;
	
	    var lastRenderedImageId;
	    var lastRenderedViewport = {};
	
	    function initializeColorRenderCanvas(image) {
	        // Resize the canvas
	        colorRenderCanvas.width = image.width;
	        colorRenderCanvas.height = image.height;
	
	        // get the canvas data so we can write to it directly
	        colorRenderCanvasContext = colorRenderCanvas.getContext("2d");
	        colorRenderCanvasContext.fillStyle = "white";
	        colorRenderCanvasContext.fillRect(0, 0, colorRenderCanvas.width, colorRenderCanvas.height);
	        colorRenderCanvasData = colorRenderCanvasContext.getImageData(0, 0, image.width, image.height);
	    }
	
	    function getLut(image, viewport) {
	        // if we have a cached lut and it has the right values, return it immediately
	        if (image.lut !== undefined && image.lut.windowCenter === viewport.voi.windowCenter && image.lut.windowWidth === viewport.voi.windowWidth && image.lut.invert === viewport.invert) {
	            return image.lut;
	        }
	
	        // lut is invalid or not present, regenerate it and cache it
	        cornerstone.generateLut(image, viewport.voi.windowWidth, viewport.voi.windowCenter, viewport.invert);
	        image.lut.windowWidth = viewport.voi.windowWidth;
	        image.lut.windowCenter = viewport.voi.windowCenter;
	        image.lut.invert = viewport.invert;
	        return image.lut;
	    }
	
	    function doesImageNeedToBeRendered(enabledElement, image) {
	        if (image.imageId !== lastRenderedImageId || lastRenderedViewport.windowCenter !== enabledElement.viewport.voi.windowCenter || lastRenderedViewport.windowWidth !== enabledElement.viewport.voi.windowWidth || lastRenderedViewport.invert !== enabledElement.viewport.invert || lastRenderedViewport.rotation !== enabledElement.viewport.rotation || lastRenderedViewport.hflip !== enabledElement.viewport.hflip || lastRenderedViewport.vflip !== enabledElement.viewport.vflip) {
	            return true;
	        }
	
	        return false;
	    }
	
	    function getRenderCanvas(enabledElement, image, invalidated) {
	        // apply the lut to the stored pixel data onto the render canvas
	
	        if (enabledElement.viewport.voi.windowWidth === enabledElement.image.windowWidth && enabledElement.viewport.voi.windowCenter === enabledElement.image.windowCenter && enabledElement.viewport.invert === false) {
	            // the color image voi/invert has not been modified, request the canvas that contains
	            // it so we can draw it directly to the display canvas
	            return image.getCanvas();
	        } else {
	            if (doesImageNeedToBeRendered(enabledElement, image) === false && invalidated !== true) {
	                return colorRenderCanvas;
	            }
	
	            // If our render canvas does not match the size of this image reset it
	            // NOTE: This might be inefficient if we are updating multiple images of different
	            // sizes frequently.
	            if (colorRenderCanvas.width !== image.width || colorRenderCanvas.height != image.height) {
	                initializeColorRenderCanvas(image);
	            }
	
	            // get the lut to use
	            var colorLut = getLut(image, enabledElement.viewport);
	
	            // the color image voi/invert has been modified - apply the lut to the underlying
	            // pixel data and put it into the renderCanvas
	            cornerstone.storedColorPixelDataToCanvasImageData(image, colorLut, colorRenderCanvasData.data);
	            colorRenderCanvasContext.putImageData(colorRenderCanvasData, 0, 0);
	            return colorRenderCanvas;
	        }
	    }
	
	    /**
	     * API function to render a color image to an enabled element
	     * @param enabledElement
	     * @param invalidated - true if pixel data has been invaldiated and cached rendering should not be used
	     */
	    function renderColorImage(enabledElement, invalidated) {
	
	        if (enabledElement === undefined) {
	            throw "drawImage: enabledElement parameter must not be undefined";
	        }
	        var image = enabledElement.image;
	        if (image === undefined) {
	            throw "drawImage: image must be loaded before it can be drawn";
	        }
	
	        // get the canvas context and reset the transform
	        var context = enabledElement.canvas.getContext("2d");
	        context.setTransform(1, 0, 0, 1, 0, 0);
	
	        // clear the canvas
	        context.fillStyle = "black";
	        context.fillRect(0, 0, enabledElement.canvas.width, enabledElement.canvas.height);
	
	        // turn off image smooth/interpolation if pixelReplication is set in the viewport
	        if (enabledElement.viewport.pixelReplication === true) {
	            context.imageSmoothingEnabled = false;
	            context.mozImageSmoothingEnabled = false; // firefox doesn't support imageSmoothingEnabled yet
	        } else {
	            context.imageSmoothingEnabled = true;
	            context.mozImageSmoothingEnabled = true;
	        }
	
	        // save the canvas context state and apply the viewport properties
	        context.save();
	        cornerstone.setToPixelCoordinateSystem(enabledElement, context);
	
	        var renderCanvas = getRenderCanvas(enabledElement, image, invalidated);
	
	        context.drawImage(renderCanvas, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
	
	        context.restore();
	
	        lastRenderedImageId = image.imageId;
	        lastRenderedViewport.windowCenter = enabledElement.viewport.voi.windowCenter;
	        lastRenderedViewport.windowWidth = enabledElement.viewport.voi.windowWidth;
	        lastRenderedViewport.invert = enabledElement.viewport.invert;
	        lastRenderedViewport.rotation = enabledElement.viewport.rotation;
	        lastRenderedViewport.hflip = enabledElement.viewport.hflip;
	        lastRenderedViewport.vflip = enabledElement.viewport.vflip;
	    }
	
	    // Module exports
	    cornerstone.renderColorImage = renderColorImage;
	
	    return cornerstone;
	})(cornerstone);
	
	/**
	 * This module is responsible for drawing a grayscale imageß
	 */
	
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    var grayscaleRenderCanvas = document.createElement("canvas");
	    var grayscaleRenderCanvasContext;
	    var grayscaleRenderCanvasData;
	
	    var lastRenderedImageId;
	    var lastRenderedViewport = {};
	
	    function initializeGrayscaleRenderCanvas(image) {
	        // Resize the canvas
	        grayscaleRenderCanvas.width = image.width;
	        grayscaleRenderCanvas.height = image.height;
	
	        // NOTE - we need to fill the render canvas with white pixels since we control the luminance
	        // using the alpha channel to improve rendering performance.
	        grayscaleRenderCanvasContext = grayscaleRenderCanvas.getContext("2d");
	        grayscaleRenderCanvasContext.fillStyle = "white";
	        grayscaleRenderCanvasContext.fillRect(0, 0, grayscaleRenderCanvas.width, grayscaleRenderCanvas.height);
	        grayscaleRenderCanvasData = grayscaleRenderCanvasContext.getImageData(0, 0, image.width, image.height);
	    }
	
	    function getLut(image, viewport, invalidated) {
	        // if we have a cached lut and it has the right values, return it immediately
	        if (image.lut !== undefined && image.lut.windowCenter === viewport.voi.windowCenter && image.lut.windowWidth === viewport.voi.windowWidth && image.lut.invert === viewport.invert && invalidated !== true) {
	            return image.lut;
	        }
	
	        // lut is invalid or not present, regenerate it and cache it
	        cornerstone.generateLut(image, viewport.voi.windowWidth, viewport.voi.windowCenter, viewport.invert);
	        image.lut.windowWidth = viewport.voi.windowWidth;
	        image.lut.windowCenter = viewport.voi.windowCenter;
	        image.lut.invert = viewport.invert;
	        return image.lut;
	    }
	
	    function doesImageNeedToBeRendered(enabledElement, image) {
	        if (image.imageId !== lastRenderedImageId || lastRenderedViewport.windowCenter !== enabledElement.viewport.voi.windowCenter || lastRenderedViewport.windowWidth !== enabledElement.viewport.voi.windowWidth || lastRenderedViewport.invert !== enabledElement.viewport.invert || lastRenderedViewport.rotation !== enabledElement.viewport.rotation || lastRenderedViewport.hflip !== enabledElement.viewport.hflip || lastRenderedViewport.vflip !== enabledElement.viewport.vflip) {
	            return true;
	        }
	
	        return false;
	    }
	
	    function getRenderCanvas(enabledElement, image, invalidated) {
	        // apply the lut to the stored pixel data onto the render canvas
	
	        if (doesImageNeedToBeRendered(enabledElement, image) === false && invalidated !== true) {
	            return grayscaleRenderCanvas;
	        }
	
	        // If our render canvas does not match the size of this image reset it
	        // NOTE: This might be inefficient if we are updating multiple images of different
	        // sizes frequently.
	        if (grayscaleRenderCanvas.width !== image.width || grayscaleRenderCanvas.height != image.height) {
	            initializeGrayscaleRenderCanvas(image);
	        }
	
	        // get the lut to use
	        var lut = getLut(image, enabledElement.viewport, invalidated);
	        // gray scale image - apply the lut and put the resulting image onto the render canvas
	        cornerstone.storedPixelDataToCanvasImageData(image, lut, grayscaleRenderCanvasData.data);
	        grayscaleRenderCanvasContext.putImageData(grayscaleRenderCanvasData, 0, 0);
	        return grayscaleRenderCanvas;
	    }
	
	    /**
	     * API function to draw a grayscale image to a given enabledElement
	     * @param enabledElement
	     * @param invalidated - true if pixel data has been invaldiated and cached rendering should not be used
	     */
	    function renderGrayscaleImage(enabledElement, invalidated) {
	
	        if (enabledElement === undefined) {
	            throw "drawImage: enabledElement parameter must not be undefined";
	        }
	        var image = enabledElement.image;
	        if (image === undefined) {
	            throw "drawImage: image must be loaded before it can be drawn";
	        }
	
	        // get the canvas context and reset the transform
	        var context = enabledElement.canvas.getContext("2d");
	        context.setTransform(1, 0, 0, 1, 0, 0);
	
	        // clear the canvas
	        context.fillStyle = "black";
	        context.fillRect(0, 0, enabledElement.canvas.width, enabledElement.canvas.height);
	
	        // turn off image smooth/interpolation if pixelReplication is set in the viewport
	        if (enabledElement.viewport.pixelReplication === true) {
	            context.imageSmoothingEnabled = false;
	            context.mozImageSmoothingEnabled = false; // firefox doesn't support imageSmoothingEnabled yet
	        } else {
	            context.imageSmoothingEnabled = true;
	            context.mozImageSmoothingEnabled = true;
	        }
	
	        // save the canvas context state and apply the viewport properties
	        cornerstone.setToPixelCoordinateSystem(enabledElement, context);
	
	        var renderCanvas = getRenderCanvas(enabledElement, image, invalidated);
	
	        // Draw the render canvas half the image size (because we set origin to the middle of the canvas above)
	        context.drawImage(renderCanvas, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
	
	        lastRenderedImageId = image.imageId;
	        lastRenderedViewport.windowCenter = enabledElement.viewport.voi.windowCenter;
	        lastRenderedViewport.windowWidth = enabledElement.viewport.voi.windowWidth;
	        lastRenderedViewport.invert = enabledElement.viewport.invert;
	        lastRenderedViewport.rotation = enabledElement.viewport.rotation;
	        lastRenderedViewport.hflip = enabledElement.viewport.hflip;
	        lastRenderedViewport.vflip = enabledElement.viewport.vflip;
	    }
	
	    // Module exports
	    cornerstone.renderGrayscaleImage = renderGrayscaleImage;
	
	    return cornerstone;
	})(cornerstone);
	
	/**
	 * This module is responsible for drawing an image to an enabled elements canvas element
	 */
	
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    /**
	     * API function to draw a standard web image (PNG, JPG) to an enabledImage
	     *
	     * @param enabledElement
	     * @param invalidated - true if pixel data has been invaldiated and cached rendering should not be used
	     */
	    function renderWebImage(enabledElement, invalidated) {
	
	        if (enabledElement === undefined) {
	            throw "drawImage: enabledElement parameter must not be undefined";
	        }
	        var image = enabledElement.image;
	        if (image === undefined) {
	            throw "drawImage: image must be loaded before it can be drawn";
	        }
	
	        // get the canvas context and reset the transform
	        var context = enabledElement.canvas.getContext("2d");
	        context.setTransform(1, 0, 0, 1, 0, 0);
	
	        // clear the canvas
	        context.fillStyle = "black";
	        context.fillRect(0, 0, enabledElement.canvas.width, enabledElement.canvas.height);
	
	        // turn off image smooth/interpolation if pixelReplication is set in the viewport
	        if (enabledElement.viewport.pixelReplication === true) {
	            context.imageSmoothingEnabled = false;
	            context.mozImageSmoothingEnabled = false; // firefox doesn't support imageSmoothingEnabled yet
	        } else {
	            context.imageSmoothingEnabled = true;
	            context.mozImageSmoothingEnabled = true;
	        }
	
	        // save the canvas context state and apply the viewport properties
	        cornerstone.setToPixelCoordinateSystem(enabledElement, context);
	
	        // if the viewport ww/wc and invert all match the initial state of the image, we can draw the image
	        // directly.  If any of those are changed, we call renderColorImage() to apply the lut
	        if (enabledElement.viewport.voi.windowWidth === enabledElement.image.windowWidth && enabledElement.viewport.voi.windowCenter === enabledElement.image.windowCenter && enabledElement.viewport.invert === false) {
	            context.drawImage(image.getImage(), 0, 0, image.width, image.height, 0, 0, image.width, image.height);
	        } else {
	            cornerstone.renderColorImage(enabledElement, invalidated);
	        }
	    }
	
	    // Module exports
	    cornerstone.renderWebImage = renderWebImage;
	
	    return cornerstone;
	})(cornerstone);
	/**
	 * This module is responsible for enabling an element to display images with cornerstone
	 */
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    function setCanvasSize(element, canvas) {
	        // the device pixel ratio is 1.0 for normal displays and > 1.0
	        // for high DPI displays like Retina
	        /*
	          This functionality is disabled due to buggy behavior on systems with mixed DPI's.  If the canvas
	        is created on a display with high DPI (e.g. 2.0) and then the browser window is dragged to
	        a different display with a different DPI (e.g. 1.0), the canvas is not recreated so the pageToPixel
	        produces incorrect results.  I couldn't find any way to determine when the DPI changed other than
	        by polling which is not very clean.  If anyone has any ideas here, please let me know, but for now
	        we will disable this functionality.  We may want
	        to add a mechanism to optionally enable this functionality if we can determine it is safe to do
	        so (e.g. iPad or iPhone or perhaps enumerate the displays on the system.  I am choosing
	        to be cautious here since I would rather not have bug reports or safety issues related to this
	        scenario.
	          var devicePixelRatio = window.devicePixelRatio;
	        if(devicePixelRatio === undefined) {
	            devicePixelRatio = 1.0;
	        }
	        */
	
	        canvas.width = element.clientWidth;
	        canvas.height = element.clientHeight;
	        canvas.style.width = element.clientWidth + "px";
	        canvas.style.height = element.clientHeight + "px";
	    }
	
	    /**
	     * resizes an enabled element and optionally fits the image to window
	     * @param element
	     * @param fitToWindow true to refit, false to leave viewport parameters as they are
	     */
	    function resize(element, fitToWindow) {
	
	        var enabledElement = cornerstone.getEnabledElement(element);
	
	        setCanvasSize(element, enabledElement.canvas);
	
	        if (enabledElement.image === undefined) {
	            return;
	        }
	
	        if (fitToWindow === true) {
	            cornerstone.fitToWindow(element);
	        } else {
	            cornerstone.updateImage(element);
	        }
	    }
	
	    // module/private exports
	    cornerstone.resize = resize;
	
	    return cornerstone;
	})(cornerstone);
	/**
	 * This module contains a function that will set the canvas context to the pixel coordinates system
	 * making it easy to draw geometry on the image
	 */
	
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    /**
	     * Sets the canvas context transformation matrix to the pixel coordinate system.  This allows
	     * geometry to be driven using the canvas context using coordinates in the pixel coordinate system
	     * @param ee
	     * @param context
	     * @param scale optional scaler to apply
	     */
	    function setToPixelCoordinateSystem(enabledElement, context, scale) {
	        if (enabledElement === undefined) {
	            throw "setToPixelCoordinateSystem: parameter enabledElement must not be undefined";
	        }
	        if (context === undefined) {
	            throw "setToPixelCoordinateSystem: parameter context must not be undefined";
	        }
	
	        // reset the transformation matrix
	        context.setTransform(1, 0, 0, 1, 0, 0);
	        // move origin to center of canvas
	        context.translate(enabledElement.canvas.width / 2, enabledElement.canvas.height / 2);
	
	        // apply the scale
	        var widthScale = enabledElement.viewport.scale;
	        var heightScale = enabledElement.viewport.scale;
	        if (enabledElement.image.rowPixelSpacing < enabledElement.image.columnPixelSpacing) {
	            widthScale = widthScale * (enabledElement.image.columnPixelSpacing / enabledElement.image.rowPixelSpacing);
	        } else if (enabledElement.image.columnPixelSpacing < enabledElement.image.rowPixelSpacing) {
	            heightScale = heightScale * (enabledElement.image.rowPixelSpacing / enabledElement.image.columnPixelSpacing);
	        }
	        context.scale(widthScale, heightScale);
	
	        // apply the pan offset
	        context.translate(enabledElement.viewport.translation.x, enabledElement.viewport.translation.y);
	
	        if (scale === undefined) {
	            scale = 1;
	        } else {
	            // apply the font scale
	            context.scale(scale, scale);
	        }
	
	        //Apply if rotation required       
	        var angle = enabledElement.viewport.rotation;
	
	        if (angle !== 0) {
	            context.rotate(angle * Math.PI / 180);
	        }
	
	        //Apply Flip if required
	        if (enabledElement.viewport.hflip) {
	            context.translate(enabledElement.offsetWidth, 0);
	            context.scale(-1, 1);
	        }
	
	        if (enabledElement.viewport.vflip) {
	            context.translate(0, enabledElement.offsetHeight);
	            context.scale(1, -1);
	        }
	
	        // translate the origin back to the corner of the image so the event handlers can draw in image coordinate system
	        context.translate(-enabledElement.image.width / 2 / scale, -enabledElement.image.height / 2 / scale);
	    }
	
	    // Module exports
	    cornerstone.setToPixelCoordinateSystem = setToPixelCoordinateSystem;
	
	    return cornerstone;
	})(cornerstone);
	
	/**
	 * This module contains a function to convert stored pixel values to display pixel values using a LUT
	 */
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    /**
	     * This function transforms stored pixel values into a canvas image data buffer
	     * by using a LUT.  This is the most performance sensitive code in cornerstone and
	     * we use a special trick to make this go as fast as possible.  Specifically we
	     * use the alpha channel only to control the luminance rather than the red, green and
	     * blue channels which makes it over 3x faster.  The canvasImageDataData buffer needs
	     * to be previously filled with white pixels.
	     *
	     * NOTE: Attribution would be appreciated if you use this technique!
	     *
	     * @param pixelData the pixel data
	     * @param lut the lut
	     * @param canvasImageDataData a canvasImgageData.data buffer filled with white pixels
	     */
	    function storedPixelDataToCanvasImageData(image, lut, canvasImageDataData) {
	        var pixelData = image.getPixelData();
	        var minPixelValue = image.minPixelValue;
	        var canvasImageDataIndex = 3;
	        var storedPixelDataIndex = 0;
	        var localNumPixels = pixelData.length;
	        var localPixelData = pixelData;
	        var localLut = lut;
	        var localCanvasImageDataData = canvasImageDataData;
	        // NOTE: As of Nov 2014, most javascript engines have lower performance when indexing negative indexes.
	        // We have a special code path for this case that improves performance.  Thanks to @jpambrun for this enhancement
	        if (minPixelValue < 0) {
	            while (storedPixelDataIndex < localNumPixels) {
	                localCanvasImageDataData[canvasImageDataIndex] = localLut[localPixelData[storedPixelDataIndex++] + -minPixelValue]; // alpha
	                canvasImageDataIndex += 4;
	            }
	        } else {
	            while (storedPixelDataIndex < localNumPixels) {
	                localCanvasImageDataData[canvasImageDataIndex] = localLut[localPixelData[storedPixelDataIndex++]]; // alpha
	                canvasImageDataIndex += 4;
	            }
	        }
	    }
	
	    function storedColorPixelDataToCanvasImageData(image, lut, canvasImageDataData) {
	        var minPixelValue = image.minPixelValue;
	        var canvasImageDataIndex = 0;
	        var storedPixelDataIndex = 0;
	        var numPixels = image.width * image.height * 4;
	        var storedPixelData = image.getPixelData();
	        var localLut = lut;
	        var localCanvasImageDataData = canvasImageDataData;
	        // NOTE: As of Nov 2014, most javascript engines have lower performance when indexing negative indexes.
	        // We have a special code path for this case that improves performance.  Thanks to @jpambrun for this enhancement
	        if (minPixelValue < 0) {
	            while (storedPixelDataIndex < numPixels) {
	                localCanvasImageDataData[canvasImageDataIndex++] = localLut[storedPixelData[storedPixelDataIndex++] + -minPixelValue]; // red
	                localCanvasImageDataData[canvasImageDataIndex++] = localLut[storedPixelData[storedPixelDataIndex++] + -minPixelValue]; // green
	                localCanvasImageDataData[canvasImageDataIndex] = localLut[storedPixelData[storedPixelDataIndex] + -minPixelValue]; // blue
	                storedPixelDataIndex += 2;
	                canvasImageDataIndex += 2;
	            }
	        } else {
	            while (storedPixelDataIndex < numPixels) {
	                localCanvasImageDataData[canvasImageDataIndex++] = localLut[storedPixelData[storedPixelDataIndex++]]; // red
	                localCanvasImageDataData[canvasImageDataIndex++] = localLut[storedPixelData[storedPixelDataIndex++]]; // green
	                localCanvasImageDataData[canvasImageDataIndex] = localLut[storedPixelData[storedPixelDataIndex]]; // blue
	                storedPixelDataIndex += 2;
	                canvasImageDataIndex += 2;
	            }
	        }
	    }
	
	    // Module exports
	    cornerstone.storedPixelDataToCanvasImageData = storedPixelDataToCanvasImageData;
	    cornerstone.storedColorPixelDataToCanvasImageData = storedColorPixelDataToCanvasImageData;
	
	    return cornerstone;
	})(cornerstone);
	
	/**
	 * This module contains a function to immediately redraw an image
	 */
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    /**
	     * Forces the image to be updated/redrawn for the specified enabled element
	     * @param element
	     */
	    function updateImage(element, invalidated) {
	        var enabledElement = cornerstone.getEnabledElement(element);
	
	        if (enabledElement.image === undefined) {
	            throw "updateImage: image has not been loaded yet";
	        }
	
	        cornerstone.drawImage(enabledElement, invalidated);
	    }
	
	    // module exports
	    cornerstone.updateImage = updateImage;
	
	    return cornerstone;
	})(cornerstone);
	/**
	 * This module contains functions to deal with getting and setting the viewport for an enabled element
	 */
	var cornerstone = (function (cornerstone) {
	
	    "use strict";
	
	    if (cornerstone === undefined) {
	        cornerstone = {};
	    }
	
	    function setViewport(element, viewport) {
	
	        var enabledElement = cornerstone.getEnabledElement(element);
	
	        enabledElement.viewport.scale = viewport.scale;
	        enabledElement.viewport.translation.x = viewport.translation.x;
	        enabledElement.viewport.translation.y = viewport.translation.y;
	        enabledElement.viewport.voi.windowWidth = viewport.voi.windowWidth;
	        enabledElement.viewport.voi.windowCenter = viewport.voi.windowCenter;
	        enabledElement.viewport.invert = viewport.invert;
	        enabledElement.viewport.pixelReplication = viewport.pixelReplication;
	        enabledElement.viewport.rotation = viewport.rotation;
	        enabledElement.viewport.hflip = viewport.hflip;
	        enabledElement.viewport.vflip = viewport.vflip;
	
	        // prevent window width from being < 1
	        if (enabledElement.viewport.voi.windowWidth < 1) {
	            enabledElement.viewport.voi.windowWidth = 1;
	        }
	        // prevent scale from getting too small
	        if (enabledElement.viewport.scale < 0.0001) {
	            enabledElement.viewport.scale = 0.25;
	        }
	
	        if (enabledElement.viewport.rotation === 360 || enabledElement.viewport.rotation === -360) {
	            enabledElement.viewport.rotation = 0;
	        }
	
	        // Force the image to be updated since the viewport has been modified
	        cornerstone.updateImage(element);
	    }
	
	    /**
	     * Returns the viewport for the specified enabled element
	     * @param element
	     * @returns {*}
	     */
	    function getViewport(element) {
	        var enabledElement = cornerstone.getEnabledElement(element);
	
	        var viewport = enabledElement.viewport;
	        if (viewport === undefined) {
	            return undefined;
	        }
	        return {
	            scale: viewport.scale,
	            translation: {
	                x: viewport.translation.x,
	                y: viewport.translation.y
	            },
	            voi: {
	                windowWidth: viewport.voi.windowWidth,
	                windowCenter: viewport.voi.windowCenter
	            },
	            invert: viewport.invert,
	            pixelReplication: viewport.pixelReplication,
	            rotation: viewport.rotation,
	            hflip: viewport.hflip,
	            vflip: viewport.vflip
	        };
	    }
	
	    // module/private exports
	    cornerstone.getViewport = getViewport;
	    cornerstone.setViewport = setViewport;
	
	    return cornerstone;
	})(cornerstone);
	
	module.exports = cornerstone;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";var _interopRequire=function(obj){return obj && obj.__esModule?obj["default"]:obj;};var cornerstone=_interopRequire(__webpack_require__(14));var cornerstoneMath=_interopRequire(__webpack_require__(31));var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function mouseWheel(e){if(e.originalEvent.type === "mousewheel" && e.originalEvent.wheelDeltaY === 0){return;}if(e.originalEvent.type === "DOMMouseScroll" && e.originalEvent.axis === 1){return;}var element=e.currentTarget;var startingCoords=cornerstone.pageToPixel(element, e.pageX, e.pageY);e = window.event || e;var wheelDelta=e.wheelDelta || -e.detail || -e.originalEvent.detail;var direction=Math.max(-1, Math.min(1, wheelDelta));var mouseWheelData={element:element, viewport:cornerstone.getViewport(element), image:cornerstone.getEnabledElement(element).image, direction:direction, pageX:e.pageX, pageY:e.pageY, imageX:startingCoords.x, imageY:startingCoords.y};$(element).trigger("CornerstoneToolsMouseWheel", mouseWheelData);}var mouseWheelEvents="mousewheel DOMMouseScroll";function enable(element){$(element).on(mouseWheelEvents, mouseWheel);}function disable(element){$(element).unbind(mouseWheelEvents, mouseWheel);}cornerstoneTools.mouseWheelInput = {enable:enable, disable:disable};return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneMath, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function activateMouseDown(mouseEventDetail){$(mouseEventDetail.element).trigger("CornerstoneToolsMouseDownActivate", mouseEventDetail);}function mouseDown(e){var eventData=e.data;var element=e.currentTarget;var startPoints={page:cornerstoneMath.point.pageToPoint(e), image:cornerstone.pageToPixel(element, e.pageX, e.pageY)};var lastPoints=cornerstoneTools.copyPoints(startPoints);var mouseEventDetail={event:e, which:e.which, viewport:cornerstone.getViewport(element), image:cornerstone.getEnabledElement(element).image, element:element, startPoints:startPoints, lastPoints:lastPoints, currentPoints:startPoints, deltaPoints:{x:0, y:0}};var event=jQuery.Event("CornerstoneToolsMouseDown", mouseEventDetail);$(mouseEventDetail.element).trigger(event, mouseEventDetail);if(event.isImmediatePropagationStopped() === false){if(activateMouseDown(mouseEventDetail) === true){return cornerstoneTools.pauseEvent(e);}}var whichMouseButton=e.which;function onMouseMove(e){var currentPoints={page:cornerstoneMath.point.pageToPoint(e), image:cornerstone.pageToPixel(element, e.pageX, e.pageY)};var deltaPoints={page:cornerstoneMath.point.subtract(currentPoints.page, lastPoints.page), image:cornerstoneMath.point.subtract(currentPoints.image, lastPoints.image)};var eventData={which:whichMouseButton, viewport:cornerstone.getViewport(element), image:cornerstone.getEnabledElement(element).image, element:element, startPoints:startPoints, lastPoints:lastPoints, currentPoints:currentPoints, deltaPoints:deltaPoints};$(mouseEventDetail.element).trigger("CornerstoneToolsMouseDrag", eventData);lastPoints = cornerstoneTools.copyPoints(currentPoints);return cornerstoneTools.pauseEvent(e);}function onMouseUp(e){var currentPoints={page:cornerstoneMath.point.pageToPoint(e), image:cornerstone.pageToPixel(element, e.pageX, e.pageY)};var deltaPoints={page:cornerstoneMath.point.subtract(currentPoints.page, lastPoints.page), image:cornerstoneMath.point.subtract(currentPoints.image, lastPoints.image)};var eventData={event:e, which:whichMouseButton, viewport:cornerstone.getViewport(element), image:cornerstone.getEnabledElement(element).image, element:element, startPoints:startPoints, lastPoints:lastPoints, currentPoints:currentPoints, deltaPoints:deltaPoints};var event=jQuery.Event("CornerstoneToolsMouseUp", eventData);$(mouseEventDetail.element).trigger(event, eventData);$(document).off("mousemove", onMouseMove);$(document).off("mouseup", onMouseUp);}$(document).on("mousemove", onMouseMove);$(document).on("mouseup", onMouseUp);return cornerstoneTools.pauseEvent(e);}function mouseMove(e){var eventData=e.data;var element=e.currentTarget;var startPoints={page:cornerstoneMath.point.pageToPoint(e), image:cornerstone.pageToPixel(element, e.pageX, e.pageY)};var lastPoints=cornerstoneTools.copyPoints(startPoints);var whichMouseButton=e.which;var currentPoints={page:cornerstoneMath.point.pageToPoint(e), image:cornerstone.pageToPixel(element, e.pageX, e.pageY)};var deltaPoints={page:cornerstoneMath.point.subtract(currentPoints.page, lastPoints.page), image:cornerstoneMath.point.subtract(currentPoints.image, lastPoints.image)};var mouseMoveEventData={which:whichMouseButton, viewport:cornerstone.getViewport(element), image:cornerstone.getEnabledElement(element).image, element:element, startPoints:startPoints, lastPoints:lastPoints, currentPoints:currentPoints, deltaPoints:deltaPoints};$(element).trigger("CornerstoneToolsMouseMove", mouseMoveEventData);lastPoints = cornerstoneTools.copyPoints(currentPoints);}function enable(element){$(element).on("mousedown", mouseDown);$(element).on("mousemove", mouseMove);}function disable(element){$(element).off("mousedown", mouseDown);$(element).off("mousemove", mouseMove);}cornerstoneTools.mouseInput = {enable:enable, disable:disable};return cornerstoneTools;})($, cornerstone, cornerstoneMath, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function simpleMouseButtonTool(mouseDownCallback){var toolInterface={activate:function activate(element, mouseButtonMask, options){$(element).off("CornerstoneToolsMouseDownActivate", mouseDownCallback);var eventData={mouseButtonMask:mouseButtonMask, options:options};$(element).on("CornerstoneToolsMouseDownActivate", eventData, mouseDownCallback);}, disable:function disable(element){$(element).off("CornerstoneToolsMouseDownActivate", mouseDownCallback);}, enable:function enable(element){$(element).off("CornerstoneToolsMouseDownActivate", mouseDownCallback);}, deactivate:function deactivate(element){$(element).off("CornerstoneToolsMouseDownActivate", mouseDownCallback);}};return toolInterface;}cornerstoneTools.simpleMouseButtonTool = simpleMouseButtonTool;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var coordsData;var cornerstoneTools=(function($, cornerstone, cornerstoneMath, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function mouseButtonTool(mouseToolInterface){function addNewMeasurement(mouseEventData){var measurementData=mouseToolInterface.createNewMeasurement(mouseEventData);cornerstoneTools.addToolState(mouseEventData.element, mouseToolInterface.toolType, measurementData);$(mouseEventData.element).off("CornerstoneToolsMouseMove", mouseMoveCallback);cornerstoneTools.moveHandle(mouseEventData, measurementData.handles.end, function(){if(cornerstoneTools.anyHandlesOutsideImage(mouseEventData, measurementData.handles)){cornerstoneTools.removeToolState(mouseEventData.element, mouseToolInterface.toolType, measurementData);}$(mouseEventData.element).on("CornerstoneToolsMouseMove", mouseMoveCallback);});}function mouseDownActivateCallback(e, eventData){if(cornerstoneTools.isMouseButtonEnabled(eventData.which, e.data.mouseButtonMask)){addNewMeasurement(eventData);return false;}}function mouseMoveCallback(e, eventData){cornerstoneTools.activeToolcoordinate.setCoords(eventData);if(eventData.which !== 0){return;}var toolData=cornerstoneTools.getToolState(eventData.element, mouseToolInterface.toolType);if(toolData === undefined){return;}var imageNeedsUpdate=false;for(var i=0; i < toolData.data.length; i++) {var data=toolData.data[i];if(cornerstoneTools.handleActivator(data.handles, eventData.currentPoints.image, eventData.viewport.scale) === true){imageNeedsUpdate = true;}}if(imageNeedsUpdate === true){cornerstone.updateImage(eventData.element);}}function getHandleNearImagePoint(data, coords){for(var handle in data.handles) {var distanceSquared=cornerstoneMath.point.distanceSquared(data.handles[handle], coords);if(distanceSquared < 25){return data.handles[handle];}}}function mouseDownCallback(e, eventData){var data;function handleDoneMove(){if(cornerstoneTools.anyHandlesOutsideImage(eventData, data.handles)){cornerstoneTools.removeToolState(eventData.element, mouseToolInterface.toolType, data);}$(eventData.element).on("CornerstoneToolsMouseMove", mouseMoveCallback);}if(cornerstoneTools.isMouseButtonEnabled(eventData.which, e.data.mouseButtonMask)){var coords=eventData.startPoints.image;var toolData=cornerstoneTools.getToolState(e.currentTarget, mouseToolInterface.toolType);var i;if(toolData !== undefined){for(i = 0; i < toolData.data.length; i++) {data = toolData.data[i];var handle=getHandleNearImagePoint(data, coords);if(handle !== undefined){$(eventData.element).off("CornerstoneToolsMouseMove", mouseMoveCallback);cornerstoneTools.moveHandle(eventData, handle, handleDoneMove);e.stopImmediatePropagation();return false;}}}if(toolData !== undefined && mouseToolInterface.pointNearTool !== undefined){for(i = 0; i < toolData.data.length; i++) {data = toolData.data[i];if(mouseToolInterface.pointNearTool(data, coords)){$(eventData.element).off("CornerstoneToolsMouseMove", mouseMoveCallback);cornerstoneTools.moveAllHandles(e, data, toolData, true);e.stopImmediatePropagation();return false;}}}}}function disable(element){$(element).off("CornerstoneImageRendered", mouseToolInterface.onImageRendered);$(element).off("CornerstoneToolsMouseMove", mouseMoveCallback);$(element).off("CornerstoneToolsMouseDown", mouseDownCallback);$(element).off("CornerstoneToolsMouseDownActivate", mouseDownActivateCallback);cornerstone.updateImage(element);}function enable(element){$(element).off("CornerstoneImageRendered", mouseToolInterface.onImageRendered);$(element).off("CornerstoneToolsMouseMove", mouseMoveCallback);$(element).off("CornerstoneToolsMouseDown", mouseDownCallback);$(element).off("CornerstoneToolsMouseDownActivate", mouseDownActivateCallback);$(element).on("CornerstoneImageRendered", mouseToolInterface.onImageRendered);cornerstone.updateImage(element);}function activate(element, mouseButtonMask){var eventData={mouseButtonMask:mouseButtonMask};$(element).off("CornerstoneImageRendered", mouseToolInterface.onImageRendered);$(element).off("CornerstoneToolsMouseMove", mouseMoveCallback);$(element).off("CornerstoneToolsMouseDown", mouseDownCallback);$(element).off("CornerstoneToolsMouseDownActivate", mouseDownActivateCallback);$(element).on("CornerstoneImageRendered", mouseToolInterface.onImageRendered);$(element).on("CornerstoneToolsMouseMove", eventData, mouseMoveCallback);$(element).on("CornerstoneToolsMouseDown", eventData, mouseDownCallback);$(element).on("CornerstoneToolsMouseDownActivate", eventData, mouseDownActivateCallback);cornerstone.updateImage(element);}function deactivate(element, mouseButtonMask){var eventData={mouseButtonMask:mouseButtonMask};$(element).off("CornerstoneImageRendered", mouseToolInterface.onImageRendered);$(element).off("CornerstoneToolsMouseMove", mouseMoveCallback);$(element).off("CornerstoneToolsMouseDown", mouseDownCallback);$(element).off("CornerstoneToolsMouseDownActivate", mouseDownActivateCallback);$(element).on("CornerstoneImageRendered", mouseToolInterface.onImageRendered);$(element).on("CornerstoneToolsMouseMove", eventData, mouseMoveCallback);$(element).on("CornerstoneToolsMouseDown", eventData, mouseDownCallback);cornerstone.updateImage(element);}var toolInterface={enable:enable, disable:disable, activate:activate, deactivate:deactivate};return toolInterface;}cornerstoneTools.mouseButtonTool = mouseButtonTool;return cornerstoneTools;})($, cornerstone, cornerstoneMath, cornerstoneTools);var coordsData;var cornerstoneTools=(function($, cornerstone, cornerstoneMath, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function mouseButtonRectangleTool(mouseToolInterface, preventHandleOutsideImage){function addNewMeasurement(mouseEventData){var measurementData=mouseToolInterface.createNewMeasurement(mouseEventData);cornerstoneTools.addToolState(mouseEventData.element, mouseToolInterface.toolType, measurementData);$(mouseEventData.element).off("CornerstoneToolsMouseMove", mouseMoveCallback);cornerstoneTools.moveHandle(mouseEventData, measurementData.handles.end, function(){if(cornerstoneTools.anyHandlesOutsideImage(mouseEventData, measurementData.handles)){cornerstoneTools.removeToolState(mouseEventData.element, mouseToolInterface.toolType, measurementData);}$(mouseEventData.element).on("CornerstoneToolsMouseMove", mouseMoveCallback);}, preventHandleOutsideImage);}function mouseDownActivateCallback(e, eventData){if(cornerstoneTools.isMouseButtonEnabled(eventData.which, e.data.mouseButtonMask)){addNewMeasurement(eventData);return false;}}function mouseMoveCallback(e, eventData){cornerstoneTools.activeToolcoordinate.setCoords(eventData);if(eventData.which !== 0){return;}var toolData=cornerstoneTools.getToolState(eventData.element, mouseToolInterface.toolType);if(toolData === undefined){return;}var imageNeedsUpdate=false;for(var i=0; i < toolData.data.length; i++) {var data=toolData.data[i];if(cornerstoneTools.handleActivator(data.handles, eventData.currentPoints.image, eventData.viewport.scale) === true){imageNeedsUpdate = true;}}if(imageNeedsUpdate === true){cornerstone.updateImage(eventData.element);}}function getHandleNearImagePoint(data, coords){for(var handle in data.handles) {var distanceSquared=cornerstoneMath.point.distanceSquared(data.handles[handle], coords);if(distanceSquared < 25){return data.handles[handle];}}}function mouseDownCallback(e, eventData){var data;function handleDoneMove(){if(cornerstoneTools.anyHandlesOutsideImage(eventData, data.handles)){cornerstoneTools.removeToolState(eventData.element, mouseToolInterface.toolType, data);}$(eventData.element).on("CornerstoneToolsMouseMove", mouseMoveCallback);}if(cornerstoneTools.isMouseButtonEnabled(eventData.which, e.data.mouseButtonMask)){var coords=eventData.startPoints.image;var toolData=cornerstoneTools.getToolState(e.currentTarget, mouseToolInterface.toolType);var i;if(toolData !== undefined){for(i = 0; i < toolData.data.length; i++) {data = toolData.data[i];var handle=getHandleNearImagePoint(data, coords);if(handle !== undefined){$(eventData.element).off("CornerstoneToolsMouseMove", mouseMoveCallback);cornerstoneTools.moveHandle(eventData, handle, handleDoneMove, preventHandleOutsideImage);e.stopImmediatePropagation();return false;}}}if(toolData !== undefined && mouseToolInterface.pointInsideRect !== undefined){for(i = 0; i < toolData.data.length; i++) {data = toolData.data[i];if(mouseToolInterface.pointInsideRect(data, coords)){$(eventData.element).off("CornerstoneToolsMouseMove", mouseMoveCallback);cornerstoneTools.moveAllHandles(e, data, toolData, false, preventHandleOutsideImage);e.stopImmediatePropagation();return false;}}}}}function disable(element){$(element).off("CornerstoneImageRendered", mouseToolInterface.onImageRendered);$(element).off("CornerstoneToolsMouseMove", mouseMoveCallback);$(element).off("CornerstoneToolsMouseDown", mouseDownCallback);$(element).off("CornerstoneToolsMouseDownActivate", mouseDownActivateCallback);cornerstone.updateImage(element);}function enable(element){$(element).off("CornerstoneImageRendered", mouseToolInterface.onImageRendered);$(element).off("CornerstoneToolsMouseMove", mouseMoveCallback);$(element).off("CornerstoneToolsMouseDown", mouseDownCallback);$(element).off("CornerstoneToolsMouseDownActivate", mouseDownActivateCallback);$(element).on("CornerstoneImageRendered", mouseToolInterface.onImageRendered);cornerstone.updateImage(element);}function activate(element, mouseButtonMask){var eventData={mouseButtonMask:mouseButtonMask};$(element).off("CornerstoneImageRendered", mouseToolInterface.onImageRendered);$(element).off("CornerstoneToolsMouseMove", mouseMoveCallback);$(element).off("CornerstoneToolsMouseDown", mouseDownCallback);$(element).off("CornerstoneToolsMouseDownActivate", mouseDownActivateCallback);$(element).on("CornerstoneImageRendered", mouseToolInterface.onImageRendered);$(element).on("CornerstoneToolsMouseMove", eventData, mouseMoveCallback);$(element).on("CornerstoneToolsMouseDown", eventData, mouseDownCallback);$(element).on("CornerstoneToolsMouseDownActivate", eventData, mouseDownActivateCallback);cornerstone.updateImage(element);}function deactivate(element, mouseButtonMask){var eventData={mouseButtonMask:mouseButtonMask};$(element).off("CornerstoneImageRendered", mouseToolInterface.onImageRendered);$(element).off("CornerstoneToolsMouseMove", mouseMoveCallback);$(element).off("CornerstoneToolsMouseDown", mouseDownCallback);$(element).off("CornerstoneToolsMouseDownActivate", mouseDownActivateCallback);$(element).on("CornerstoneImageRendered", mouseToolInterface.onImageRendered);$(element).on("CornerstoneToolsMouseMove", eventData, mouseMoveCallback);$(element).on("CornerstoneToolsMouseDown", eventData, mouseDownCallback);cornerstone.updateImage(element);}var toolInterface={enable:enable, disable:disable, activate:activate, deactivate:deactivate};return toolInterface;}cornerstoneTools.mouseButtonRectangleTool = mouseButtonRectangleTool;return cornerstoneTools;})($, cornerstone, cornerstoneMath, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function mouseWheelTool(mouseWheelCallback){var toolInterface={activate:function activate(element){$(element).off("CornerstoneToolsMouseWheel", mouseWheelCallback);var eventData={};$(element).on("CornerstoneToolsMouseWheel", eventData, mouseWheelCallback);}, disable:function disable(element){$(element).off("CornerstoneToolsMouseWheel", mouseWheelCallback);}, enable:function enable(element){$(element).off("CornerstoneToolsMouseWheel", mouseWheelCallback);}, deactivate:function deactivate(element){$(element).off("CornerstoneToolsMouseWheel", mouseWheelCallback);}};return toolInterface;}cornerstoneTools.mouseWheelTool = mouseWheelTool;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function touchDragTool(touchDragCallback){var toolInterface={activate:function activate(element, mouseButtonMask){$(element).off("CornerstoneToolsTouchDrag", touchDragCallback);var eventData={};$(element).on("CornerstoneToolsTouchDrag", eventData, touchDragCallback);}, disable:function disable(element){$(element).off("CornerstoneToolsTouchDrag", touchDragCallback);}, enable:function enable(element){$(element).off("CornerstoneToolsTouchDrag", touchDragCallback);}, deactivate:function deactivate(element){$(element).off("CornerstoneToolsTouchDrag", touchDragCallback);}};return toolInterface;}cornerstoneTools.touchDragTool = touchDragTool;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function touchPinchTool(touchPinchCallback){var toolInterface={activate:function activate(element){$(element).off("CornerstoneToolsTouchPinch", touchPinchCallback);var eventData={};$(element).on("CornerstoneToolsTouchPinch", eventData, touchPinchCallback);}, disable:function disable(element){$(element).off("CornerstoneToolsTouchPinch", touchPinchCallback);}, enable:function enable(element){$(element).off("CornerstoneToolsTouchPinch", touchPinchCallback);}, deactivate:function deactivate(element){$(element).off("CornerstoneToolsTouchPinch", touchPinchCallback);}};return toolInterface;}cornerstoneTools.touchPinchTool = touchPinchTool;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneMath, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function touchTool(touchToolInterface){function addNewMeasurement(touchEventData){var measurementData=touchToolInterface.createNewMeasurement(touchEventData);cornerstoneTools.addToolState(touchEventData.element, touchToolInterface.toolType, measurementData);$(touchEventData.element).off("CornerstoneToolsTouchDrag", touchMoveCallback);cornerstoneTools.moveHandle(touchEventData, measurementData.handles.end, function(){if(cornerstoneTools.anyHandlesOutsideImage(touchEventData, measurementData.handles)){cornerstoneTools.removeToolState(mouseEventData.element, mouseToolInterface.toolType, measurementData);}$(touchEventData.element).on("CornerstoneToolsTouchDrag", touchMoveCallback);});}function touchDownActivateCallback(e, eventData){addNewMeasurement(eventData);return false;}function touchMoveCallback(e, eventData){cornerstoneTools.activeToolcoordinate.setCoords(eventData);var toolData=cornerstoneTools.getToolState(eventData.element, touchToolInterface.toolType);if(toolData === undefined){return;}var imageNeedsUpdate=false;for(var i=0; i < toolData.data.length; i++) {var data=toolData.data[i];if(cornerstoneTools.handleActivator(data.handles, eventData.currentPoints.image, eventData.viewport.scale) === true){imageNeedsUpdate = true;}}if(imageNeedsUpdate === true){cornerstone.updateImage(eventData.element);}}function getHandleNearImagePoint(data, coords){for(var handle in data.handles) {var distanceSquared=cornerstoneMath.point.distanceSquared(data.handles[handle], coords);if(distanceSquared < 30){return data.handles[handle];}}}function touchstartCallback(e, eventData){var data;function handleDoneMove(){if(cornerstoneTools.anyHandlesOutsideImage(eventData, data.handles)){cornerstoneTools.removeToolState(eventData.element, touchToolInterface.toolType, data);}$(eventData.element).on("CornerstoneToolsTouchDrag", touchMoveCallback);}var coords=eventData.startPoints.image;var toolData=cornerstoneTools.getToolState(e.currentTarget, touchToolInterface.toolType);var i;if(toolData !== undefined){for(i = 0; i < toolData.data.length; i++) {data = toolData.data[i];var handle=getHandleNearImagePoint(data, coords);if(handle !== undefined){$(eventData.element).off("CornerstoneToolsTouchDrag", touchMoveCallback);cornerstoneTools.touchmoveHandle(eventData, handle, handleDoneMove);e.stopImmediatePropagation();return false;}}}if(toolData !== undefined && touchToolInterface.pointNearTool !== undefined){for(i = 0; i < toolData.data.length; i++) {data = toolData.data[i];if(touchToolInterface.pointNearTool(data, coords)){$(eventData.element).off("CornerstoneToolsTouchDrag", touchMoveCallback);cornerstoneTools.touchmoveAllHandles(e, data, toolData, true);e.stopImmediatePropagation();return false;}}}}function disable(element){$(element).off("CornerstoneImageRendered", touchToolInterface.onImageRendered);$(element).off("CornerstoneToolsTouchDrag", touchMoveCallback);$(element).off("CornerstoneToolsDragStart", touchstartCallback);$(element).off("CornerstoneToolsDragStartActive", touchDownActivateCallback);cornerstone.updateImage(element);}function enable(element){$(element).off("CornerstoneImageRendered", touchToolInterface.onImageRendered);$(element).off("CornerstoneToolsTouchDrag", touchMoveCallback);$(element).off("CornerstoneToolsDragStart", touchstartCallback);$(element).off("CornerstoneToolsDragStartActive", touchDownActivateCallback);$(element).on("CornerstoneImageRendered", touchToolInterface.onImageRendered);cornerstone.updateImage(element);}function activate(element){$(element).off("CornerstoneImageRendered", touchToolInterface.onImageRendered);$(element).off("CornerstoneToolsTouchDrag", touchMoveCallback);$(element).off("CornerstoneToolsDragStart", touchstartCallback);$(element).off("CornerstoneToolsDragStartActive", touchDownActivateCallback);$(element).on("CornerstoneImageRendered", touchToolInterface.onImageRendered);$(element).on("CornerstoneToolsTouchDrag", touchMoveCallback);$(element).on("CornerstoneToolsDragStart", touchstartCallback);$(element).on("CornerstoneToolsDragStartActive", touchDownActivateCallback);cornerstone.updateImage(element);}function deactivate(element){$(element).off("CornerstoneImageRendered", touchToolInterface.onImageRendered);$(element).off("CornerstoneToolsTouchDrag", touchMoveCallback);$(element).off("CornerstoneToolsDragStart", touchstartCallback);$(element).off("CornerstoneToolsDragStartActive", touchDownActivateCallback);$(element).on("CornerstoneImageRendered", touchToolInterface.onImageRendered);$(element).on("CornerstoneToolsTouchDrag", touchMoveCallback);$(element).on("CornerstoneToolsDragStart", touchstartCallback);cornerstone.updateImage(element);}var toolInterface={enable:enable, disable:disable, activate:activate, deactivate:deactivate};return toolInterface;}cornerstoneTools.touchTool = touchTool;return cornerstoneTools;})($, cornerstone, cornerstoneMath, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneMath, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}var toolType="angle";function createNewMeasurement(mouseEventData){var angleData={visible:true, handles:{start:{x:mouseEventData.currentPoints.image.x - 20, y:mouseEventData.currentPoints.image.y + 10, highlight:true, active:false}, end:{x:mouseEventData.currentPoints.image.x, y:mouseEventData.currentPoints.image.y, highlight:true, active:true}, start2:{x:mouseEventData.currentPoints.image.x - 20, y:mouseEventData.currentPoints.image.y + 10, highlight:true, active:false}, end2:{x:mouseEventData.currentPoints.image.x, y:mouseEventData.currentPoints.image.y + 20, highlight:true, active:false}}};return angleData;}function pointNearTool(data, coords){var lineSegment={start:data.handles.start, end:data.handles.end};var distanceToPoint=cornerstoneMath.lineSegment.distanceToPoint(lineSegment, coords);if(distanceToPoint < 5){return true;}lineSegment.start = data.handles.start2;lineSegment.end = data.handles.end2;distanceToPoint = cornerstoneMath.lineSegment.distanceToPoint(lineSegment, coords);return distanceToPoint < 5;}function onImageRendered(e, eventData){var toolData=cornerstoneTools.getToolState(e.currentTarget, toolType);if(toolData === undefined){return;}var context=eventData.canvasContext.canvas.getContext("2d");cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, context);var color=cornerstoneTools.activeToolcoordinate.getToolColor();for(var i=0; i < toolData.data.length; i++) {context.save();var data=toolData.data[i];if(pointNearTool(data, cornerstoneTools.activeToolcoordinate.getCoords())){color = cornerstoneTools.activeToolcoordinate.getActiveColor();}else {color = cornerstoneTools.activeToolcoordinate.getToolColor();}context.beginPath();context.strokeStyle = color;context.lineWidth = 1 / eventData.viewport.scale;context.moveTo(data.handles.start.x, data.handles.start.y);context.lineTo(data.handles.end.x, data.handles.end.y);context.moveTo(data.handles.start2.x, data.handles.start2.y);context.lineTo(data.handles.end2.x, data.handles.end2.y);context.stroke();context.beginPath();cornerstoneTools.drawHandles(context, eventData, data.handles);context.stroke();context.fillStyle = color;var dx1=(Math.ceil(data.handles.start.x) - Math.ceil(data.handles.end.x)) * eventData.image.columnPixelSpacing;var dy1=(Math.ceil(data.handles.start.y) - Math.ceil(data.handles.end.y)) * eventData.image.rowPixelSpacing;var dx2=(Math.ceil(data.handles.start2.x) - Math.ceil(data.handles.end2.x)) * eventData.image.columnPixelSpacing;var dy2=(Math.ceil(data.handles.start2.y) - Math.ceil(data.handles.end2.y)) * eventData.image.rowPixelSpacing;var angle=Math.acos(Math.abs((dx1 * dx2 + dy1 * dy2) / (Math.sqrt(dx1 * dx1 + dy1 * dy1) * Math.sqrt(dx2 * dx2 + dy2 * dy2))));angle = angle * (180 / Math.PI);var rAngle=cornerstoneTools.roundToDecimal(angle, 2);var str="00B0";var text=rAngle.toString() + String.fromCharCode(parseInt(str, 16));var fontParameters=cornerstoneTools.setContextToDisplayFontSize(eventData.enabledElement, eventData.canvasContext, 15);context.font = "" + fontParameters.fontSize + "px Arial";var textX=(data.handles.start2.x + data.handles.end2.x) / 2 / fontParameters.fontScale;var textY=(data.handles.start2.y + data.handles.end2.y) / 2 / fontParameters.fontScale;context.fillText(text, textX, textY);context.restore();}}cornerstoneTools.angle = cornerstoneTools.mouseButtonTool({createNewMeasurement:createNewMeasurement, onImageRendered:onImageRendered, pointNearTool:pointNearTool, toolType:toolType});cornerstoneTools.angleTouch = cornerstoneTools.touchTool({createNewMeasurement:createNewMeasurement, onImageRendered:onImageRendered, pointNearTool:pointNearTool, toolType:toolType});return cornerstoneTools;})($, cornerstone, cornerstoneMath, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneMath, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}var toolType="ellipticalRoi";function createNewMeasurement(mouseEventData){var measurementData={visible:true, handles:{start:{x:mouseEventData.currentPoints.image.x, y:mouseEventData.currentPoints.image.y, highlight:true, active:false}, end:{x:mouseEventData.currentPoints.image.x, y:mouseEventData.currentPoints.image.y, highlight:true, active:true}}};return measurementData;}function pointNearTool(data, coords){var rect={left:Math.min(data.handles.start.x, data.handles.end.x), top:Math.min(data.handles.start.y, data.handles.end.y), width:Math.abs(data.handles.start.x - data.handles.end.x), height:Math.abs(data.handles.start.y - data.handles.end.y)};var distanceToPoint=cornerstoneMath.rect.distanceToPoint(rect, coords);return distanceToPoint < 5;}function pointInEllipse(ellipse, location){var xRadius=ellipse.width / 2;var yRadius=ellipse.height / 2;if(xRadius <= 0 || yRadius <= 0){return false;}var center={x:ellipse.left + xRadius, y:ellipse.top + yRadius};var normalized={x:location.x - center.x, y:location.y - center.y};var inEllipse=normalized.x * normalized.y / (xRadius * xRadius) + normalized.y * normalized.y / (yRadius * yRadius) <= 1;return inEllipse;}function calculateMeanStdDev(sp, ellipse){var sum=0;var sumSquared=0;var count=0;var index=0;for(var y=ellipse.top; y < ellipse.top + ellipse.height; y++) {for(var x=ellipse.left; x < ellipse.left + ellipse.width; x++) {if(pointInEllipse(ellipse, {x:x, y:y}) === true){sum += sp[index];sumSquared += sp[index] * sp[index];count++;}index++;}}if(count === 0){return {count:count, mean:0, variance:0, stdDev:0};}var mean=sum / count;var variance=sumSquared / count - mean * mean;return {count:count, mean:mean, variance:variance, stdDev:Math.sqrt(variance)};}function onImageRendered(e, eventData){var toolData=cornerstoneTools.getToolState(e.currentTarget, toolType);if(toolData === undefined){return;}var context=eventData.canvasContext.canvas.getContext("2d");cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, context);var color=cornerstoneTools.activeToolcoordinate.getToolColor();for(var i=0; i < toolData.data.length; i++) {context.save();var data=toolData.data[i];if(pointNearTool(data, cornerstoneTools.activeToolcoordinate.getCoords())){color = cornerstoneTools.activeToolcoordinate.getActiveColor();}else {color = cornerstoneTools.activeToolcoordinate.getToolColor();}var width=Math.abs(data.handles.start.x - data.handles.end.x);var height=Math.abs(data.handles.start.y - data.handles.end.y);var left=Math.min(data.handles.start.x, data.handles.end.x);var top=Math.min(data.handles.start.y, data.handles.end.y);var centerX=(data.handles.start.x + data.handles.end.x) / 2;var centerY=(data.handles.start.y + data.handles.end.y) / 2;context.beginPath();context.strokeStyle = color;context.lineWidth = 1 / eventData.viewport.scale;cornerstoneTools.drawEllipse(context, left, top, width, height);context.closePath();context.beginPath();cornerstoneTools.drawHandles(context, eventData, data.handles);context.stroke();var pixels=cornerstone.getPixels(eventData.element, left, top, width, height);var ellipse={left:left, top:top, width:width, height:height};var meanStdDev=calculateMeanStdDev(pixels, ellipse);var area=Math.PI * (width * eventData.image.columnPixelSpacing / 2) * (height * eventData.image.rowPixelSpacing / 2);var areaText="Area: " + area.toFixed(2) + " mm^2";var fontParameters=cornerstoneTools.setContextToDisplayFontSize(eventData.enabledElement, eventData.canvasContext, 15);context.font = "" + fontParameters.fontSize + "px Arial";var textSize=context.measureText(area);var offset=fontParameters.lineHeight;var textX=centerX < eventData.image.columns / 2?centerX + width / 2:centerX - width / 2 - textSize.width * fontParameters.fontScale;var textY=centerY < eventData.image.rows / 2?centerY + height / 2:centerY - height / 2;textX = textX / fontParameters.fontScale;textY = textY / fontParameters.fontScale;context.fillStyle = color;context.fillText("Mean: " + meanStdDev.mean.toFixed(2), textX, textY - offset);context.fillText("StdDev: " + meanStdDev.stdDev.toFixed(2), textX, textY);context.fillText(areaText, textX, textY + offset);context.restore();}}cornerstoneTools.ellipticalRoi = cornerstoneTools.mouseButtonTool({createNewMeasurement:createNewMeasurement, onImageRendered:onImageRendered, pointNearTool:pointNearTool, toolType:toolType});cornerstoneTools.ellipticalroi_Touch = cornerstoneTools.touchTool({createNewMeasurement:createNewMeasurement, onImageRendered:onImageRendered, pointNearTool:pointNearTool, toolType:toolType});return cornerstoneTools;})($, cornerstone, cornerstoneMath, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneMath, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}var toolType="highlight";function createNewMeasurement(mouseEventData){var measurementData={visible:true, handles:{start:{x:mouseEventData.currentPoints.image.x, y:mouseEventData.currentPoints.image.y, highlight:true, active:false}, end:{x:mouseEventData.currentPoints.image.x, y:mouseEventData.currentPoints.image.y, highlight:true, active:true}}};return measurementData;}function pointInsideRect(data, coords){var rect={left:Math.min(data.handles.start.x, data.handles.end.x), top:Math.min(data.handles.start.y, data.handles.end.y), width:Math.abs(data.handles.start.x - data.handles.end.x), height:Math.abs(data.handles.start.y - data.handles.end.y)};var insideBox=false;if(coords.x >= rect.left && coords.x <= rect.left + rect.width && coords.y >= rect.top && coords.y <= rect.top + rect.height){insideBox = true;}return insideBox;}function pointNearTool(data, coords){var rect={left:Math.min(data.handles.start.x, data.handles.end.x), top:Math.min(data.handles.start.y, data.handles.end.y), width:Math.abs(data.handles.start.x - data.handles.end.x), height:Math.abs(data.handles.start.y - data.handles.end.y)};var distanceToPoint=cornerstoneMath.rect.distanceToPoint(rect, coords);return distanceToPoint < 5;}function onImageRendered(e, eventData){var toolData=cornerstoneTools.getToolState(e.currentTarget, toolType);if(toolData === undefined){return;}var context=eventData.canvasContext.canvas.getContext("2d");cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, context);var color=cornerstoneTools.activeToolcoordinate.getToolColor();context.save();var data=toolData.data[0];var selectionColor="white", toolsColor="white";var rect={left:Math.min(data.handles.start.x, data.handles.end.x), top:Math.min(data.handles.start.y, data.handles.end.y), width:Math.abs(data.handles.start.x - data.handles.end.x), height:Math.abs(data.handles.start.y - data.handles.end.y)};context.beginPath();cornerstoneTools.drawHandles(context, eventData, data.handles, color);context.stroke();context.beginPath();context.strokeStyle = "transparent";context.rect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);context.rect(rect.width + rect.left, rect.top, -rect.width, rect.height);context.stroke();context.fillStyle = "rgba(0,0,0,0.7)";context.fill();context.closePath();context.beginPath();context.strokeStyle = color;context.lineWidth = 2.5 / eventData.viewport.scale;context.setLineDash([4]);context.strokeRect(rect.left, rect.top, rect.width, rect.height);context.restore();}var preventHandleOutsideImage=true;cornerstoneTools.highlight = cornerstoneTools.mouseButtonRectangleTool({createNewMeasurement:createNewMeasurement, onImageRendered:onImageRendered, pointNearTool:pointNearTool, pointInsideRect:pointInsideRect, toolType:toolType}, preventHandleOutsideImage);cornerstoneTools.highlightTouch = cornerstoneTools.touchTool({createNewMeasurement:createNewMeasurement, onImageRendered:onImageRendered, pointNearTool:pointNearTool, pointInsideRect:pointInsideRect, toolType:toolType}, preventHandleOutsideImage);return cornerstoneTools;})($, cornerstone, cornerstoneMath, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneMath, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}var toolType="length";function createNewMeasurement(mouseEventData){var measurementData={visible:true, handles:{start:{x:mouseEventData.currentPoints.image.x, y:mouseEventData.currentPoints.image.y, highlight:true, active:false}, end:{x:mouseEventData.currentPoints.image.x, y:mouseEventData.currentPoints.image.y, highlight:true, active:true}}};return measurementData;}function pointNearTool(data, coords){var lineSegment={start:data.handles.start, end:data.handles.end};var distanceToPoint=cornerstoneMath.lineSegment.distanceToPoint(lineSegment, coords);return distanceToPoint < 25;}function onImageRendered(e, eventData){var toolData=cornerstoneTools.getToolState(e.currentTarget, toolType);if(toolData === undefined){return;}var context=eventData.canvasContext.canvas.getContext("2d");cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, context);var color=cornerstoneTools.activeToolcoordinate.getToolColor();for(var i=0; i < toolData.data.length; i++) {context.save();var data=toolData.data[i];if(pointNearTool(data, cornerstoneTools.activeToolcoordinate.getCoords())){color = cornerstoneTools.activeToolcoordinate.getActiveColor();}else {color = cornerstoneTools.activeToolcoordinate.getToolColor();}context.beginPath();context.strokeStyle = color;context.lineWidth = 1 / eventData.viewport.scale;context.moveTo(data.handles.start.x, data.handles.start.y);context.lineTo(data.handles.end.x, data.handles.end.y);context.stroke();context.beginPath();cornerstoneTools.drawHandles(context, eventData, data.handles, color);context.stroke();context.fillStyle = color;var dx=(data.handles.start.x - data.handles.end.x) * eventData.image.columnPixelSpacing;var dy=(data.handles.start.y - data.handles.end.y) * eventData.image.rowPixelSpacing;var length=Math.sqrt(dx * dx + dy * dy);var text="" + length.toFixed(2) + " mm";var fontParameters=cornerstoneTools.setContextToDisplayFontSize(eventData.enabledElement, eventData.canvasContext, 15);context.font = "" + fontParameters.fontSize + "px Arial";var textX=(data.handles.start.x + data.handles.end.x) / 2 / fontParameters.fontScale;var textY=(data.handles.start.y + data.handles.end.y) / 2 / fontParameters.fontScale;context.fillText(text, textX, textY);context.restore();}}cornerstoneTools.length = cornerstoneTools.mouseButtonTool({createNewMeasurement:createNewMeasurement, onImageRendered:onImageRendered, pointNearTool:pointNearTool, toolType:toolType});cornerstoneTools.lengthTouch = cornerstoneTools.touchTool({createNewMeasurement:createNewMeasurement, onImageRendered:onImageRendered, pointNearTool:pointNearTool, toolType:toolType});return cornerstoneTools;})($, cornerstone, cornerstoneMath, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function mouseUpCallback(e, eventData){$(eventData.element).off("CornerstoneToolsMouseDrag", mouseDragCallback);$(eventData.element).off("CornerstoneToolsMouseUp", mouseUpCallback);}function mouseDownCallback(e, eventData){if(cornerstoneTools.isMouseButtonEnabled(eventData.which, e.data.mouseButtonMask)){$(eventData.element).on("CornerstoneToolsMouseDrag", mouseDragCallback);$(eventData.element).on("CornerstoneToolsMouseUp", mouseUpCallback);return false;}}function mouseDragCallback(e, eventData){eventData.viewport.translation.x += eventData.deltaPoints.page.x / eventData.viewport.scale;eventData.viewport.translation.y += eventData.deltaPoints.page.y / eventData.viewport.scale;cornerstone.setViewport(eventData.element, eventData.viewport);return false;}function onDrag(e, eventData){var dragData=eventData;dragData.viewport.translation.x += dragData.deltaPoints.page.x / dragData.viewport.scale;dragData.viewport.translation.y += dragData.deltaPoints.page.y / dragData.viewport.scale;cornerstone.setViewport(dragData.element, dragData.viewport);return false;}cornerstoneTools.pan = cornerstoneTools.simpleMouseButtonTool(mouseDownCallback);cornerstoneTools.panTouchDrag = cornerstoneTools.touchDragTool(onDrag);return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}var toolType="probe";function createNewMeasurement(mouseEventData){var measurementData={visible:true, handles:{end:{x:mouseEventData.currentPoints.image.x, y:mouseEventData.currentPoints.image.y, highlight:true, active:true}}};return measurementData;}function calculateSUV(image, storedPixelValue){if(image.data === undefined){return undefined;}if(image.data.string("x00080060") !== "PT"){return undefined;}var modalityPixelValue=storedPixelValue * image.slope + image.intercept;var patientWeight=image.data.floatString("x00101030");if(patientWeight === undefined){return undefined;}var petSequence=image.data.elements.x00540016;if(petSequence === undefined){return undefined;}petSequence = petSequence.items[0].dataSet;var startTime=petSequence.time("x00181072");var totalDose=petSequence.floatString("x00181074");var halfLife=petSequence.floatString("x00181075");var acquisitionTime=image.data.time("x00080032");if(startTime === undefined || totalDose === undefined || halfLife === undefined || acquisitionTime === undefined){return undefined;}var acquisitionTimeInSeconds=acquisitionTime.fractionalSeconds + acquisitionTime.seconds + acquisitionTime.minutes * 60 + acquisitionTime.hours * 60 * 60;var injectionStartTimeInSeconds=startTime.fractionalSeconds + startTime.seconds + startTime.minutes * 60 + startTime.hours * 60 * 60;var durationInSeconds=acquisitionTimeInSeconds - injectionStartTimeInSeconds;var correctedDose=totalDose * Math.exp(-durationInSeconds * Math.log(2) / halfLife);var suv=modalityPixelValue * patientWeight / correctedDose * 1000;return suv;}function onImageRendered(e, eventData){var toolData=cornerstoneTools.getToolState(e.currentTarget, toolType);if(toolData === undefined){return;}var context=eventData.canvasContext.canvas.getContext("2d");cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, context);var color="white";for(var i=0; i < toolData.data.length; i++) {context.save();var data=toolData.data[i];context.beginPath();cornerstoneTools.drawHandles(context, eventData, data.handles, color);context.stroke();var fontParameters=cornerstoneTools.setContextToDisplayFontSize(eventData.enabledElement, eventData.canvasContext, 15);context.font = "" + fontParameters.fontSize + "px Arial";var x=Math.round(data.handles.end.x);var y=Math.round(data.handles.end.y);textX = data.handles.end.x + 3;textY = data.handles.end.y - 3;var textX=textX / fontParameters.fontScale;var textY=textY / fontParameters.fontScale;context.fillStyle = "white";var storedPixels=cornerstone.getStoredPixels(eventData.element, x, y, 1, 1);var sp=storedPixels[0];var mo=sp * eventData.image.slope + eventData.image.intercept;var suv=calculateSUV(eventData.image, sp);context.fillText("" + x + "," + y, textX, textY);var str="SP: " + sp + " MO: " + mo.toFixed(3);if(suv !== undefined){str += " SUV: " + suv.toFixed(3);}context.fillText(str, textX, textY + fontParameters.lineHeight);context.restore();}}cornerstoneTools.probe = cornerstoneTools.mouseButtonTool({createNewMeasurement:createNewMeasurement, onImageRendered:onImageRendered, toolType:toolType});cornerstoneTools.probeTouch = cornerstoneTools.touchTool({createNewMeasurement:createNewMeasurement, onImageRendered:onImageRendered, toolType:toolType});return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneMath, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}var toolType="rectangleRoi";function createNewMeasurement(mouseEventData){var measurementData={visible:true, handles:{start:{x:mouseEventData.currentPoints.image.x, y:mouseEventData.currentPoints.image.y, highlight:true, active:false}, end:{x:mouseEventData.currentPoints.image.x, y:mouseEventData.currentPoints.image.y, highlight:true, active:true}}};return measurementData;}function pointNearTool(data, coords){var rect={left:Math.min(data.handles.start.x, data.handles.end.x), top:Math.min(data.handles.start.y, data.handles.end.y), width:Math.abs(data.handles.start.x - data.handles.end.x), height:Math.abs(data.handles.start.y - data.handles.end.y)};var distanceToPoint=cornerstoneMath.rect.distanceToPoint(rect, coords);return distanceToPoint < 5;}function calculateMeanStdDev(sp, ellipse){var sum=0;var sumSquared=0;var count=0;var index=0;for(var y=ellipse.top; y < ellipse.top + ellipse.height; y++) {for(var x=ellipse.left; x < ellipse.left + ellipse.width; x++) {sum += sp[index];sumSquared += sp[index] * sp[index];count++;index++;}}if(count === 0){return {count:count, mean:0, variance:0, stdDev:0};}var mean=sum / count;var variance=sumSquared / count - mean * mean;return {count:count, mean:mean, variance:variance, stdDev:Math.sqrt(variance)};}function onImageRendered(e, eventData){var toolData=cornerstoneTools.getToolState(e.currentTarget, toolType);if(toolData === undefined){return;}var context=eventData.canvasContext.canvas.getContext("2d");cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, context);var color=cornerstoneTools.activeToolcoordinate.getToolColor();for(var i=0; i < toolData.data.length; i++) {context.save();var data=toolData.data[i];if(pointNearTool(data, cornerstoneTools.activeToolcoordinate.getCoords())){color = cornerstoneTools.activeToolcoordinate.getActiveColor();}else {color = cornerstoneTools.activeToolcoordinate.getToolColor();}var width=Math.abs(data.handles.start.x - data.handles.end.x);var height=Math.abs(data.handles.start.y - data.handles.end.y);var left=Math.min(data.handles.start.x, data.handles.end.x);var top=Math.min(data.handles.start.y, data.handles.end.y);var centerX=(data.handles.start.x + data.handles.end.x) / 2;var centerY=(data.handles.start.y + data.handles.end.y) / 2;context.beginPath();context.strokeStyle = color;context.lineWidth = 1 / eventData.viewport.scale;context.rect(left, top, width, height);context.stroke();context.beginPath();cornerstoneTools.drawHandles(context, eventData, data.handles, color);context.stroke();var pixels=cornerstone.getPixels(eventData.element, left, top, width, height);var ellipse={left:left, top:top, width:width, height:height};var meanStdDev=calculateMeanStdDev(pixels, ellipse);var area=width * eventData.image.columnPixelSpacing * (height * eventData.image.rowPixelSpacing);var areaText="Area: " + area.toFixed(2) + " mm^2";var fontParameters=cornerstoneTools.setContextToDisplayFontSize(eventData.enabledElement, eventData.canvasContext, 15);context.font = "" + fontParameters.fontSize + "px Arial";var textSize=context.measureText(area);var offset=fontParameters.lineHeight;var textX=centerX < eventData.image.columns / 2?centerX + width / 2:centerX - width / 2 - textSize.width * fontParameters.fontScale;var textY=centerY < eventData.image.rows / 2?centerY + height / 2:centerY - height / 2;textX = textX / fontParameters.fontScale;textY = textY / fontParameters.fontScale;context.fillStyle = color;context.fillText("Mean: " + meanStdDev.mean.toFixed(2), textX, textY - offset);context.fillText("StdDev: " + meanStdDev.stdDev.toFixed(2), textX, textY);context.fillText(areaText, textX, textY + offset);context.restore();}}cornerstoneTools.rectangleRoi = cornerstoneTools.mouseButtonTool({createNewMeasurement:createNewMeasurement, onImageRendered:onImageRendered, pointNearTool:pointNearTool, toolType:toolType});cornerstoneTools.rectangleRoiTouch = cornerstoneTools.touchTool({createNewMeasurement:createNewMeasurement, onImageRendered:onImageRendered, pointNearTool:pointNearTool, toolType:toolType});return cornerstoneTools;})($, cornerstone, cornerstoneMath, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function mouseUpCallback(e, eventData){$(eventData.element).off("CornerstoneToolsMouseDrag", mouseDragCallback);$(eventData.element).off("CornerstoneToolsMouseUp", mouseUpCallback);}function mouseDownCallback(e, eventData){if(cornerstoneTools.isMouseButtonEnabled(eventData.which, e.data.mouseButtonMask)){$(eventData.element).on("CornerstoneToolsMouseDrag", mouseDragCallback);$(eventData.element).on("CornerstoneToolsMouseUp", mouseUpCallback);return false;}}function mouseDragCallback(e, eventData){var imageDynamicRange=eventData.image.maxPixelValue - eventData.image.minPixelValue;var multiplier=imageDynamicRange / 1024;eventData.viewport.voi.windowWidth += eventData.deltaPoints.page.x * multiplier;eventData.viewport.voi.windowCenter += eventData.deltaPoints.page.y * multiplier;cornerstone.setViewport(eventData.element, eventData.viewport);return false;}function touchDragCallback(e, eventData){var dragData=eventData;var imageDynamicRange=dragData.image.maxPixelValue - dragData.image.minPixelValue;var multiplier=imageDynamicRange / 1024;dragData.viewport.voi.windowWidth += dragData.deltaPoints.page.x * multiplier;dragData.viewport.voi.windowCenter += dragData.deltaPoints.page.y * multiplier;cornerstone.setViewport(dragData.element, dragData.viewport);}cornerstoneTools.wwwc = cornerstoneTools.simpleMouseButtonTool(mouseDownCallback);cornerstoneTools.wwwcTouchDrag = cornerstoneTools.touchDragTool(touchDragCallback);return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function zoom(element, viewport, ticks){var pow=1.7;var oldFactor=Math.log(viewport.scale) / Math.log(pow);var factor=oldFactor + ticks;var scale=Math.pow(pow, factor);viewport.scale = scale;cornerstone.setViewport(element, viewport);}function mouseUpCallback(e, eventData){$(eventData.element).off("CornerstoneToolsMouseDrag", mouseDragCallback);$(eventData.element).off("CornerstoneToolsMouseUp", mouseUpCallback);}function mouseDownCallback(e, eventData){if(cornerstoneTools.isMouseButtonEnabled(eventData.which, e.data.mouseButtonMask)){$(eventData.element).on("CornerstoneToolsMouseDrag", mouseDragCallback);$(eventData.element).on("CornerstoneToolsMouseUp", mouseUpCallback);return false;}}function mouseDragCallback(e, eventData){var ticks=eventData.deltaPoints.page.y / 100;zoom(eventData.element, eventData.viewport, ticks);var newCoords=cornerstone.pageToPixel(eventData.element, eventData.startPoints.page.x, eventData.startPoints.page.y);eventData.viewport.translation.x -= eventData.startPoints.image.x - newCoords.x;eventData.viewport.translation.y -= eventData.startPoints.image.y - newCoords.y;cornerstone.setViewport(eventData.element, eventData.viewport);return false;}function mouseWheelCallback(e, eventData){var ticks=-eventData.direction / 4;zoom(eventData.element, eventData.viewport, ticks);}function touchPinchCallback(e, eventData){var pinchData=eventData;zoom(pinchData.element, pinchData.viewport, pinchData.direction / 4);}function zoomTouchDrag(e, eventData){var dragData=eventData;var ticks=dragData.deltaPoints.page.y / 100;zoom(dragData.element, dragData.viewport, ticks);var newCoords=cornerstone.pageToPixel(dragData.element, dragData.startPoints.page.x, dragData.startPoints.page.y);dragData.viewport.translation.x -= dragData.startPoints.image.x - newCoords.x;dragData.viewport.translation.y -= dragData.startPoints.image.y - newCoords.y;cornerstone.setViewport(dragData.element, dragData.viewport);return false;}cornerstoneTools.zoom = cornerstoneTools.simpleMouseButtonTool(mouseDownCallback);cornerstoneTools.zoomWheel = cornerstoneTools.mouseWheelTool(mouseWheelCallback);cornerstoneTools.zoomTouchPinch = cornerstoneTools.touchPinchTool(touchPinchCallback);cornerstoneTools.zoomTouchDrag = cornerstoneTools.touchDragTool(zoomTouchDrag);return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneMath, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}var lastScale=1;var processingTouch=false;var startPoints;var lastPoints, touchEventDetail, eventData;function activateMouseDown(mouseEventDetail){$(mouseEventDetail.element).trigger("CornerstoneToolsDragStartActive", mouseEventDetail);}function onTouch(e){e.gesture.preventDefault();e.gesture.stopPropagation();if(processingTouch === true){return;}var element=e.currentTarget;var event;if(e.type === "transform"){var scale=lastScale - e.gesture.scale;lastScale = e.gesture.scale;var tranformEvent={event:e, viewport:cornerstone.getViewport(element), mage:cornerstone.getEnabledElement(element).image, element:element, direction:scale < 0?1:-1};event = jQuery.Event("CornerstoneToolsTouchPinch", tranformEvent);$(tranformEvent.element).trigger(event, tranformEvent);}else if(e.type === "touch"){startPoints = {page:cornerstoneMath.point.pageToPoint(e.gesture.touches[0]), image:cornerstone.pageToPixel(element, e.gesture.touches[0].pageX, e.gesture.touches[0].pageY)};touchEventDetail = {event:e, viewport:cornerstone.getViewport(element), image:cornerstone.getEnabledElement(element).image, element:element, startPoints:startPoints, lastPoints:lastPoints, currentPoints:startPoints, deltaPoints:{x:0, y:0}};event = jQuery.Event("CornerstoneToolsDragStart", touchEventDetail);$(touchEventDetail.element).trigger(event, touchEventDetail);lastPoints = cornerstoneTools.copyPoints(startPoints);if(event.isImmediatePropagationStopped() === false){if(activateMouseDown(touchEventDetail) === true){return cornerstoneTools.pauseEvent(e);}}}else if(e.type === "drag"){currentPoints = {page:cornerstoneMath.point.pageToPoint(e.gesture.touches[0]), image:cornerstone.pageToPixel(element, e.gesture.touches[0].pageX, e.gesture.touches[0].pageY)};deltaPoints = {page:cornerstoneMath.point.subtract(currentPoints.page, lastPoints.page), image:cornerstoneMath.point.subtract(currentPoints.image, lastPoints.image)};eventData = {viewport:cornerstone.getViewport(element), image:cornerstone.getEnabledElement(element).image, element:element, startPoints:startPoints, lastPoints:lastPoints, currentPoints:currentPoints, deltaPoints:deltaPoints};$(touchEventDetail.element).trigger("CornerstoneToolsTouchDrag", eventData);lastPoints = cornerstoneTools.copyPoints(currentPoints);}else if(e.type === "dragend"){var currentPoints={page:cornerstoneMath.point.pageToPoint(e.gesture.touches[0]), image:cornerstone.pageToPixel(element, e.gesture.touches[0].pageX, e.gesture.touches[0].pageY)};var deltaPoints={page:cornerstoneMath.point.subtract(currentPoints.page, lastPoints.page), image:cornerstoneMath.point.subtract(currentPoints.image, lastPoints.image)};eventData = {event:e, viewport:cornerstone.getViewport(element), image:cornerstone.getEnabledElement(element).image, element:element, startPoints:startPoints, lastPoints:lastPoints, currentPoints:currentPoints, deltaPoints:deltaPoints};event = jQuery.Event("CornerstoneToolsDragEnd", eventData);$(touchEventDetail.element).trigger(event, eventData);return cornerstoneTools.pauseEvent(e);}else {return;}processingTouch = false;}function enable(element){var hammerOptions={transform_always_block:true, transform_min_scale:0.01, drag_block_horizontal:true, drag_block_vertical:true, drag_min_distance:0};$(element).hammer(hammerOptions).on("touch drag transform dragstart dragend", onTouch);}function disable(element){$(element).hammer().off("touch drag transform dragstart dragend", onTouch);}cornerstoneTools.touchInput = {enable:enable, disable:disable};return cornerstoneTools;})($, cornerstone, cornerstoneMath, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneMath, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function anyHandlesOutsideImage(renderData, handles){var image=renderData.image;var imageRect={left:0, top:0, width:image.width, height:image.height};var handleOutsideImage=false;for(var property in handles) {var handle=handles[property];if(cornerstoneMath.point.insideRect(handle, imageRect) === false){handleOutsideImage = true;}}return handleOutsideImage;}cornerstoneTools.anyHandlesOutsideImage = anyHandlesOutsideImage;return cornerstoneTools;})($, cornerstone, cornerstoneMath, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}var handleRadius=6;function drawHandles(context, renderData, handles, color){context.strokeStyle = color;var radius=handleRadius / renderData.viewport.scale;for(var property in handles) {var handle=handles[property];if(handle.active || handle.highlight){context.beginPath();if(handle.active){context.lineWidth = 2 / renderData.viewport.scale;}else {context.lineWidth = 0.5 / renderData.viewport.scale;}context.arc(handle.x, handle.y, radius, 0, 2 * Math.PI);context.stroke();}}}cornerstoneTools.drawHandles = drawHandles;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneMath, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}var handleRadius=6;function findHandleNear(handles, imagePoint, scale){var handleRadiusScaled=handleRadius / scale;for(var property in handles) {var handle=handles[property];var distance=cornerstoneMath.point.distance(imagePoint, handle);if(distance <= handleRadiusScaled){return handle;}}return undefined;}function getActiveHandle(handles){for(var property in handles) {var handle=handles[property];if(handle.active === true){return handle;}}return undefined;}function handleActivator(handles, imagePoint, scale){var activeHandle=getActiveHandle(handles);var nearbyHandle=findHandleNear(handles, imagePoint, scale);if(activeHandle !== nearbyHandle){if(nearbyHandle !== undefined){nearbyHandle.active = true;}if(activeHandle !== undefined){activeHandle.active = false;}return true;}return false;}cornerstoneTools.handleActivator = handleActivator;return cornerstoneTools;})($, cornerstone, cornerstoneMath, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function moveHandle(mouseEventData, handle, doneMovingCallback, preventHandleOutsideImage){var element=mouseEventData.element;function mouseDragCallback(e, eventData){handle.x = eventData.currentPoints.image.x;handle.y = eventData.currentPoints.image.y;if(preventHandleOutsideImage){if(handle.x < 0){handle.x = 0;}if(handle.x > eventData.image.width){handle.x = eventData.image.width;}if(handle.y < 0){handle.y = 0;}if(handle.y > eventData.image.height){handle.y = eventData.image.height;}}cornerstone.updateImage(element);}$(element).on("CornerstoneToolsMouseDrag", mouseDragCallback);function mouseUpCallback(e, eventData){handle.eactive = false;$(element).off("CornerstoneToolsMouseDrag", mouseDragCallback);$(element).off("CornerstoneToolsMouseUp", mouseUpCallback);cornerstone.updateImage(element);doneMovingCallback();}$(element).on("CornerstoneToolsMouseUp", mouseUpCallback);}cornerstoneTools.moveHandle = moveHandle;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function touchmoveHandle(touchEventData, handle, doneMovingCallback){var element=touchEventData.element;function touchDragCallback(e, eventData){var toucheMoveData=eventData;handle.x = toucheMoveData.currentPoints.image.x;handle.y = toucheMoveData.currentPoints.image.y;cornerstone.updateImage(element);}$(element).on("CornerstoneToolsTouchDrag", touchDragCallback);function touchendCallback(mouseMoveData){handle.eactive = false;$(element).off("CornerstoneToolsTouchDrag", touchDragCallback);$(element).off("CornerstoneToolsDragEnd", touchendCallback);cornerstone.updateImage(element);doneMovingCallback();}$(element).on("CornerstoneToolsDragEnd", touchendCallback);}cornerstoneTools.touchmoveHandle = touchmoveHandle;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneMath, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function moveAllHandles(e, data, toolData, deleteIfHandleOutsideImage, preventHandleOutsideImage){var mouseEventData=e;var element=mouseEventData.element;function mouseDragCallback(e, eventData){for(var property in data.handles) {var handle=data.handles[property];handle.x += eventData.deltaPoints.image.x;handle.y += eventData.deltaPoints.image.y;if(preventHandleOutsideImage){if(handle.x < 0){handle.x = 0;}if(handle.x > eventData.image.width){handle.x = eventData.image.width;}if(handle.y < 0){handle.y = 0;}if(handle.y > eventData.image.height){handle.y = eventData.image.height;}}}cornerstone.updateImage(element);return false;}$(element).on("CornerstoneToolsMouseDrag", mouseDragCallback);function mouseUpCallback(e, eventData){data.moving = false;$(element).off("CornerstoneToolsMouseDrag", mouseDragCallback);$(element).off("CornerstoneToolsMouseUp", mouseUpCallback);if(deleteIfHandleOutsideImage === true){var image=eventData.image;var handleOutsideImage=false;var rect={top:0, left:0, width:image.width, height:image.height};for(var property in data.handles) {var handle=data.handles[property];if(cornerstoneMath.point.insideRect(handle, rect) === false){handleOutsideImage = true;}}if(handleOutsideImage){var indexOfData=-1;for(var i=0; i < toolData.data.length; i++) {if(toolData.data[i] === data){indexOfData = i;}}if(indexOfData !== -1){toolData.data.splice(indexOfData, 1);}}}cornerstone.updateImage(element);}$(element).on("CornerstoneToolsMouseUp", mouseUpCallback);return true;}cornerstoneTools.moveAllHandles = moveAllHandles;return cornerstoneTools;})($, cornerstone, cornerstoneMath, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneMath, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function touchmoveAllHandles(e, data, toolData, deleteIfHandleOutsideImage){var touchEventData=e;var element=touchEventData.element;function touchDragCallback(e, eventData){var touchMoveData=eventData;for(var property in data.handles) {var handle=data.handles[property];handle.x += touchMoveData.deltaPoints.image.x;handle.y += touchMoveData.deltaPoints.image.y;}cornerstone.updateImage(element);return false;}$(element).on("CornerstoneToolsTouchDrag", touchDragCallback);function touchendCallback(e, eventData){data.moving = false;var touchendData=eventData;$(element).off("CornerstoneToolsTouchDrag", touchDragCallback);$(element).off("CornerstoneToolsDragEnd", touchendCallback);if(deleteIfHandleOutsideImage === true){var image=touchendData.image;var handleOutsideImage=false;var rect={top:0, left:0, width:image.width, height:image.height};for(var property in data.handles) {var handle=data.handles[property];if(cornerstoneMath.point.insideRect(handle, rect) === false){handleOutsideImage = true;}}if(handleOutsideImage){var indexOfData=-1;for(var i=0; i < toolData.data.length; i++) {if(toolData.data[i] === data){indexOfData = i;}}if(indexOfData !== -1){toolData.data.splice(indexOfData, 1);}}}cornerstone.updateImage(element);}$(element).on("CornerstoneToolsDragEnd", touchendCallback);return true;}cornerstoneTools.touchmoveAllHandles = touchmoveAllHandles;return cornerstoneTools;})($, cornerstone, cornerstoneMath, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function LineSampleMeasurement(){var that=this;that.samples = [];this.set = function(samples){that.samples = samples;$(that).trigger("CornerstoneLineSampleUpdated");};}cornerstoneTools.LineSampleMeasurement = LineSampleMeasurement;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function MeasurementManager(){var that=this;that.measurements = [];this.add = function(measurement){var index=that.measurements.push(measurement);var eventDetail={index:index, measurement:measurement};$(that).trigger("CornerstoneMeasurementAdded", eventDetail);};this.remove = function(index){var measurement=that.measurements[index];that.measurements.splice(index, 1);var eventDetail={index:index, measurement:measurement};$(that).trigger("CornerstoneMeasurementRemoved", eventDetail);};}cornerstoneTools.MeasurementManager = new MeasurementManager();return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}var providers=[];function addProvider(provider){providers.push(provider);}function removeProvider(provider){var index=providers.indexOf(provider);if(index === -1){return;}providers.splice(index, 1);}function getMetaData(type, imageId){var result;$.each(providers, function(index, provider){result = provider(type, imageId);if(result !== undefined){return true;}});return result;}cornerstoneTools.metaData = {addProvider:addProvider, removeProvider:removeProvider, get:getMetaData};return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}if(cornerstoneTools.referenceLines === undefined){cornerstoneTools.referenceLines = {};}function calculateReferenceLine(targetImagePlane, referenceImagePlane){var tlhcPatient=referenceImagePlane.imagePositionPatient;var tlhcImage=cornerstoneTools.projectPatientPointToImagePlane(tlhcPatient, targetImagePlane);var brhcPatient=cornerstoneTools.imagePointToPatientPoint({x:referenceImagePlane.columns, y:referenceImagePlane.rows}, referenceImagePlane);var brhcImage=cornerstoneTools.projectPatientPointToImagePlane(brhcPatient, targetImagePlane);var referenceLineSegment={start:{x:tlhcImage.x, y:tlhcImage.y}, end:{x:brhcImage.x, y:brhcImage.y}};return referenceLineSegment;}cornerstoneTools.referenceLines.calculateReferenceLine = calculateReferenceLine;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}if(cornerstoneTools.referenceLines === undefined){cornerstoneTools.referenceLines = {};}var toolType="referenceLines";function onImageRendered(e, eventData){var toolData=cornerstoneTools.getToolState(e.currentTarget, toolType);if(toolData === undefined){return;}var syncContext=toolData.data[0].synchronizationContext;var enabledElements=syncContext.getSourceElements();var renderer=toolData.data[0].renderer;var context=eventData.canvasContext.canvas.getContext("2d");cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, context);$.each(enabledElements, function(index, referenceEnabledElement){if(referenceEnabledElement === e.currentTarget){return;}renderer(context, eventData, e.currentTarget, referenceEnabledElement);});}function enable(element, synchronizationContext, renderer){renderer = renderer || cornerstoneTools.referenceLines.renderActiveReferenceLine;cornerstoneTools.addToolState(element, toolType, {synchronizationContext:synchronizationContext, renderer:renderer});$(element).on("CornerstoneImageRendered", onImageRendered);cornerstone.updateImage(element);}function disable(element, synchronizationContext){$(element).off("CornerstoneImageRendered", onImageRendered);cornerstone.updateImage(element);}cornerstoneTools.referenceLines.tool = {enable:enable, disable:disable};return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}if(cornerstoneTools.referenceLines === undefined){cornerstoneTools.referenceLines = {};}function renderActiveReferenceLine(context, eventData, targetElement, referenceElement){var targetImage=cornerstone.getEnabledElement(targetElement).image;var referenceImage=cornerstone.getEnabledElement(referenceElement).image;if(targetImage === undefined || referenceImage === undefined){return;}var targetImagePlane=cornerstoneTools.metaData.get("imagePlane", targetImage.imageId);var referenceImagePlane=cornerstoneTools.metaData.get("imagePlane", referenceImage.imageId);if(targetImagePlane.frameOfReferenceUID != referenceImagePlane.frameOfReferenceUID){return;}var targetNormal=targetImagePlane.rowCosines.clone().cross(targetImagePlane.columnCosines);var referenceNormal=referenceImagePlane.rowCosines.clone().cross(referenceImagePlane.columnCosines);var angleInRadians=targetNormal.angleTo(referenceNormal);angleInRadians = Math.abs(angleInRadians);if(angleInRadians < 0.5){return;}var referenceLine=cornerstoneTools.referenceLines.calculateReferenceLine(targetImagePlane, referenceImagePlane);var color=cornerstoneTools.activeToolcoordinate.getActiveColor();context.beginPath();context.strokeStyle = color;context.lineWidth = 1 / eventData.viewport.scale;context.moveTo(referenceLine.start.x, referenceLine.start.y);context.lineTo(referenceLine.end.x, referenceLine.end.y);context.stroke();}cornerstoneTools.referenceLines.renderActiveReferenceLine = renderActiveReferenceLine;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}var toolType="playClip";function playClip(element, framesPerSecond){if(element === undefined){throw "playClip: element must not be undefined";}if(framesPerSecond === undefined){framesPerSecond = 30;}var stackToolData=cornerstoneTools.getToolState(element, "stack");if(stackToolData === undefined || stackToolData.data === undefined || stackToolData.data.length === 0){return;}var stackData=stackToolData.data[0];var playClipToolData=cornerstoneTools.getToolState(element, toolType);var playClipData;if(playClipToolData === undefined || playClipToolData.data.length === 0){playClipData = {intervalId:undefined, framesPerSecond:framesPerSecond, lastFrameTimeStamp:undefined, frameRate:0};cornerstoneTools.addToolState(element, toolType, playClipData);}else {playClipData = playClipToolData.data[0];playClipData.framesPerSecond = framesPerSecond;}if(playClipData.intervalId !== undefined){return;}playClipData.intervalId = setInterval(function(){var newImageIdIndex=stackData.currentImageIdIndex;if(playClipData.framesPerSecond > 0){newImageIdIndex++;}else {newImageIdIndex--;}if(newImageIdIndex >= stackData.imageIds.length){newImageIdIndex = 0;}if(newImageIdIndex < 0){newImageIdIndex = stackData.imageIds.length - 1;}if(newImageIdIndex !== stackData.currentImageIdIndex){var viewport=cornerstone.getViewport(element);cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]).then(function(image){stackData.currentImageIdIndex = newImageIdIndex;cornerstone.displayImage(element, image, viewport);});}}, 1000 / Math.abs(playClipData.framesPerSecond));}function stopClip(element){var playClipToolData=cornerstoneTools.getToolState(element, toolType);var playClipData;if(playClipToolData === undefined || playClipToolData.data.length === 0){return;}else {playClipData = playClipToolData.data[0];}clearInterval(playClipData.intervalId);playClipData.intervalId = undefined;}cornerstoneTools.playClip = playClip;cornerstoneTools.stopClip = stopClip;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}var toolType="stackPrefetch";function prefetch(element){var stackData=cornerstoneTools.getToolState(element, "stack");if(stackData === undefined || stackData.data === undefined || stackData.data.length === 0){return;}var stackPrefetchData=cornerstoneTools.getToolState(element, toolType);if(stackPrefetchData === undefined){return;}var stackPrefetch=stackPrefetchData.data[0];var stack=stackData.data[0];if(stack.enabled === false){return;}var stackPrefetchImageIdIndex=stackPrefetch.prefetchImageIdIndex + 1;stackPrefetchImageIdIndex = Math.min(stack.imageIds.length - 1, stackPrefetchImageIdIndex);stackPrefetchImageIdIndex = Math.max(0, stackPrefetchImageIdIndex);if(stackPrefetchImageIdIndex === stackPrefetch.prefetchImageIdIndex){stackPrefetch.enabled = false;return;}stackPrefetch.prefetchImageIdIndex = stackPrefetchImageIdIndex;var imageId=stack.imageIds[stackPrefetchImageIdIndex];var loadImageDeferred=cornerstone.loadAndCacheImage(imageId);loadImageDeferred.done(function(image){if(stack.enabled === false){return;}setTimeout(function(){prefetch(element);}, 1);});}function enable(element){var stackPrefetchData=cornerstoneTools.getToolState(element, toolType);if(stackPrefetchData === undefined){stackPrefetchData = {prefetchImageIdIndex:0, enabled:true};cornerstoneTools.addToolState(element, toolType, stackPrefetchData);}prefetch(element);}function disable(element){var stackPrefetchData=cornerstoneTools.getToolState(element, toolType);if(stackPrefetchData === undefined){stackPrefetchData = {prefetchImageIdIndex:0, enabled:false};cornerstoneTools.removeToolState(element, toolType, stackPrefetchData);}else {stackPrefetchData.enabled = false;}}cornerstoneTools.stackPrefetch = {enable:enable, disable:disable};return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}var toolType="stackScroll";function scroll(element, images){var toolData=cornerstoneTools.getToolState(element, "stack");if(toolData === undefined || toolData.data === undefined || toolData.data.length === 0){return;}var stackData=toolData.data[0];var newImageIdIndex=stackData.currentImageIdIndex + images;newImageIdIndex = Math.min(stackData.imageIds.length - 1, newImageIdIndex);newImageIdIndex = Math.max(0, newImageIdIndex);if(newImageIdIndex !== stackData.currentImageIdIndex){var viewport=cornerstone.getViewport(element);cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]).then(function(image){stackData = toolData.data[0];if(stackData.newImageIdIndex !== newImageIdIndex){stackData.currentImageIdIndex = newImageIdIndex;cornerstone.displayImage(element, image, viewport);}});}}function mouseUpCallback(e, eventData){$(eventData.element).off("CornerstoneToolsMouseDrag", mouseDragCallback);$(eventData.element).off("CornerstoneToolsMouseUp", mouseUpCallback);}function mouseDownCallback(e, eventData){if(cornerstoneTools.isMouseButtonEnabled(eventData.which, e.data.mouseButtonMask)){var mouseDragEventData={deltaY:0, options:e.data.options};$(eventData.element).on("CornerstoneToolsMouseDrag", mouseDragEventData, mouseDragCallback);$(eventData.element).on("CornerstoneToolsMouseUp", mouseUpCallback);e.stopImmediatePropagation();return false;}}function mouseDragCallback(e, eventData){e.data.deltaY += eventData.deltaPoints.page.y;var toolData=cornerstoneTools.getToolState(eventData.element, "stack");if(toolData === undefined || toolData.data === undefined || toolData.data.length === 0){return;}var stackData=toolData.data[0];var pixelsPerImage=$(eventData.element).height() / stackData.imageIds.length;if(e.data.options !== undefined && e.data.options.stackScrollSpeed !== undefined){pixelsPerImage = e.data.options.stackScrollSpeed;}if(e.data.deltaY >= pixelsPerImage || e.data.deltaY <= -pixelsPerImage){var imageDelta=e.data.deltaY / pixelsPerImage;var imageDeltaMod=e.data.deltaY % pixelsPerImage;var imageIdIndexOffset=Math.round(imageDelta);e.data.deltaY = imageDeltaMod;var imageIdIndex=stackData.currentImageIdIndex + imageIdIndexOffset;imageIdIndex = Math.min(stackData.imageIds.length - 1, imageIdIndex);imageIdIndex = Math.max(0, imageIdIndex);if(imageIdIndex !== stackData.currentImageIdIndex){stackData.currentImageIdIndex = imageIdIndex;var viewport=cornerstone.getViewport(eventData.element);cornerstone.loadAndCacheImage(stackData.imageIds[imageIdIndex]).then(function(image){var stackData=toolData.data[0];if(stackData.currentImageIdIndex === imageIdIndex){cornerstone.displayImage(eventData.element, image, viewport);}});}}return false;}function mouseWheelCallback(e, eventData){var images=-eventData.direction;scroll(eventData.element, images);}function onDrag(e){var mouseMoveData=e.originalEvent.detail;var eventData={deltaY:0};eventData.deltaY += mouseMoveData.deltaPoints.page.y;var toolData=cornerstoneTools.getToolState(mouseMoveData.element, "stack");if(toolData === undefined || toolData.data === undefined || toolData.data.length === 0){return;}var stackData=toolData.data[0];if(eventData.deltaY >= 3 || eventData.deltaY <= -3){var imageDelta=eventData.deltaY / 3;var imageDeltaMod=eventData.deltaY % 3;var imageIdIndexOffset=Math.round(imageDelta);eventData.deltaY = imageDeltaMod;var imageIdIndex=stackData.currentImageIdIndex + imageIdIndexOffset;imageIdIndex = Math.min(stackData.imageIds.length - 1, imageIdIndex);imageIdIndex = Math.max(0, imageIdIndex);if(imageIdIndex !== stackData.currentImageIdIndex){stackData.currentImageIdIndex = imageIdIndex;var viewport=cornerstone.getViewport(mouseMoveData.element);cornerstone.loadAndCacheImage(stackData.imageIds[imageIdIndex]).then(function(image){cornerstone.displayImage(mouseMoveData.element, image, viewport);});}}return false;}cornerstoneTools.stackScroll = cornerstoneTools.simpleMouseButtonTool(mouseDownCallback);cornerstoneTools.stackScrollWheel = cornerstoneTools.mouseWheelTool(mouseWheelCallback);cornerstoneTools.stackScrollTouchDrag = cornerstoneTools.touchDragTool(onDrag);return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function activeToolcoordinate(){var cooordsData="", selectionColor="greenyellow", toolsColor="white";function setActiveToolCoords(eventData){cooordsData = eventData.currentPoints.image;}function getActiveToolCoords(){return cooordsData;}function setActivecolor(color){selectionColor = color;}function getActivecolor(){return selectionColor;}function setToolcolor(toolcolor){toolsColor = toolcolor;}function getToolcolor(){return toolsColor;}var activeTool={setToolColor:setToolcolor, setActiveColor:setActivecolor, getToolColor:getToolcolor, getActiveColor:getActivecolor, setCoords:setActiveToolCoords, getCoords:getActiveToolCoords};return activeTool;}function newImageIdSpecificToolStateManager(){var toolState={};function addImageIdSpecificToolState(element, toolType, data){var enabledImage=cornerstone.getEnabledElement(element);if(toolState.hasOwnProperty(enabledImage.image.imageId) === false){toolState[enabledImage.image.imageId] = {};}var imageIdToolState=toolState[enabledImage.image.imageId];if(imageIdToolState.hasOwnProperty(toolType) === false){imageIdToolState[toolType] = {data:[]};}var toolData=imageIdToolState[toolType];toolData.data.push(data);}function getImageIdSpecificToolState(element, toolType){var enabledImage=cornerstone.getEnabledElement(element);if(toolState.hasOwnProperty(enabledImage.image.imageId) === false){return undefined;}var imageIdToolState=toolState[enabledImage.image.imageId];if(imageIdToolState.hasOwnProperty(toolType) === false){return undefined;}var toolData=imageIdToolState[toolType];return toolData;}var imageIdToolStateManager={get:getImageIdSpecificToolState, add:addImageIdSpecificToolState};return imageIdToolStateManager;}var globalImageIdSpecificToolStateManager=newImageIdSpecificToolStateManager();var activetoolsData=activeToolcoordinate();cornerstoneTools.newImageIdSpecificToolStateManager = newImageIdSpecificToolStateManager;cornerstoneTools.globalImageIdSpecificToolStateManager = globalImageIdSpecificToolStateManager;cornerstoneTools.activeToolcoordinate = activetoolsData;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function newStackSpecificToolStateManager(toolTypes, oldStateManager){var toolState={};function addStackSpecificToolState(element, toolType, data){if(toolTypes.indexOf(toolType) >= 0){var enabledImage=cornerstone.getEnabledElement(element);if(toolState.hasOwnProperty(toolType) === false){toolState[toolType] = {data:[]};}var toolData=toolState[toolType];toolData.data.push(data);}else {return oldStateManager.add(element, toolType, data);}}function getStackSpecificToolState(element, toolType){if(toolTypes.indexOf(toolType) >= 0){if(toolState.hasOwnProperty(toolType) === false){toolState[toolType] = {data:[]};}var toolData=toolState[toolType];return toolData;}else {return oldStateManager.get(element, toolType);}}var imageIdToolStateManager={get:getStackSpecificToolState, add:addStackSpecificToolState};return imageIdToolStateManager;}var stackStateManagers=[];function addStackStateManager(element){var oldStateManager=cornerstoneTools.getElementToolStateManager(element);if(oldStateManager === undefined){oldStateManager = cornerstoneTools.globalImageIdSpecificToolStateManager;}var stackTools=["stack", "stackScroll", "playClip", "volume", "slab", "referenceLines"];var stackSpecificStateManager=cornerstoneTools.newStackSpecificToolStateManager(stackTools, oldStateManager);stackStateManagers.push(stackSpecificStateManager);cornerstoneTools.setElementToolStateManager(element, stackSpecificStateManager);}cornerstoneTools.newStackSpecificToolStateManager = newStackSpecificToolStateManager;cornerstoneTools.addStackStateManager = addStackStateManager;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function newTimeSeriesSpecificToolStateManager(toolTypes, oldStateManager){var toolState={};function addStackSpecificToolState(element, toolType, data){if(toolTypes.indexOf(toolType) >= 0){var enabledImage=cornerstone.getEnabledElement(element);if(toolState.hasOwnProperty(toolType) === false){toolState[toolType] = {data:[]};}var toolData=toolState[toolType];toolData.data.push(data);}else {return oldStateManager.add(element, toolType, data);}}function getStackSpecificToolState(element, toolType){if(toolTypes.indexOf(toolType) >= 0){if(toolState.hasOwnProperty(toolType) === false){toolState[toolType] = {data:[]};}var toolData=toolState[toolType];return toolData;}else {return oldStateManager.get(element, toolType);}}var imageIdToolStateManager={get:getStackSpecificToolState, add:addStackSpecificToolState};return imageIdToolStateManager;}var timeSeriesStateManagers=[];function addTimeSeriesStateManager(element, tools){tools = tools || ["timeSeries"];var oldStateManager=cornerstoneTools.getElementToolStateManager(element);if(oldStateManager === undefined){oldStateManager = cornerstoneTools.globalImageIdSpecificToolStateManager;}var timeSeriesSpecificStateManager=cornerstoneTools.newTimeSeriesSpecificToolStateManager(tools, oldStateManager);timeSeriesStateManagers.push(timeSeriesSpecificStateManager);cornerstoneTools.setElementToolStateManager(element, timeSeriesSpecificStateManager);}cornerstoneTools.newTimeSeriesSpecificToolStateManager = newTimeSeriesSpecificToolStateManager;cornerstoneTools.addTimeSeriesStateManager = addTimeSeriesStateManager;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function getElementToolStateManager(element){var enabledImage=cornerstone.getEnabledElement(element);if(enabledImage.toolStateManager === undefined){enabledImage.toolStateManager = cornerstoneTools.globalImageIdSpecificToolStateManager;}return enabledImage.toolStateManager;}function addToolState(element, toolType, data){var toolStateManager=getElementToolStateManager(element);toolStateManager.add(element, toolType, data);}function getToolState(element, toolType){var toolStateManager=getElementToolStateManager(element);return toolStateManager.get(element, toolType);}function removeToolState(element, toolType, data){var toolStateManager=getElementToolStateManager(element);var toolData=toolStateManager.get(element, toolType);var indexOfData=-1;for(var i=0; i < toolData.data.length; i++) {if(toolData.data[i] === data){indexOfData = i;}}if(indexOfData !== -1){toolData.data.splice(indexOfData, 1);}}function setElementToolStateManager(element, toolStateManager){var enabledImage=cornerstone.getEnabledElement(element);enabledImage.toolStateManager = toolStateManager;}cornerstoneTools.addToolState = addToolState;cornerstoneTools.getToolState = getToolState;cornerstoneTools.removeToolState = removeToolState;cornerstoneTools.setElementToolStateManager = setElementToolStateManager;cornerstoneTools.getElementToolStateManager = getElementToolStateManager;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function panZoomSynchronizer(synchronizer, sourceElement, targetElement){if(targetElement === sourceElement){return;}var sourceViewport=cornerstone.getViewport(sourceElement);var targetViewport=cornerstone.getViewport(targetElement);if(targetViewport.scale === sourceViewport.scale && targetViewport.translation.x === sourceViewport.translation.x && targetViewport.translation.y === sourceViewport.translation.y){return;}targetViewport.scale = sourceViewport.scale;targetViewport.translation.x = sourceViewport.translation.x;targetViewport.translation.y = sourceViewport.translation.y;synchronizer.setViewport(targetElement, targetViewport);}cornerstoneTools.panZoomSynchronizer = panZoomSynchronizer;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function stackImageIndexSynchronizer(synchronizer, sourceElement, targetElement){if(targetElement === sourceElement){return;}var sourceStackToolDataSource=cornerstoneTools.getToolState(sourceElement, "stack");var sourceStackData=sourceStackToolDataSource.data[0];var targetStackToolDataSource=cornerstoneTools.getToolState(targetElement, "stack");var targetStackData=targetStackToolDataSource.data[0];var newImageIdIndex=sourceStackData.currentImageIdIndex;newImageIdIndex = Math.min(Math.max(newImageIdIndex, 0), targetStackData.imageIds.length - 1);if(newImageIdIndex === targetStackData.currentImageIdIndex){return;}cornerstone.loadAndCacheImage(targetStackData.imageIds[newImageIdIndex]).then(function(image){var viewport=cornerstone.getViewport(targetElement);targetStackData.currentImageIdIndex = newImageIdIndex;synchronizer.displayImage(targetElement, image, viewport);});}cornerstoneTools.stackImageIndexSynchronizer = stackImageIndexSynchronizer;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function stackImagePositionSynchronizer(synchronizer, sourceElement, targetElement){if(targetElement === sourceElement){return;}var sourceImage=cornerstone.getEnabledElement(sourceElement).image;var sourceImagePlane=cornerstoneTools.metaData.get("imagePlane", sourceImage.imageId);var sourceImagePosition=sourceImagePlane.imagePositionPatient;var stackToolDataSource=cornerstoneTools.getToolState(targetElement, "stack");var stackData=stackToolDataSource.data[0];var minDistance=Number.MAX_VALUE;var newImageIdIndex=-1;$.each(stackData.imageIds, function(index, imageId){var imagePlane=cornerstoneTools.metaData.get("imagePlane", imageId);var imagePosition=imagePlane.imagePositionPatient;var distance=imagePosition.distanceToSquared(sourceImagePosition);if(distance < minDistance){minDistance = distance;newImageIdIndex = index;}});if(newImageIdIndex === stackData.currentImageIdIndex){return;}if(newImageIdIndex !== -1){cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]).then(function(image){var viewport=cornerstone.getViewport(targetElement);stackData.currentImageIdIndex = newImageIdIndex;synchronizer.displayImage(targetElement, image, viewport);});}}cornerstoneTools.stackImagePositionSynchronizer = stackImagePositionSynchronizer;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function Synchronizer(event, handler){var that=this;var sourceElements=[];var targetElements=[];var ignoreFiredEvents=false;function fireEvent(sourceEnabledElement){ignoreFiredEvents = true;$.each(targetElements, function(index, targetEnabledElement){handler(that, sourceEnabledElement, targetEnabledElement);});ignoreFiredEvents = false;}function onEvent(e){if(ignoreFiredEvents === true){return;}fireEvent(e.currentTarget);}this.addSource = function(element){var index=sourceElements.indexOf(element);if(index !== -1){return;}sourceElements.push(element);$(element).on(event, onEvent);fireEvent(element);};this.addTarget = function(element){var index=targetElements.indexOf(element);if(index !== -1){return;}targetElements.push(element);handler(that, element, element);};this.add = function(element){that.addSource(element);that.addTarget(element);};this.removeSource = function(element){var index=sourceElements.indexOf(element);if(index === -1){return;}sourceElements.splice(index, 1);$(element).off(event, onEvent);fireEvent(element);};this.removeTarget = function(element){var index=targetElements.indexOf(element);if(index === -1){return;}targetElements.splice(index, 1);handler(that, element, element);};this.remove = function(element){that.removeTarget(element);that.removeSource(element);};this.getSourceElements = function(){return sourceElements;};this.displayImage = function(element, image, viewport){ignoreFiredEvents = true;cornerstone.displayImage(element, image, viewport);ignoreFiredEvents = false;};this.setViewport = function(element, viewport){ignoreFiredEvents = true;cornerstone.setViewport(element, viewport);ignoreFiredEvents = false;};}cornerstoneTools.Synchronizer = Synchronizer;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function updateImageSynchronizer(synchronizer, sourceElement, targetElement){if(targetElement === sourceElement){return;}cornerstone.updateImage(targetElement);}cornerstoneTools.updateImageSynchronizer = updateImageSynchronizer;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function wwwcSynchronizer(synchronizer, sourceElement, targetElement){if(targetElement === sourceElement){return;}var sourceViewport=cornerstone.getViewport(sourceElement);var targetViewport=cornerstone.getViewport(targetElement);if(targetViewport.voi.windowWidth === sourceViewport.voi.windowWidth && targetViewport.voi.windowCenter === sourceViewport.voi.windowCenter && targetViewport.invert === sourceViewport.invert){return;}targetViewport.voi.windowWidth = sourceViewport.voi.windowWidth;targetViewport.voi.windowCenter = sourceViewport.voi.windowCenter;targetViewport.invert = sourceViewport.invert;synchronizer.setViewport(targetElement, targetViewport);}cornerstoneTools.wwwcSynchronizer = wwwcSynchronizer;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}var toolType="probe4D";function updateLineSample(measurementData){var samples=[];measurementData.timeSeries.stacks.forEach(function(stack){cornerstone.loadAndCacheImage(stack.imageIds[measurementData.imageIdIndex]).then(function(image){var offset=Math.round(measurementData.handles.end.x) + Math.round(measurementData.handles.end.y) * image.width;var sample=image.getPixelData()[offset];samples.push(sample);});});measurementData.lineSample.set(samples);}function createNewMeasurement(mouseEventData){var timeSeriestoolData=cornerstoneTools.getToolState(mouseEventData.element, "timeSeries");if(timeSeriestoolData === undefined || timeSeriestoolData.data === undefined || timeSeriestoolData.data.length === 0){return;}var timeSeries=timeSeriestoolData.data[0];var measurementData={timeSeries:timeSeries, lineSample:new cornerstoneTools.LineSampleMeasurement(), imageIdIndex:timeSeries.stacks[timeSeries.currentStackIndex].currentImageIdIndex, visible:true, handles:{end:{x:mouseEventData.currentPoints.image.x, y:mouseEventData.currentPoints.image.y, highlight:true, active:true}}};updateLineSample(measurementData);cornerstoneTools.MeasurementManager.add(measurementData);return measurementData;}function onImageRendered(e, eventData){var toolData=cornerstoneTools.getToolState(e.currentTarget, toolType);if(toolData === undefined){return;}var context=eventData.canvasContext.canvas.getContext("2d");cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, context);var color="white";for(var i=0; i < toolData.data.length; i++) {context.save();var data=toolData.data[i];context.beginPath();cornerstoneTools.drawHandles(context, eventData, data.handles, color);context.stroke();var fontParameters=cornerstoneTools.setContextToDisplayFontSize(eventData.enabledElement, eventData.canvasContext, 15);context.font = "" + fontParameters.fontSize + "px Arial";var x=Math.round(data.handles.end.x);var y=Math.round(data.handles.end.y);textX = data.handles.end.x + 3;textY = data.handles.end.y - 3;var textX=textX / fontParameters.fontScale;var textY=textY / fontParameters.fontScale;context.fillStyle = "white";context.fillText("" + x + "," + y, textX, textY);context.restore();}}cornerstoneTools.probeTool4D = cornerstoneTools.mouseButtonTool({createNewMeasurement:createNewMeasurement, onImageRendered:onImageRendered, toolType:toolType});return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}var toolType="timeSeriesScroll";function incrementTimePoint(element, timePoints, wrap){var toolData=cornerstoneTools.getToolState(element, "timeSeries");if(toolData === undefined || toolData.data === undefined || toolData.data.length === 0){return;}var timeSeriesData=toolData.data[0];var currentStack=timeSeriesData.stacks[timeSeriesData.currentStackIndex];var currentImageIdIndex=currentStack.currentImageIdIndex;var newStackIndex=timeSeriesData.currentStackIndex + timePoints;if(wrap){if(newStackIndex >= timeSeriesData.stacks.length){newStackIndex = 0;}if(newStackIndex < 0){newStackIndex = timeSeriesData.stacks.length - 1;}}else {newStackIndex = Math.min(timeSeriesData.stacks.length - 1, newStackIndex);newStackIndex = Math.max(0, newStackIndex);}if(newStackIndex !== timeSeriesData.currentStackIndex){var viewport=cornerstone.getViewport(element);var newStack=timeSeriesData.stacks[newStackIndex];cornerstone.loadAndCacheImage(newStack.imageIds[currentImageIdIndex]).then(function(image){if(timeSeriesData.currentImageIdIndex !== currentImageIdIndex){newStack.currentImageIdIndex = currentImageIdIndex;timeSeriesData.currentStackIndex = newStackIndex;cornerstone.displayImage(element, image, viewport);}});}}cornerstoneTools.incrementTimePoint = incrementTimePoint;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}var toolType="timeSeriesPlayer";function playClip(element, framesPerSecond){if(element === undefined){throw "playClip: element must not be undefined";}if(framesPerSecond === undefined){framesPerSecond = 30;}var timeSeriesToolData=cornerstoneTools.getToolState(element, "timeSeries");if(timeSeriesToolData === undefined || timeSeriesToolData.data === undefined || timeSeriesToolData.data.length === 0){return;}var timeSeriesData=timeSeriesToolData.data[0];var playClipToolData=cornerstoneTools.getToolState(element, toolType);var playClipData;if(playClipToolData === undefined || playClipToolData.data.length === 0){playClipData = {intervalId:undefined, framesPerSecond:framesPerSecond, lastFrameTimeStamp:undefined, frameRate:0};cornerstoneTools.addToolState(element, toolType, playClipData);}else {playClipData = playClipToolData.data[0];playClipData.framesPerSecond = framesPerSecond;}if(playClipData.intervalId !== undefined){return;}playClipData.intervalId = setInterval(function(){var currentImageIdIndex=timeSeriesData.stacks[timeSeriesData.currentStackIndex].currentImageIdIndex;var newStackIndex=timeSeriesData.currentStackIndex;if(playClipData.framesPerSecond > 0){cornerstoneTools.incrementTimePoint(element, 1, true);}else {cornerstoneTools.incrementTimePoint(element, -1, true);}}, 1000 / Math.abs(playClipData.framesPerSecond));}function stopClip(element){var playClipToolData=cornerstoneTools.getToolState(element, toolType);var playClipData;if(playClipToolData === undefined || playClipToolData.data.length === 0){return;}else {playClipData = playClipToolData.data[0];}clearInterval(playClipData.intervalId);playClipData.intervalId = undefined;}cornerstoneTools.timeSeriesPlayer = {start:playClip, stop:stopClip};return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}var toolType="timeSeriesScroll";function mouseUpCallback(e, eventData){$(eventData.element).off("CornerstoneToolsMouseDrag", mouseDragCallback);$(eventData.element).off("CornerstoneToolsMouseUp", mouseUpCallback);}function mouseDownCallback(e, eventData){if(cornerstoneTools.isMouseButtonEnabled(eventData.which, e.data.mouseButtonMask)){var mouseDragEventData={deltaY:0, options:e.data.options};$(eventData.element).on("CornerstoneToolsMouseDrag", mouseDragEventData, mouseDragCallback);$(eventData.element).on("CornerstoneToolsMouseUp", mouseUpCallback);e.stopImmediatePropagation();return false;}}function mouseDragCallback(e, eventData){e.data.deltaY += eventData.deltaPoints.page.y;var toolData=cornerstoneTools.getToolState(eventData.element, "timeSeries");if(toolData === undefined || toolData.data === undefined || toolData.data.length === 0){return;}var timeSeriesData=toolData.data[0];var pixelsPerTimeSeries=$(eventData.element).height() / timeSeriesData.stacks.length;if(e.data.options !== undefined && e.data.options.timeSeriesScrollSpeed !== undefined){pixelsPerTimeSeries = e.data.options.timeSeriesScrollSpeed;}if(e.data.deltaY >= pixelsPerTimeSeries || e.data.deltaY <= -pixelsPerTimeSeries){var timeSeriesDelta=Math.round(e.data.deltaY / pixelsPerTimeSeries);var timeSeriesDeltaMod=e.data.deltaY % pixelsPerTimeSeries;cornerstoneTools.incrementTimePoint(eventData.element, timeSeriesDelta);e.data.deltaY = timeSeriesDeltaMod;}return false;}function mouseWheelCallback(e, eventData){var images=-eventData.direction;cornerstoneTools.incrementTimePoint(eventData.element, images);}function onDrag(e){var mouseMoveData=e.originalEvent.detail;var eventData={deltaY:0};eventData.deltaY += mouseMoveData.deltaPoints.page.y;var toolData=cornerstoneTools.getToolState(mouseMoveData.element, "stack");if(toolData === undefined || toolData.data === undefined || toolData.data.length === 0){return;}if(eventData.deltaY >= 3 || eventData.deltaY <= -3){var timeSeriesDelta=eventData.deltaY / 3;var timeSeriesDeltaMod=eventData.deltaY % 3;cornerstoneTools.setTimePoint(eventData.element, timeSeriesDelta);eventData.deltaY = timeSeriesDeltaMod;}return false;}cornerstoneTools.timeSeriesScroll = cornerstoneTools.simpleMouseButtonTool(mouseDownCallback);cornerstoneTools.timeSeriesScrollWheel = cornerstoneTools.mouseWheelTool(mouseWheelCallback);cornerstoneTools.timeSeriesScrollTouchDrag = cornerstoneTools.touchDragTool(onDrag);return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function roundToDecimal(value, precision){var multiplier=Math.pow(10, precision);return Math.round(value * multiplier) / multiplier;}cornerstoneTools.roundToDecimal = roundToDecimal;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneMath, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function copyPoints(points){var page=cornerstoneMath.point.copy(points.page);var image=cornerstoneMath.point.copy(points.image);return {page:page, image:image};}cornerstoneTools.copyPoints = copyPoints;return cornerstoneTools;})($, cornerstone, cornerstoneMath, cornerstoneTools);var cornerstoneTools=(function(cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function drawEllipse(ctx, x, y, w, h){var kappa=0.5522848, ox=w / 2 * kappa, oy=h / 2 * kappa, xe=x + w, ye=y + h, xm=x + w / 2, ym=y + h / 2;ctx.beginPath();ctx.moveTo(x, ym);ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);ctx.closePath();ctx.stroke();}cornerstoneTools.drawEllipse = drawEllipse;return cornerstoneTools;})(cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function isMouseButtonEnabled(which, mouseButtonMask){var mouseButton=1 << which - 1;return (mouseButtonMask & mouseButton) !== 0;}cornerstoneTools.isMouseButtonEnabled = isMouseButtonEnabled;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}function pauseEvent(e){if(e.stopPropagation){e.stopPropagation();}if(e.preventDefault){e.preventDefault();}e.cancelBubble = true;e.returnValue = false;return false;}cornerstoneTools.pauseEvent = pauseEvent;return cornerstoneTools;})($, cornerstone, cornerstoneTools);var cornerstoneTools=(function($, cornerstone, cornerstoneTools){"use strict";if(cornerstoneTools === undefined){cornerstoneTools = {};}if(cornerstoneTools.referenceLines === undefined){cornerstoneTools.referenceLines = {};}function projectPatientPointToImagePlane(patientPoint, imagePlane){var point=patientPoint.clone().sub(imagePlane.imagePositionPatient);var x=imagePlane.columnCosines.dot(point) / imagePlane.columnPixelSpacing;var y=imagePlane.rowCosines.dot(point) / imagePlane.rowPixelSpacing;var imagePoint={x:x, y:y};return imagePoint;}function imagePointToPatientPoint(imagePoint, imagePlane){var x=imagePlane.columnCosines.clone().multiplyScalar(imagePoint.x);x.multiplyScalar(imagePlane.columnPixelSpacing);var y=imagePlane.rowCosines.clone().multiplyScalar(imagePoint.y);y.multiplyScalar(imagePlane.rowPixelSpacing);var patientPoint=x.add(y);patientPoint.add(imagePlane.imagePositionPatient);return patientPoint;}cornerstoneTools.projectPatientPointToImagePlane = projectPatientPointToImagePlane;cornerstoneTools.imagePointToPatientPoint = imagePointToPatientPoint;return cornerstoneTools;})($, cornerstone, cornerstoneTools);(function(cornerstone){"use strict";if(cornerstone === undefined){cornerstone = {};}function setContextToDisplayFontSize(ee, context, fontSize){var fontScale=0.1;cornerstone.setToPixelCoordinateSystem(ee, context, fontScale);var scaledFontSize=fontSize / ee.viewport.scale / fontScale;var lineHeight=fontSize / ee.viewport.scale / fontScale;return {fontSize:scaledFontSize, lineHeight:lineHeight, fontScale:fontScale};}cornerstoneTools.setContextToDisplayFontSize = setContextToDisplayFontSize;return cornerstone;})(cornerstone);module.exports = cornerstoneTools;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var riot = _interopRequire(__webpack_require__(10));
	
	var pako = _interopRequire(__webpack_require__(33));
	
	var NiftiGzipUint16Image = (function () {
	    function NiftiGzipUint16Image(file) {
	        var _this = this;
	
	        _classCallCheck(this, NiftiGzipUint16Image);
	
	        riot.observable(this);
	
	        if (!file.name.match(/.nii.gz$/)) {
	            throw "Unsupported file format, expected .nii.gz file.";
	        }
	
	        this.file = file;
	        this.reader = new FileReader();
	        this.reader.onloadend = function (file) {
	            return _this.fileLoaded(file);
	        };
	        this.reader.readAsArrayBuffer(this.file);
	
	        this.IMAGE_READY = "image_ready";
	    }
	
	    _createClass(NiftiGzipUint16Image, {
	        getScheme: {
	            value: function getScheme() {
	                return NiftiGzipUint16Image.getScheme();
	            }
	        },
	        fileLoaded: {
	            value: function fileLoaded(file) {
	                this.data = pako.inflate(this.reader.result);
	                this.slice = 60;
	                this.maxSlice = 127;
	                this.trigger(this.IMAGE_READY, this);
	            }
	        },
	        getSlice: {
	            value: function getSlice(slice) {
	                var array = new Uint8Array(this.data.buffer, 348 + 256 * 256 * slice, 256 * 256);
	                return array;
	            }
	        }
	    }, {
	        getScheme: {
	            value: function getScheme() {
	                return ".nii.gz";
	            }
	        },
	        isMatch: {
	            value: function isMatch(fileName) {
	                return fileName.match(/.nii.gz$/);
	            }
	        }
	    });
	
	    return NiftiGzipUint16Image;
	})();
	
	module.exports = NiftiGzipUint16Image;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(24)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!C:\\Users\\Jussi\\Documents\\GitHub\\Combinostics.Demo\\src\\Combinostics.Demo.Web\\node_modules\\css-loader\\index.js!C:\\Users\\Jussi\\Documents\\GitHub\\Combinostics.Demo\\src\\Combinostics.Demo.Web\\css\\fingerprint.css", function() {
			var newContent = require("!!C:\\Users\\Jussi\\Documents\\GitHub\\Combinostics.Demo\\src\\Combinostics.Demo.Web\\node_modules\\css-loader\\index.js!C:\\Users\\Jussi\\Documents\\GitHub\\Combinostics.Demo\\src\\Combinostics.Demo.Web\\css\\fingerprint.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(26)();
	exports.push([module.id, "\r\n.fingerprint-node {\r\n    display: inline-block;\r\n    border-radius: 2px;\r\n    border: solid 1px #999999;\r\n}\r\n\r\n.fingerprint-distributions-flash {\r\n    color: #a3c4fc;\r\n    vertical-align: central;\r\n}\r\n", ""]);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(9));
	
	var kendo = _interopRequire(__webpack_require__(25));
	
	(function ($) {
	    "use strict";
	
	    var fingerprintNodeTemplate = "#         var index = new Number(item.Index);         var value = item.Value;         var relevance = new Number(item.Relevance);         if(isNaN(item.Value)==false)  {             value = new Number(item.Value);             value = value.toFixed(2)         }         #         #             var node = Fingerprint.createNode(item.Index, item.Relevance);         #         #= node # #: item.Name # (#= index.toFixed(2)#)";
	
	    var FingerprintTree = function FingerprintTree(elem, params) {
	        this.$elem = $(elem);
	
	        this.params = params;
	        this.params.urlPath = "/fingerprint/" + this.params.dataset + "/" + this.params.id;
	        this.disabled = [];
	
	        this.treeData = new kendo.data.HierarchicalDataSource({
	            transport: {
	                read: {
	                    url: this.params.baseUrl + this.params.urlPath,
	                    dataType: "json"
	                }
	            },
	            schema: {
	                model: {
	                    id: "Name",
	                    children: "Children",
	                    hasChildren: "HasChildren"
	                }
	            }
	        });
	
	        var treeView = this.$elem.kendoTreeView({
	            dataSource: this.treeData,
	            loadOnDemand: false,
	            dataTextField: "Name",
	            template: kendo.template(fingerprintNodeTemplate),
	            dataBound: this.dataBound.bind(this),
	            select: this.selectedNodeChanging.bind(this),
	            change: this.selectedNodeChanged.bind(this),
	            checkboxes: {
	                checkChildren: true,
	                template: "<input type=\"checkbox\" checked />"
	            },
	            check: this.nodeChecked.bind(this)
	        }).data("kendoTreeView");
	
	        this.treeView = treeView;
	        this.selectedNodeChangingCallbacks = $.Callbacks();
	        this.selectedNodeChangedCallbacks = $.Callbacks();
	    };
	
	    // use a prototype because that way every instance of a DateTimeWidget
	    // can be extended at once, by anyone, to add new functionality
	
	    FingerprintTree.prototype = {
	        constructor: FingerprintTree,
	
	        getByName: function getByName(data, name) {
	
	            for (var i = 0; i < data.length; i++) {
	                if (data[i].Name === this.selectedItem.Name) {
	                    return this.treeView.findByUid(data[i].uid);
	                } else if (data[i].hasChildren) {
	                    return this.getByName(data[i].children._data, name);
	                }
	            }
	
	            return null;
	        },
	
	        dataBound: function dataBound(e) {
	            if (e.node === undefined) {
	                this.treeView.expand(".k-first");
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
	
	        updateId: function updateId(id) {
	            this.params.id = id;
	            this.params.urlPath = "/fingerprint/" + this.params.dataset + "/" + this.params.id;
	            this.treeData.transport.options.read.url = this.params.baseUrl + this.params.urlPath;
	            this.treeView.dataSource.read();
	        },
	
	        selectedNodeChanging: function selectedNodeChanging(e) {
	            this.selectedItem = this.treeView.dataItem(e.node);
	            this.selectedNodeChangingCallbacks.fire(e);
	        },
	
	        selectedNodeChanged: function selectedNodeChanged() {
	            this.selectedNodeChangedCallbacks.fire();
	        },
	
	        getExpanded: function getExpanded() {
	            var self = this;
	            var result = {};
	            $(".k-item", this.$elem).each(function () {
	                var item = self.treeView.dataItem(this);
	                result[item.Name] = item.expanded;
	            });
	
	            return result;
	        },
	
	        setExpanded: function setExpanded(expanded) {
	            var self = this;
	            this.expanding = true;
	            if (expanded) {
	                $(".k-item", this.$elem).each(function () {
	                    var item = self.treeView.dataItem(this);
	                    if (item && expanded[item.Name]) {
	                        self.treeView.expand(this);
	                    }
	                    if (item && !item.IsEnabled) {
	                        var cb = $(this).find("[type=checkbox]").first();
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
	
	        updateDisabled: function updateDisabled(node) {
	            var item = this.treeView.dataItem(node);
	            if (!item.checked) {
	                this.disabled.push(item.Name);
	            } else {
	                var index = $.inArray(item.Name, this.disabled);
	                if (index > -1) {
	                    this.disabled.splice(index, 1);
	                }
	            }
	        },
	
	        getDisabledQuery: function getDisabledQuery() {
	            return this.disabled.length > 0 ? "?disabled=" + this.disabled.join("&disabled=") : "";
	        },
	
	        nodeChecked: function nodeChecked(e) {
	            if (this.expanding) {
	                return;
	            }
	
	            this.updateDisabled(e.node);
	
	            this.params.urlPath = "/fingerprint/" + this.params.dataset + "/" + this.params.id;
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
	            if (!$this.data("fingerprintTree")) {
	                $this.data("fingerprintTree", new FingerprintTree(this, params));
	            }
	        });
	    };
	})($);
	
	var Fingerprint = (function () {
	    "use strict";
	
	    function getNodeColor(index) {
	        if (index === null) {
	            return "rgba(192,192,192,1);";
	        }
	
	        if (Math.abs(index - 0.5) < 0.005) {
	            return "rgba(0,0,0,0);";
	        }
	
	        var r = Math.min(index * 510, 255);
	        if (index >= 0.5) {
	            r = 255;
	        } else if (r < 0) {
	            r = 0;
	        }
	
	        var b = Math.min((1 - index) * 510, 255);
	        if (index <= 0.5) {
	            b = 255;
	        } else if (b < 0) {
	            b = 0;
	        }
	
	        var g = Math.min(r, b);
	
	        r = Math.round(r);
	        g = Math.round(g);
	        b = Math.round(b);
	
	        return "rgba(" + r + "," + g + "," + b + ",1);";
	    }
	
	    function getNodeSize(relevance) {
	        var height = 7 + relevance * 18;
	        var width = 7 + relevance * 54;
	
	        return "width: " + Math.ceil(width) + "px; height: " + Math.ceil(height) + "px;";
	    }
	
	    function getNodeStyle(index, relevance) {
	        if (relevance == 0) {
	            index = null;
	        }
	        var bg = "background-color: " + getNodeColor(index);
	        var size = getNodeSize(relevance);
	
	        return bg + size;
	    }
	
	    function createNode(index, relevance) {
	        var nodeStyle = getNodeStyle(index, relevance);
	        return "<div class=\"fingerprint-node\" style=\"" + nodeStyle + "\"></div>";
	    }
	
	    return {
	        createNode: createNode,
	        getNodeColor: getNodeColor
	    };
	})();
	
	window.Fingerprint = Fingerprint;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(9));
	
	(function ($) {
	    "use strict";
	
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
	
	        selectedNodeChanging: function selectedNodeChanging(e) {
	            var node = this.treeView.dataItem(e.node);
	            console.info("Selecting: " + node.id);
	            $.ajax({
	                url: this.fingerprintTree.params.baseUrl + "/distribution/" + this.fingerprintTree.params.dataset + "/" + this.fingerprintTree.params.id + "/" + node.id + this.fingerprintTree.getDisabledQuery(),
	                context: document.body
	            }).done((function (data) {
	                this.createChart(node, data);
	            }).bind(this));
	        },
	
	        selectedNodeChanged: function selectedNodeChanged(e) {},
	
	        createChart: function createChart(node, data) {
	
	            var closestXValue = data.XAxis.reduce(function (prev, curr) {
	                return Math.abs(curr - node.Value) < Math.abs(prev - node.Value) ? curr : prev;
	            });
	
	            var xIndex = data.XAxis.indexOf(closestXValue);
	            this.$elem.empty();
	            this.$elem.kendoChart({
	                chartArea: {
	                    height: 350
	                },
	                seriesColors: ["blue", "red"],
	                seriesDefaults: {
	                    type: "area"
	                },
	                title: {
	                    text: "Distributions"
	                },
	                legend: {
	                    position: "bottom"
	                },
	                series: [{
	                    name: "Control",
	                    data: data.ControlValues
	                }, {
	                    name: "Positive",
	                    data: data.PositiveValues
	                }],
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
	                        data: [{
	                            value: Math.floor(xIndex),
	                            label: {
	                                text: "DSI\n" + node.Index.toFixed(2)
	                            }
	                        }],
	                        line: {
	                            length: 200,
	                            width: 4,
	                            color: "#444444"
	                        },
	                        icon: {
	                            background: "#444444",
	                            border: {
	                                width: 2,
	                                color: "#444444"
	                            }
	                        },
	                        label: {
	                            color: "white",
	                            font: "10px sans-serif"
	                        }
	                    }
	                }
	            });
	        }
	    };
	
	    // jQuery plugin
	    $.fn.fingerprintDistributions = function (params) {
	
	        return this.each(function () {
	
	            var $this = $(this);
	            if (!$this.data("fingerprintDistributions")) {
	                $this.data("fingerprintDistributions", new FingerprintDistributions(this, params));
	            }
	        });
	    };
	})($);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var $ = _interopRequire(__webpack_require__(9));
	
	(function ($) {
	    "use strict";
	
	    function FingerprintInfluence(elem, params) {
	        this.$elem = $(elem);
	
	        this.fingerprintTree = params.fingerprintTree;
	        this.treeView = params.fingerprintTree.treeView;
	        this.fingerprintTree.selectedNodeChangingCallbacks.add(this.selectedNodeChanging.bind(this));
	        this.fingerprintTree.selectedNodeChangedCallbacks.add(this.selectedNodeChanged.bind(this));
	    };
	
	    // use a prototype because that way every instance
	    // can be extended at once, by anyone, to add new functionality
	
	    FingerprintInfluence.prototype = {
	        constructor: FingerprintInfluence,
	
	        selectedNodeChanging: function selectedNodeChanging(e) {
	            var node = this.treeView.dataItem(e.node);
	            this.createChart(node);
	        },
	
	        selectedNodeChanged: function selectedNodeChanged(e) {},
	
	        rgb2hex: function rgb2hex(rgb) {
	            rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	            return rgb && rgb.length === 4 ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : "";
	        },
	
	        createChart: function createChart(node) {
	            var data = [];
	            for (var i = 0; i < node.Children.length; i++) {
	                var child = node.Children[i];
	                if (child.IsEnabled && child.Index !== null) {
	                    data.push({
	                        category: child.Name,
	                        value: child.Relevance,
	                        color: this.rgb2hex(window.Fingerprint.getNodeColor(child.Index))
	                    });
	                }
	            }
	            this.$elem.empty();
	            this.$elem.height(350).kendoChart({
	                title: {
	                    text: "Feature influence"
	                },
	                legend: {
	                    visible: false
	                },
	                seriesDefaults: {
	                    labels: {
	                        template: "#= kendo.format('{0:P0}', percentage) # - #= category #",
	                        position: "outsideEnd",
	                        visible: true,
	                        background: "transparent",
	                        align: "column"
	                    }
	                },
	                series: [{
	                    type: "donut",
	                    data: data
	                }],
	                tooltip: {
	                    visible: true,
	                    template: "#= kendo.format('{0:P0}', percentage) # - #= category #"
	                }
	            });
	        }
	    };
	
	    // jQuery plugin
	    $.fn.fingerprintInfluence = function (params) {
	
	        return this.each(function () {
	
	            var $this = $(this);
	            if (!$this.data("FingerprintInfluence")) {
	                $this.data("FingerprintInfluence", new FingerprintInfluence(this, params));
	            }
	        });
	    };
	})($);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	__webpack_require__(27);
	
	var riot = _interopRequire(__webpack_require__(10));
	
	riot.tag("file-uploader", "<div class=\"col-sm-12\">\n        <span class=\"btn btn-primary btn-file btn-block\">\n            Select a T1 MRI file for processing... <input id=\"file-upload\" type=\"file\" name=\"files[]\" multiple=\"\" accept=\".nii.gz\">\n        </span>\n    </div>", function (opts) {
	    this.parent.on("mount", function () {
	        var $elem = $("#file-upload");
	        opts.fileUploader.apply($elem);
	    });
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	__webpack_require__(29);
	
	var riot = _interopRequire(__webpack_require__(10));
	
	riot.tag("image-viewer", "<div class=\"col-sm-12\">\n        <div id=\"im1\" data-index=\"0\" style=\"width:384px;height:384px;background:#000000\" class=\"cornerstone-enabled-image center-block\" oncontextmenu=\"return false\" unselectable='on' onselectstart='return false;' onmousedown='return false;'>\n            <div class=\"topleft\" style=\"position: absolute;top:7px; left:7px; color: #fff;line-height: 100%;\">\n            </div>\n            <div class=\"topright\" style=\"position: absolute;top:7px; right:7px; color: #fff;line-height: 100%;\">\n            </div>\n            <div class=\"bottomright\" style=\"position: absolute;bottom:7px; right:7px; color: #fff;line-height: 100%;\">\n            </div>\n            <div class=\"bottomleft\" style=\"position: absolute;bottom:7px; left:7px; color: #fff;line-height: 100%;\">\n            </div>\n        </div>\n    </div>", function (opts) {
	    this.parent.on("mount", function () {
	        opts.imageViewer.apply($("#im1"));
	        /*file.data.context = $('<button/>').text('Upload')
	                .appendTo($('#files'))
	                .click(function () {
	                    image.data.context = $('<p/>').text('Uploading...').replaceAll($(this));
	                    image.data.submit();
	        });*/
	    });
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = kendo;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function () {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(28);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(24)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!C:\\Users\\Jussi\\Documents\\GitHub\\Combinostics.Demo\\src\\Combinostics.Demo.Web\\node_modules\\css-loader\\index.js!C:\\Users\\Jussi\\Documents\\GitHub\\Combinostics.Demo\\src\\Combinostics.Demo.Web\\css\\dragdrop.css", function() {
			var newContent = require("!!C:\\Users\\Jussi\\Documents\\GitHub\\Combinostics.Demo\\src\\Combinostics.Demo.Web\\node_modules\\css-loader\\index.js!C:\\Users\\Jussi\\Documents\\GitHub\\Combinostics.Demo\\src\\Combinostics.Demo.Web\\css\\dragdrop.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(26)();
	exports.push([module.id, ".btn-file {\r\n    position: relative;\r\n    overflow: hidden;\r\n}\r\n.btn-file input[type=file] {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    min-width: 100%;\r\n    min-height: 100%;\r\n    font-size: 100px;\r\n    text-align: right;\r\n    filter: alpha(opacity=0);\r\n    opacity: 0;\r\n    outline: none;\r\n    background: white;\r\n    cursor: inherit;\r\n    display: block;\r\n}\r\n", ""]);

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(30);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(24)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!C:\\Users\\Jussi\\Documents\\GitHub\\Combinostics.Demo\\src\\Combinostics.Demo.Web\\node_modules\\css-loader\\index.js!C:\\Users\\Jussi\\Documents\\GitHub\\Combinostics.Demo\\src\\Combinostics.Demo.Web\\css\\cornerstone.css", function() {
			var newContent = require("!!C:\\Users\\Jussi\\Documents\\GitHub\\Combinostics.Demo\\src\\Combinostics.Demo.Web\\node_modules\\css-loader\\index.js!C:\\Users\\Jussi\\Documents\\GitHub\\Combinostics.Demo\\src\\Combinostics.Demo.Web\\css\\cornerstone.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(26)();
	exports.push([module.id, "/*! cornerstone - v0.6.1 - 2015-02-23 | (c) 2014 Chris Hafey | https://github.com/chafey/cornerstone */\r\n.cornerstone-enabled-image {\r\n\r\n    /* prevent text selection from occurring when dragging the mouse on the div */\r\n    /* http://stackoverflow.com/questions/826782/css-rule-to-disable-text-selection-highlighting */\r\n    -webkit-touch-callout: none;\r\n    -webkit-user-select: none;\r\n    -khtml-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n\r\n    /* force the cursor to always be the default arrow.  This prevents it from changing to an ibar when it is\r\n       over HTML based text overlays (four corners */\r\n    cursor:default;\r\n}\r\n", ""]);

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/*! cornerstoneMath - v0.1.1 - 2015-01-30 | (c) 2014 Chris Hafey | https://github.com/chafey/cornerstoneMath */
	// Begin Source: src/lineSegment.js
	"use strict";
	
	var cornerstoneMath = (function (cornerstoneMath) {
	
	            "use strict";
	
	            if (cornerstoneMath === undefined) {
	                        cornerstoneMath = {};
	            }
	
	            // based on  http://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
	            function sqr(x) {
	                        return x * x;
	            }
	
	            function dist2(v, w) {
	                        return sqr(v.x - w.x) + sqr(v.y - w.y);
	            }
	
	            function distanceToPointSquared(lineSegment, point) {
	                        var l2 = dist2(lineSegment.start, lineSegment.end);
	                        if (l2 === 0) {
	                                    return dist2(point, lineSegment.start);
	                        }
	                        var t = ((point.x - lineSegment.start.x) * (lineSegment.end.x - lineSegment.start.x) + (point.y - lineSegment.start.y) * (lineSegment.end.y - lineSegment.start.y)) / l2;
	                        if (t < 0) {
	                                    return dist2(point, lineSegment.start);
	                        }
	                        if (t > 1) {
	                                    return dist2(point, lineSegment.end);
	                        }
	
	                        var pt = {
	                                    x: lineSegment.start.x + t * (lineSegment.end.x - lineSegment.start.x),
	                                    y: lineSegment.start.y + t * (lineSegment.end.y - lineSegment.start.y)
	                        };
	                        return dist2(point, pt);
	            }
	
	            function distanceToPoint(lineSegment, point) {
	                        return Math.sqrt(distanceToPointSquared(lineSegment, point));
	            }
	
	            // module exports
	            cornerstoneMath.lineSegment = {
	                        distanceToPoint: distanceToPoint
	            };
	
	            return cornerstoneMath;
	})(cornerstoneMath);
	// End Source; src/lineSegment.js
	
	// Begin Source: src/math.js
	// Based on THREE.JS
	
	var cornerstoneMath = (function (cornerstoneMath) {
	
	            "use strict";
	
	            if (cornerstoneMath === undefined) {
	                        cornerstoneMath = {};
	            }
	
	            function clamp(x, a, b) {
	                        return x < a ? a : x > b ? b : x;
	            }
	
	            function degToRad(degrees) {
	                        var degreeToRadiansFactor = Math.PI / 180;
	                        return degrees * degreeToRadiansFactor;
	            }
	
	            function radToDeg(radians) {
	                        var radianToDegreesFactor = 180 / Math.PI;
	                        return radians * radianToDegreesFactor;
	            }
	
	            cornerstoneMath.clamp = clamp;
	            cornerstoneMath.degToRad = degToRad;
	            cornerstoneMath.radToDeg = radToDeg;
	
	            return cornerstoneMath;
	})(cornerstoneMath);
	// End Source; src/math.js
	
	// Begin Source: src/matrix4.js
	// Based on THREE.JS
	
	var cornerstoneMath = (function (cornerstoneMath) {
	
	            "use strict";
	
	            if (cornerstoneMath === undefined) {
	                        cornerstoneMath = {};
	            }
	
	            cornerstoneMath.Matrix4 = function Matrix4(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
	                        this.elements = new Float32Array(16);
	
	                        // TODO: if n11 is undefined, then just set to identity, otherwise copy all other values into matrix
	                        //   we should not support semi specification of Matrix4, it is just weird.
	
	                        var te = this.elements;
	
	                        te[0] = n11 !== undefined ? n11 : 1;te[4] = n12 || 0;te[8] = n13 || 0;te[12] = n14 || 0;
	                        te[1] = n21 || 0;te[5] = n22 !== undefined ? n22 : 1;te[9] = n23 || 0;te[13] = n24 || 0;
	                        te[2] = n31 || 0;te[6] = n32 || 0;te[10] = n33 !== undefined ? n33 : 1;te[14] = n34 || 0;
	                        te[3] = n41 || 0;te[7] = n42 || 0;te[11] = n43 || 0;te[15] = n44 !== undefined ? n44 : 1;
	            };
	
	            cornerstoneMath.Matrix4.prototype.makeRotationFromQuaternion = function (q) {
	                        var te = this.elements;
	
	                        var x = q.x,
	                            y = q.y,
	                            z = q.z,
	                            w = q.w;
	                        var x2 = x + x,
	                            y2 = y + y,
	                            z2 = z + z;
	                        var xx = x * x2,
	                            xy = x * y2,
	                            xz = x * z2;
	                        var yy = y * y2,
	                            yz = y * z2,
	                            zz = z * z2;
	                        var wx = w * x2,
	                            wy = w * y2,
	                            wz = w * z2;
	
	                        te[0] = 1 - (yy + zz);
	                        te[4] = xy - wz;
	                        te[8] = xz + wy;
	
	                        te[1] = xy + wz;
	                        te[5] = 1 - (xx + zz);
	                        te[9] = yz - wx;
	
	                        te[2] = xz - wy;
	                        te[6] = yz + wx;
	                        te[10] = 1 - (xx + yy);
	
	                        // last column
	                        te[3] = 0;
	                        te[7] = 0;
	                        te[11] = 0;
	
	                        // bottom row
	                        te[12] = 0;
	                        te[13] = 0;
	                        te[14] = 0;
	                        te[15] = 1;
	
	                        return this;
	            };
	
	            cornerstoneMath.Matrix4.prototype.multiplyMatrices = function (a, b) {
	                        var ae = a.elements;
	                        var be = b.elements;
	                        var te = this.elements;
	
	                        var a11 = ae[0],
	                            a12 = ae[4],
	                            a13 = ae[8],
	                            a14 = ae[12];
	                        var a21 = ae[1],
	                            a22 = ae[5],
	                            a23 = ae[9],
	                            a24 = ae[13];
	                        var a31 = ae[2],
	                            a32 = ae[6],
	                            a33 = ae[10],
	                            a34 = ae[14];
	                        var a41 = ae[3],
	                            a42 = ae[7],
	                            a43 = ae[11],
	                            a44 = ae[15];
	
	                        var b11 = be[0],
	                            b12 = be[4],
	                            b13 = be[8],
	                            b14 = be[12];
	                        var b21 = be[1],
	                            b22 = be[5],
	                            b23 = be[9],
	                            b24 = be[13];
	                        var b31 = be[2],
	                            b32 = be[6],
	                            b33 = be[10],
	                            b34 = be[14];
	                        var b41 = be[3],
	                            b42 = be[7],
	                            b43 = be[11],
	                            b44 = be[15];
	
	                        te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
	                        te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
	                        te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
	                        te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
	
	                        te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
	                        te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
	                        te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
	                        te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
	
	                        te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
	                        te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
	                        te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
	                        te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
	
	                        te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
	                        te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
	                        te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
	                        te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
	
	                        return this;
	            };
	
	            cornerstoneMath.Matrix4.prototype.multiply = function (m, n) {
	
	                        if (n !== undefined) {
	
	                                    console.warn("DEPRECATED: Matrix4's .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.");
	                                    return this.multiplyMatrices(m, n);
	                        }
	
	                        return this.multiplyMatrices(this, m);
	            };
	
	            cornerstoneMath.Matrix4.prototype.getInverse = function (m, throwOnInvertible) {
	
	                        // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
	                        var te = this.elements;
	                        var me = m.elements;
	
	                        var n11 = me[0],
	                            n12 = me[4],
	                            n13 = me[8],
	                            n14 = me[12];
	                        var n21 = me[1],
	                            n22 = me[5],
	                            n23 = me[9],
	                            n24 = me[13];
	                        var n31 = me[2],
	                            n32 = me[6],
	                            n33 = me[10],
	                            n34 = me[14];
	                        var n41 = me[3],
	                            n42 = me[7],
	                            n43 = me[11],
	                            n44 = me[15];
	
	                        te[0] = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
	                        te[4] = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
	                        te[8] = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
	                        te[12] = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
	                        te[1] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
	                        te[5] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
	                        te[9] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
	                        te[13] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
	                        te[2] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
	                        te[6] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
	                        te[10] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
	                        te[14] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
	                        te[3] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
	                        te[7] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
	                        te[11] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
	                        te[15] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;
	
	                        var det = n11 * te[0] + n21 * te[4] + n31 * te[8] + n41 * te[12];
	
	                        if (det === 0) {
	
	                                    var msg = "Matrix4.getInverse(): can't invert matrix, determinant is 0";
	
	                                    if (throwOnInvertible || false) {
	
	                                                throw new Error(msg);
	                                    } else {
	
	                                                console.warn(msg);
	                                    }
	
	                                    this.identity();
	
	                                    return this;
	                        }
	
	                        this.multiplyScalar(1 / det);
	
	                        return this;
	            };
	
	            cornerstoneMath.Matrix4.prototype.applyToVector3Array = function () {
	
	                        var v1 = new cornerstoneMath.Vector3();
	
	                        return function (array, offset, length) {
	
	                                    if (offset === undefined) offset = 0;
	                                    if (length === undefined) length = array.length;
	
	                                    for (var i = 0, j = offset, il; i < length; i += 3, j += 3) {
	
	                                                v1.x = array[j];
	                                                v1.y = array[j + 1];
	                                                v1.z = array[j + 2];
	
	                                                v1.applyMatrix4(this);
	
	                                                array[j] = v1.x;
	                                                array[j + 1] = v1.y;
	                                                array[j + 2] = v1.z;
	                                    }
	
	                                    return array;
	                        };
	            };
	
	            cornerstoneMath.Matrix4.prototype.makeTranslation = function (x, y, z) {
	
	                        this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
	
	                        return this;
	            };
	            cornerstoneMath.Matrix4.prototype.multiplyScalar = function (s) {
	
	                        var te = this.elements;
	
	                        te[0] *= s;te[4] *= s;te[8] *= s;te[12] *= s;
	                        te[1] *= s;te[5] *= s;te[9] *= s;te[13] *= s;
	                        te[2] *= s;te[6] *= s;te[10] *= s;te[14] *= s;
	                        te[3] *= s;te[7] *= s;te[11] *= s;te[15] *= s;
	
	                        return this;
	            };
	            cornerstoneMath.Matrix4.prototype.set = function (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
	
	                        var te = this.elements;
	
	                        te[0] = n11;te[4] = n12;te[8] = n13;te[12] = n14;
	                        te[1] = n21;te[5] = n22;te[9] = n23;te[13] = n24;
	                        te[2] = n31;te[6] = n32;te[10] = n33;te[14] = n34;
	                        te[3] = n41;te[7] = n42;te[11] = n43;te[15] = n44;
	
	                        return this;
	            };
	
	            cornerstoneMath.Matrix4.prototype.makeScale = function (x, y, z) {
	
	                        this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
	
	                        return this;
	            };
	
	            return cornerstoneMath;
	})(cornerstoneMath);
	// End Source; src/matrix4.js
	
	// Begin Source: src/point.js
	var cornerstoneMath = (function (cornerstoneMath) {
	
	            "use strict";
	
	            if (cornerstoneMath === undefined) {
	                        cornerstoneMath = {};
	            }
	
	            function pageToPoint(e) {
	                        return {
	                                    x: e.pageX,
	                                    y: e.pageY
	                        };
	            }
	
	            function subtract(lhs, rhs) {
	                        return {
	                                    x: lhs.x - rhs.x,
	                                    y: lhs.y - rhs.y
	                        };
	            }
	
	            function copy(point) {
	                        return {
	                                    x: point.x,
	                                    y: point.y
	                        };
	            }
	
	            function distance(from, to) {
	                        return Math.sqrt(distanceSquared(from, to));
	            }
	
	            function distanceSquared(from, to) {
	                        var delta = subtract(from, to);
	                        return delta.x * delta.x + delta.y * delta.y;
	            }
	
	            function insideRect(point, rect) {
	                        if (point.x < rect.left || point.x > rect.left + rect.width || point.y < rect.top || point.y > rect.top + rect.height) {
	                                    return false;
	                        }
	                        return true;
	            }
	
	            // module exports
	            cornerstoneMath.point = {
	                        subtract: subtract,
	                        copy: copy,
	                        pageToPoint: pageToPoint,
	                        distance: distance,
	                        distanceSquared: distanceSquared,
	                        insideRect: insideRect
	            };
	
	            return cornerstoneMath;
	})(cornerstoneMath);
	// End Source; src/point.js
	
	// Begin Source: src/quaternion.js
	// Based on THREE.JS
	
	var cornerstoneMath = (function (cornerstoneMath) {
	
	            "use strict";
	
	            if (cornerstoneMath === undefined) {
	                        cornerstoneMath = {};
	            }
	
	            cornerstoneMath.Quaternion = function Quaternion(x, y, z, w) {
	                        this.x = x || 0;
	                        this.y = y || 0;
	                        this.z = z || 0;
	                        this.w = w !== undefined ? w : 1;
	            };
	
	            cornerstoneMath.Quaternion.prototype.setFromAxisAngle = function (axis, angle) {
	                        var halfAngle = angle / 2,
	                            s = Math.sin(halfAngle);
	
	                        this.x = axis.x * s;
	                        this.y = axis.y * s;
	                        this.z = axis.z * s;
	                        this.w = Math.cos(halfAngle);
	
	                        return this;
	            };
	
	            cornerstoneMath.Quaternion.prototype.multiplyQuaternions = function (a, b) {
	                        var qax = a.x,
	                            qay = a.y,
	                            qaz = a.z,
	                            qaw = a.w;
	                        var qbx = b.x,
	                            qby = b.y,
	                            qbz = b.z,
	                            qbw = b.w;
	
	                        this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
	                        this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
	                        this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
	                        this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
	
	                        return this;
	            };
	
	            cornerstoneMath.Quaternion.prototype.setFromRotationMatrix = function (m) {
	                        var te = m.elements,
	                            m11 = te[0],
	                            m12 = te[4],
	                            m13 = te[8],
	                            m21 = te[1],
	                            m22 = te[5],
	                            m23 = te[9],
	                            m31 = te[2],
	                            m32 = te[6],
	                            m33 = te[10],
	                            trace = m11 + m22 + m33,
	                            s;
	
	                        if (trace > 0) {
	
	                                    s = 0.5 / Math.sqrt(trace + 1);
	
	                                    this.w = 0.25 / s;
	                                    this.x = (m32 - m23) * s;
	                                    this.y = (m13 - m31) * s;
	                                    this.z = (m21 - m12) * s;
	                        } else if (m11 > m22 && m11 > m33) {
	
	                                    s = 2 * Math.sqrt(1 + m11 - m22 - m33);
	
	                                    this.w = (m32 - m23) / s;
	                                    this.x = 0.25 * s;
	                                    this.y = (m12 + m21) / s;
	                                    this.z = (m13 + m31) / s;
	                        } else if (m22 > m33) {
	
	                                    s = 2 * Math.sqrt(1 + m22 - m11 - m33);
	
	                                    this.w = (m13 - m31) / s;
	                                    this.x = (m12 + m21) / s;
	                                    this.y = 0.25 * s;
	                                    this.z = (m23 + m32) / s;
	                        } else {
	
	                                    s = 2 * Math.sqrt(1 + m33 - m11 - m22);
	
	                                    this.w = (m21 - m12) / s;
	                                    this.x = (m13 + m31) / s;
	                                    this.y = (m23 + m32) / s;
	                                    this.z = 0.25 * s;
	                        }
	
	                        return this;
	            };
	
	            return cornerstoneMath;
	})(cornerstoneMath);
	// End Source; src/quaternion.js
	
	// Begin Source: src/rect.js
	var cornerstoneMath = (function (cornerstoneMath) {
	
	            "use strict";
	
	            if (cornerstoneMath === undefined) {
	                        cornerstoneMath = {};
	            }
	
	            function rectToLineSegments(rect) {
	                        var top = {
	                                    start: {
	                                                x: rect.left,
	                                                y: rect.top
	                                    },
	                                    end: {
	                                                x: rect.left + rect.width,
	                                                y: rect.top
	
	                                    }
	                        };
	                        var right = {
	                                    start: {
	                                                x: rect.left + rect.width,
	                                                y: rect.top
	                                    },
	                                    end: {
	                                                x: rect.left + rect.width,
	                                                y: rect.top + rect.height
	
	                                    }
	                        };
	                        var bottom = {
	                                    start: {
	                                                x: rect.left + rect.width,
	                                                y: rect.top + rect.height
	                                    },
	                                    end: {
	                                                x: rect.left,
	                                                y: rect.top + rect.height
	
	                                    }
	                        };
	                        var left = {
	                                    start: {
	                                                x: rect.left,
	                                                y: rect.top + rect.height
	                                    },
	                                    end: {
	                                                x: rect.left,
	                                                y: rect.top
	
	                                    }
	                        };
	                        var lineSegments = [top, right, bottom, left];
	                        return lineSegments;
	            }
	
	            function pointNearLineSegment(point, lineSegment, maxDistance) {
	                        if (maxDistance === undefined) {
	                                    maxDistance = 5;
	                        }
	                        var distance = cornerstoneMath.lineSegment.distanceToPoint(lineSegment, point);
	
	                        return distance < maxDistance;
	            }
	            function distanceToPoint(rect, point) {
	                        var minDistance = 655535;
	                        var lineSegments = rectToLineSegments(rect);
	                        lineSegments.forEach(function (lineSegment) {
	                                    var distance = cornerstoneMath.lineSegment.distanceToPoint(lineSegment, point);
	                                    if (distance < minDistance) {
	                                                minDistance = distance;
	                                    }
	                        });
	                        return minDistance;
	            }
	
	            // module exports
	            cornerstoneMath.rect = {
	                        distanceToPoint: distanceToPoint
	            };
	
	            return cornerstoneMath;
	})(cornerstoneMath);
	// End Source; src/rect.js
	
	// Begin Source: src/vector3.js
	// Based on THREE.JS
	
	var cornerstoneMath = (function (cornerstoneMath) {
	
	            "use strict";
	
	            if (cornerstoneMath === undefined) {
	                        cornerstoneMath = {};
	            }
	
	            cornerstoneMath.Vector3 = function (x, y, z) {
	
	                        this.x = x || 0;
	                        this.y = y || 0;
	                        this.z = z || 0;
	            };
	
	            cornerstoneMath.Vector3.prototype = {
	
	                        constructor: cornerstoneMath.Vector3,
	
	                        set: function set(x, y, z) {
	
	                                    this.x = x;
	                                    this.y = y;
	                                    this.z = z;
	
	                                    return this;
	                        },
	
	                        setX: function setX(x) {
	
	                                    this.x = x;
	
	                                    return this;
	                        },
	
	                        setY: function setY(y) {
	
	                                    this.y = y;
	
	                                    return this;
	                        },
	
	                        setZ: function setZ(z) {
	
	                                    this.z = z;
	
	                                    return this;
	                        },
	
	                        setComponent: function setComponent(index, value) {
	
	                                    switch (index) {
	
	                                                case 0:
	                                                            this.x = value;break;
	                                                case 1:
	                                                            this.y = value;break;
	                                                case 2:
	                                                            this.z = value;break;
	                                                default:
	                                                            throw new Error("index is out of range: " + index);
	
	                                    }
	                        },
	
	                        getComponent: function getComponent(index) {
	
	                                    switch (index) {
	
	                                                case 0:
	                                                            return this.x;
	                                                case 1:
	                                                            return this.y;
	                                                case 2:
	                                                            return this.z;
	                                                default:
	                                                            throw new Error("index is out of range: " + index);
	
	                                    }
	                        },
	
	                        copy: function copy(v) {
	
	                                    this.x = v.x;
	                                    this.y = v.y;
	                                    this.z = v.z;
	
	                                    return this;
	                        },
	
	                        add: function add(v, w) {
	
	                                    if (w !== undefined) {
	
	                                                console.warn("DEPRECATED: Vector3's .add() now only accepts one argument. Use .addVectors( a, b ) instead.");
	                                                return this.addVectors(v, w);
	                                    }
	
	                                    this.x += v.x;
	                                    this.y += v.y;
	                                    this.z += v.z;
	
	                                    return this;
	                        },
	
	                        addScalar: function addScalar(s) {
	
	                                    this.x += s;
	                                    this.y += s;
	                                    this.z += s;
	
	                                    return this;
	                        },
	
	                        addVectors: function addVectors(a, b) {
	
	                                    this.x = a.x + b.x;
	                                    this.y = a.y + b.y;
	                                    this.z = a.z + b.z;
	
	                                    return this;
	                        },
	
	                        sub: function sub(v, w) {
	
	                                    if (w !== undefined) {
	
	                                                console.warn("DEPRECATED: Vector3's .sub() now only accepts one argument. Use .subVectors( a, b ) instead.");
	                                                return this.subVectors(v, w);
	                                    }
	
	                                    this.x -= v.x;
	                                    this.y -= v.y;
	                                    this.z -= v.z;
	
	                                    return this;
	                        },
	
	                        subVectors: function subVectors(a, b) {
	
	                                    this.x = a.x - b.x;
	                                    this.y = a.y - b.y;
	                                    this.z = a.z - b.z;
	
	                                    return this;
	                        },
	
	                        multiply: function multiply(v, w) {
	
	                                    if (w !== undefined) {
	
	                                                console.warn("DEPRECATED: Vector3's .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.");
	                                                return this.multiplyVectors(v, w);
	                                    }
	
	                                    this.x *= v.x;
	                                    this.y *= v.y;
	                                    this.z *= v.z;
	
	                                    return this;
	                        },
	
	                        multiplyScalar: function multiplyScalar(scalar) {
	
	                                    this.x *= scalar;
	                                    this.y *= scalar;
	                                    this.z *= scalar;
	
	                                    return this;
	                        },
	
	                        multiplyVectors: function multiplyVectors(a, b) {
	
	                                    this.x = a.x * b.x;
	                                    this.y = a.y * b.y;
	                                    this.z = a.z * b.z;
	
	                                    return this;
	                        },
	
	                        applyAxisAngle: (function () {
	
	                                    var quaternion;
	
	                                    return function (axis, angle) {
	
	                                                if (quaternion === undefined) quaternion = new cornerstoneMath.Quaternion();
	
	                                                this.applyQuaternion(quaternion.setFromAxisAngle(axis, angle));
	
	                                                return this;
	                                    };
	                        })(),
	
	                        applyMatrix3: function applyMatrix3(m) {
	
	                                    var x = this.x;
	                                    var y = this.y;
	                                    var z = this.z;
	
	                                    var e = m.elements;
	
	                                    this.x = e[0] * x + e[3] * y + e[6] * z;
	                                    this.y = e[1] * x + e[4] * y + e[7] * z;
	                                    this.z = e[2] * x + e[5] * y + e[8] * z;
	
	                                    return this;
	                        },
	
	                        applyMatrix4: function applyMatrix4(m) {
	
	                                    // input: THREE.Matrix4 affine matrix
	
	                                    var x = this.x,
	                                        y = this.y,
	                                        z = this.z;
	
	                                    var e = m.elements;
	
	                                    this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
	                                    this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
	                                    this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
	
	                                    return this;
	                        },
	
	                        applyProjection: function applyProjection(m) {
	
	                                    // input: THREE.Matrix4 projection matrix
	
	                                    var x = this.x,
	                                        y = this.y,
	                                        z = this.z;
	
	                                    var e = m.elements;
	                                    var d = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]); // perspective divide
	
	                                    this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * d;
	                                    this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * d;
	                                    this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * d;
	
	                                    return this;
	                        },
	
	                        applyQuaternion: function applyQuaternion(q) {
	
	                                    var x = this.x;
	                                    var y = this.y;
	                                    var z = this.z;
	
	                                    var qx = q.x;
	                                    var qy = q.y;
	                                    var qz = q.z;
	                                    var qw = q.w;
	
	                                    // calculate quat * vector
	
	                                    var ix = qw * x + qy * z - qz * y;
	                                    var iy = qw * y + qz * x - qx * z;
	                                    var iz = qw * z + qx * y - qy * x;
	                                    var iw = -qx * x - qy * y - qz * z;
	
	                                    // calculate result * inverse quat
	
	                                    this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
	                                    this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
	                                    this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
	
	                                    return this;
	                        },
	
	                        transformDirection: function transformDirection(m) {
	
	                                    // input: THREE.Matrix4 affine matrix
	                                    // vector interpreted as a direction
	
	                                    var x = this.x,
	                                        y = this.y,
	                                        z = this.z;
	
	                                    var e = m.elements;
	
	                                    this.x = e[0] * x + e[4] * y + e[8] * z;
	                                    this.y = e[1] * x + e[5] * y + e[9] * z;
	                                    this.z = e[2] * x + e[6] * y + e[10] * z;
	
	                                    this.normalize();
	
	                                    return this;
	                        },
	
	                        divide: function divide(v) {
	
	                                    this.x /= v.x;
	                                    this.y /= v.y;
	                                    this.z /= v.z;
	
	                                    return this;
	                        },
	
	                        divideScalar: function divideScalar(scalar) {
	
	                                    if (scalar !== 0) {
	
	                                                var invScalar = 1 / scalar;
	
	                                                this.x *= invScalar;
	                                                this.y *= invScalar;
	                                                this.z *= invScalar;
	                                    } else {
	
	                                                this.x = 0;
	                                                this.y = 0;
	                                                this.z = 0;
	                                    }
	
	                                    return this;
	                        },
	
	                        min: function min(v) {
	
	                                    if (this.x > v.x) {
	
	                                                this.x = v.x;
	                                    }
	
	                                    if (this.y > v.y) {
	
	                                                this.y = v.y;
	                                    }
	
	                                    if (this.z > v.z) {
	
	                                                this.z = v.z;
	                                    }
	
	                                    return this;
	                        },
	
	                        max: function max(v) {
	
	                                    if (this.x < v.x) {
	
	                                                this.x = v.x;
	                                    }
	
	                                    if (this.y < v.y) {
	
	                                                this.y = v.y;
	                                    }
	
	                                    if (this.z < v.z) {
	
	                                                this.z = v.z;
	                                    }
	
	                                    return this;
	                        },
	
	                        clamp: function clamp(min, max) {
	
	                                    // This function assumes min < max, if this assumption isn't true it will not operate correctly
	
	                                    if (this.x < min.x) {
	
	                                                this.x = min.x;
	                                    } else if (this.x > max.x) {
	
	                                                this.x = max.x;
	                                    }
	
	                                    if (this.y < min.y) {
	
	                                                this.y = min.y;
	                                    } else if (this.y > max.y) {
	
	                                                this.y = max.y;
	                                    }
	
	                                    if (this.z < min.z) {
	
	                                                this.z = min.z;
	                                    } else if (this.z > max.z) {
	
	                                                this.z = max.z;
	                                    }
	
	                                    return this;
	                        },
	
	                        clampScalar: (function () {
	
	                                    var min, max;
	
	                                    return function (minVal, maxVal) {
	
	                                                if (min === undefined) {
	
	                                                            min = new cornerstoneMath.Vector3();
	                                                            max = new cornerstoneMath.Vector3();
	                                                }
	
	                                                min.set(minVal, minVal, minVal);
	                                                max.set(maxVal, maxVal, maxVal);
	
	                                                return this.clamp(min, max);
	                                    };
	                        })(),
	
	                        floor: function floor() {
	
	                                    this.x = Math.floor(this.x);
	                                    this.y = Math.floor(this.y);
	                                    this.z = Math.floor(this.z);
	
	                                    return this;
	                        },
	
	                        ceil: function ceil() {
	
	                                    this.x = Math.ceil(this.x);
	                                    this.y = Math.ceil(this.y);
	                                    this.z = Math.ceil(this.z);
	
	                                    return this;
	                        },
	
	                        round: function round() {
	
	                                    this.x = Math.round(this.x);
	                                    this.y = Math.round(this.y);
	                                    this.z = Math.round(this.z);
	
	                                    return this;
	                        },
	
	                        roundToZero: function roundToZero() {
	
	                                    this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
	                                    this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
	                                    this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
	
	                                    return this;
	                        },
	
	                        negate: function negate() {
	
	                                    return this.multiplyScalar(-1);
	                        },
	
	                        dot: function dot(v) {
	
	                                    return this.x * v.x + this.y * v.y + this.z * v.z;
	                        },
	
	                        lengthSq: function lengthSq() {
	
	                                    return this.x * this.x + this.y * this.y + this.z * this.z;
	                        },
	
	                        length: function length() {
	
	                                    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	                        },
	
	                        lengthManhattan: function lengthManhattan() {
	
	                                    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	                        },
	
	                        normalize: function normalize() {
	
	                                    return this.divideScalar(this.length());
	                        },
	
	                        setLength: function setLength(l) {
	
	                                    var oldLength = this.length();
	
	                                    if (oldLength !== 0 && l !== oldLength) {
	
	                                                this.multiplyScalar(l / oldLength);
	                                    }
	
	                                    return this;
	                        },
	
	                        lerp: function lerp(v, alpha) {
	
	                                    this.x += (v.x - this.x) * alpha;
	                                    this.y += (v.y - this.y) * alpha;
	                                    this.z += (v.z - this.z) * alpha;
	
	                                    return this;
	                        },
	
	                        cross: function cross(v, w) {
	
	                                    if (w !== undefined) {
	
	                                                console.warn("DEPRECATED: Vector3's .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.");
	                                                return this.crossVectors(v, w);
	                                    }
	
	                                    var x = this.x,
	                                        y = this.y,
	                                        z = this.z;
	
	                                    this.x = y * v.z - z * v.y;
	                                    this.y = z * v.x - x * v.z;
	                                    this.z = x * v.y - y * v.x;
	
	                                    return this;
	                        },
	
	                        crossVectors: function crossVectors(a, b) {
	
	                                    var ax = a.x,
	                                        ay = a.y,
	                                        az = a.z;
	                                    var bx = b.x,
	                                        by = b.y,
	                                        bz = b.z;
	
	                                    this.x = ay * bz - az * by;
	                                    this.y = az * bx - ax * bz;
	                                    this.z = ax * by - ay * bx;
	
	                                    return this;
	                        },
	
	                        projectOnVector: (function () {
	
	                                    var v1, dot;
	
	                                    return function (vector) {
	
	                                                if (v1 === undefined) v1 = new cornerstoneMath.Vector3();
	
	                                                v1.copy(vector).normalize();
	
	                                                dot = this.dot(v1);
	
	                                                return this.copy(v1).multiplyScalar(dot);
	                                    };
	                        })(),
	
	                        projectOnPlane: (function () {
	
	                                    var v1;
	
	                                    return function (planeNormal) {
	
	                                                if (v1 === undefined) v1 = new cornerstoneMath.Vector3();
	
	                                                v1.copy(this).projectOnVector(planeNormal);
	
	                                                return this.sub(v1);
	                                    };
	                        })(),
	
	                        reflect: (function () {
	
	                                    // reflect incident vector off plane orthogonal to normal
	                                    // normal is assumed to have unit length
	
	                                    var v1;
	
	                                    return function (normal) {
	
	                                                if (v1 === undefined) v1 = new cornerstoneMath.Vector3();
	
	                                                return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));
	                                    };
	                        })(),
	
	                        angleTo: function angleTo(v) {
	
	                                    var theta = this.dot(v) / (this.length() * v.length());
	
	                                    // clamp, to handle numerical problems
	
	                                    return Math.acos(cornerstoneMath.clamp(theta, -1, 1));
	                        },
	
	                        distanceTo: function distanceTo(v) {
	
	                                    return Math.sqrt(this.distanceToSquared(v));
	                        },
	
	                        distanceToSquared: function distanceToSquared(v) {
	
	                                    var dx = this.x - v.x;
	                                    var dy = this.y - v.y;
	                                    var dz = this.z - v.z;
	
	                                    return dx * dx + dy * dy + dz * dz;
	                        },
	
	                        setEulerFromRotationMatrix: function setEulerFromRotationMatrix(m, order) {
	
	                                    console.error("REMOVED: Vector3's setEulerFromRotationMatrix has been removed in favor of Euler.setFromRotationMatrix(), please update your code.");
	                        },
	
	                        setEulerFromQuaternion: function setEulerFromQuaternion(q, order) {
	
	                                    console.error("REMOVED: Vector3's setEulerFromQuaternion: has been removed in favor of Euler.setFromQuaternion(), please update your code.");
	                        },
	
	                        getPositionFromMatrix: function getPositionFromMatrix(m) {
	
	                                    console.warn("DEPRECATED: Vector3's .getPositionFromMatrix() has been renamed to .setFromMatrixPosition(). Please update your code.");
	
	                                    return this.setFromMatrixPosition(m);
	                        },
	
	                        getScaleFromMatrix: function getScaleFromMatrix(m) {
	
	                                    console.warn("DEPRECATED: Vector3's .getScaleFromMatrix() has been renamed to .setFromMatrixScale(). Please update your code.");
	
	                                    return this.setFromMatrixScale(m);
	                        },
	
	                        getColumnFromMatrix: function getColumnFromMatrix(index, matrix) {
	
	                                    console.warn("DEPRECATED: Vector3's .getColumnFromMatrix() has been renamed to .setFromMatrixColumn(). Please update your code.");
	
	                                    return this.setFromMatrixColumn(index, matrix);
	                        },
	
	                        setFromMatrixPosition: function setFromMatrixPosition(m) {
	
	                                    this.x = m.elements[12];
	                                    this.y = m.elements[13];
	                                    this.z = m.elements[14];
	
	                                    return this;
	                        },
	
	                        setFromMatrixScale: function setFromMatrixScale(m) {
	
	                                    var sx = this.set(m.elements[0], m.elements[1], m.elements[2]).length();
	                                    var sy = this.set(m.elements[4], m.elements[5], m.elements[6]).length();
	                                    var sz = this.set(m.elements[8], m.elements[9], m.elements[10]).length();
	
	                                    this.x = sx;
	                                    this.y = sy;
	                                    this.z = sz;
	
	                                    return this;
	                        },
	
	                        setFromMatrixColumn: function setFromMatrixColumn(index, matrix) {
	
	                                    var offset = index * 4;
	
	                                    var me = matrix.elements;
	
	                                    this.x = me[offset];
	                                    this.y = me[offset + 1];
	                                    this.z = me[offset + 2];
	
	                                    return this;
	                        },
	
	                        equals: function equals(v) {
	
	                                    return v.x === this.x && v.y === this.y && v.z === this.z;
	                        },
	
	                        fromArray: function fromArray(array) {
	
	                                    this.x = array[0];
	                                    this.y = array[1];
	                                    this.z = array[2];
	
	                                    return this;
	                        },
	
	                        toArray: function toArray() {
	
	                                    return [this.x, this.y, this.z];
	                        },
	
	                        clone: function clone() {
	
	                                    return new cornerstoneMath.Vector3(this.x, this.y, this.z);
	                        }
	
	            };
	
	            return cornerstoneMath;
	})(cornerstoneMath);
	// End Source; src/vector3.js
	
	module.exports = cornerstoneMath;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * jQuery File Upload Plugin 5.42.3
	 * https://github.com/blueimp/jQuery-File-Upload
	 *
	 * Copyright 2010, Sebastian Tschan
	 * https://blueimp.net
	 *
	 * Licensed under the MIT license:
	 * http://www.opensource.org/licenses/MIT
	 */
	
	/* jshint nomen:false */
	/* global define, require, window, document, location, Blob, FormData */
	
	"use strict";
	
	(function (factory) {
	    "use strict";
	    if (true) {
	        // Register as an anonymous AMD module:
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === "object") {
	        // Node/CommonJS:
	        factory(require("jquery"), require("./vendor/jquery.ui.widget"));
	    } else {
	        // Browser globals:
	        factory(window.jQuery);
	    }
	})(function ($) {
	    "use strict";
	
	    // Detect file input support, based on
	    // http://viljamis.com/blog/2012/file-upload-support-on-mobile/
	    $.support.fileInput = !(new RegExp(
	    // Handle devices which give false positives for the feature detection:
	    "(Android (1\\.[0156]|2\\.[01]))" + "|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)" + "|(w(eb)?OSBrowser)|(webOS)" + "|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent) ||
	    // Feature detection for all other devices:
	    $("<input type=\"file\">").prop("disabled"));
	
	    // The FileReader API is not actually used, but works as feature detection,
	    // as some Safari versions (5?) support XHR file uploads via the FormData API,
	    // but not non-multipart XHR file uploads.
	    // window.XMLHttpRequestUpload is not available on IE10, so we check for
	    // window.ProgressEvent instead to detect XHR2 file upload capability:
	    $.support.xhrFileUpload = !!(window.ProgressEvent && window.FileReader);
	    $.support.xhrFormDataFileUpload = !!window.FormData;
	
	    // Detect support for Blob slicing (required for chunked uploads):
	    $.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice);
	
	    // Helper function to create drag handlers for dragover/dragenter/dragleave:
	    function getDragHandler(type) {
	        var isDragOver = type === "dragover";
	        return function (e) {
	            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
	            var dataTransfer = e.dataTransfer;
	            if (dataTransfer && $.inArray("Files", dataTransfer.types) !== -1 && this._trigger(type, $.Event(type, { delegatedEvent: e })) !== false) {
	                e.preventDefault();
	                if (isDragOver) {
	                    dataTransfer.dropEffect = "copy";
	                }
	            }
	        };
	    }
	
	    // The fileupload widget listens for change events on file input fields defined
	    // via fileInput setting and paste or drop events of the given dropZone.
	    // In addition to the default jQuery Widget methods, the fileupload widget
	    // exposes the "add" and "send" methods, to add or directly send files using
	    // the fileupload API.
	    // By default, files added via file input selection, paste, drag & drop or
	    // "add" method are uploaded immediately, but it is possible to override
	    // the "add" callback option to queue file uploads.
	    $.widget("blueimp.fileupload", {
	
	        options: {
	            // The drop target element(s), by the default the complete document.
	            // Set to null to disable drag & drop support:
	            dropZone: $(document),
	            // The paste target element(s), by the default undefined.
	            // Set to a DOM node or jQuery object to enable file pasting:
	            pasteZone: undefined,
	            // The file input field(s), that are listened to for change events.
	            // If undefined, it is set to the file input fields inside
	            // of the widget element on plugin initialization.
	            // Set to null to disable the change listener.
	            fileInput: undefined,
	            // By default, the file input field is replaced with a clone after
	            // each input field change event. This is required for iframe transport
	            // queues and allows change events to be fired for the same file
	            // selection, but can be disabled by setting the following option to false:
	            replaceFileInput: true,
	            // The parameter name for the file form data (the request argument name).
	            // If undefined or empty, the name property of the file input field is
	            // used, or "files[]" if the file input name property is also empty,
	            // can be a string or an array of strings:
	            paramName: undefined,
	            // By default, each file of a selection is uploaded using an individual
	            // request for XHR type uploads. Set to false to upload file
	            // selections in one request each:
	            singleFileUploads: true,
	            // To limit the number of files uploaded with one XHR request,
	            // set the following option to an integer greater than 0:
	            limitMultiFileUploads: undefined,
	            // The following option limits the number of files uploaded with one
	            // XHR request to keep the request size under or equal to the defined
	            // limit in bytes:
	            limitMultiFileUploadSize: undefined,
	            // Multipart file uploads add a number of bytes to each uploaded file,
	            // therefore the following option adds an overhead for each file used
	            // in the limitMultiFileUploadSize configuration:
	            limitMultiFileUploadSizeOverhead: 512,
	            // Set the following option to true to issue all file upload requests
	            // in a sequential order:
	            sequentialUploads: false,
	            // To limit the number of concurrent uploads,
	            // set the following option to an integer greater than 0:
	            limitConcurrentUploads: undefined,
	            // Set the following option to true to force iframe transport uploads:
	            forceIframeTransport: false,
	            // Set the following option to the location of a redirect url on the
	            // origin server, for cross-domain iframe transport uploads:
	            redirect: undefined,
	            // The parameter name for the redirect url, sent as part of the form
	            // data and set to 'redirect' if this option is empty:
	            redirectParamName: undefined,
	            // Set the following option to the location of a postMessage window,
	            // to enable postMessage transport uploads:
	            postMessage: undefined,
	            // By default, XHR file uploads are sent as multipart/form-data.
	            // The iframe transport is always using multipart/form-data.
	            // Set to false to enable non-multipart XHR uploads:
	            multipart: true,
	            // To upload large files in smaller chunks, set the following option
	            // to a preferred maximum chunk size. If set to 0, null or undefined,
	            // or the browser does not support the required Blob API, files will
	            // be uploaded as a whole.
	            maxChunkSize: undefined,
	            // When a non-multipart upload or a chunked multipart upload has been
	            // aborted, this option can be used to resume the upload by setting
	            // it to the size of the already uploaded bytes. This option is most
	            // useful when modifying the options object inside of the "add" or
	            // "send" callbacks, as the options are cloned for each file upload.
	            uploadedBytes: undefined,
	            // By default, failed (abort or error) file uploads are removed from the
	            // global progress calculation. Set the following option to false to
	            // prevent recalculating the global progress data:
	            recalculateProgress: true,
	            // Interval in milliseconds to calculate and trigger progress events:
	            progressInterval: 100,
	            // Interval in milliseconds to calculate progress bitrate:
	            bitrateInterval: 500,
	            // By default, uploads are started automatically when adding files:
	            autoUpload: true,
	
	            // Error and info messages:
	            messages: {
	                uploadedBytes: "Uploaded bytes exceed file size"
	            },
	
	            // Translation function, gets the message key to be translated
	            // and an object with context specific data as arguments:
	            i18n: function i18n(message, context) {
	                message = this.messages[message] || message.toString();
	                if (context) {
	                    $.each(context, function (key, value) {
	                        message = message.replace("{" + key + "}", value);
	                    });
	                }
	                return message;
	            },
	
	            // Additional form data to be sent along with the file uploads can be set
	            // using this option, which accepts an array of objects with name and
	            // value properties, a function returning such an array, a FormData
	            // object (for XHR file uploads), or a simple object.
	            // The form of the first fileInput is given as parameter to the function:
	            formData: function formData(form) {
	                return form.serializeArray();
	            },
	
	            // The add callback is invoked as soon as files are added to the fileupload
	            // widget (via file input selection, drag & drop, paste or add API call).
	            // If the singleFileUploads option is enabled, this callback will be
	            // called once for each file in the selection for XHR file uploads, else
	            // once for each file selection.
	            //
	            // The upload starts when the submit method is invoked on the data parameter.
	            // The data object contains a files property holding the added files
	            // and allows you to override plugin options as well as define ajax settings.
	            //
	            // Listeners for this callback can also be bound the following way:
	            // .bind('fileuploadadd', func);
	            //
	            // data.submit() returns a Promise object and allows to attach additional
	            // handlers using jQuery's Deferred callbacks:
	            // data.submit().done(func).fail(func).always(func);
	            add: function add(e, data) {
	                if (e.isDefaultPrevented()) {
	                    return false;
	                }
	                if (data.autoUpload || data.autoUpload !== false && $(this).fileupload("option", "autoUpload")) {
	                    data.process().done(function () {
	                        data.submit();
	                    });
	                }
	            },
	
	            // Other callbacks:
	
	            // Callback for the submit event of each file upload:
	            // submit: function (e, data) {}, // .bind('fileuploadsubmit', func);
	
	            // Callback for the start of each file upload request:
	            // send: function (e, data) {}, // .bind('fileuploadsend', func);
	
	            // Callback for successful uploads:
	            // done: function (e, data) {}, // .bind('fileuploaddone', func);
	
	            // Callback for failed (abort or error) uploads:
	            // fail: function (e, data) {}, // .bind('fileuploadfail', func);
	
	            // Callback for completed (success, abort or error) requests:
	            // always: function (e, data) {}, // .bind('fileuploadalways', func);
	
	            // Callback for upload progress events:
	            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);
	
	            // Callback for global upload progress events:
	            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);
	
	            // Callback for uploads start, equivalent to the global ajaxStart event:
	            // start: function (e) {}, // .bind('fileuploadstart', func);
	
	            // Callback for uploads stop, equivalent to the global ajaxStop event:
	            // stop: function (e) {}, // .bind('fileuploadstop', func);
	
	            // Callback for change events of the fileInput(s):
	            // change: function (e, data) {}, // .bind('fileuploadchange', func);
	
	            // Callback for paste events to the pasteZone(s):
	            // paste: function (e, data) {}, // .bind('fileuploadpaste', func);
	
	            // Callback for drop events of the dropZone(s):
	            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);
	
	            // Callback for dragover events of the dropZone(s):
	            // dragover: function (e) {}, // .bind('fileuploaddragover', func);
	
	            // Callback for the start of each chunk upload request:
	            // chunksend: function (e, data) {}, // .bind('fileuploadchunksend', func);
	
	            // Callback for successful chunk uploads:
	            // chunkdone: function (e, data) {}, // .bind('fileuploadchunkdone', func);
	
	            // Callback for failed (abort or error) chunk uploads:
	            // chunkfail: function (e, data) {}, // .bind('fileuploadchunkfail', func);
	
	            // Callback for completed (success, abort or error) chunk upload requests:
	            // chunkalways: function (e, data) {}, // .bind('fileuploadchunkalways', func);
	
	            // The plugin options are used as settings object for the ajax calls.
	            // The following are jQuery ajax settings required for the file uploads:
	            processData: false,
	            contentType: false,
	            cache: false
	        },
	
	        // A list of options that require reinitializing event listeners and/or
	        // special initialization code:
	        _specialOptions: ["fileInput", "dropZone", "pasteZone", "multipart", "forceIframeTransport"],
	
	        _blobSlice: $.support.blobSlice && function () {
	            var slice = this.slice || this.webkitSlice || this.mozSlice;
	            return slice.apply(this, arguments);
	        },
	
	        _BitrateTimer: function _BitrateTimer() {
	            this.timestamp = Date.now ? Date.now() : new Date().getTime();
	            this.loaded = 0;
	            this.bitrate = 0;
	            this.getBitrate = function (now, loaded, interval) {
	                var timeDiff = now - this.timestamp;
	                if (!this.bitrate || !interval || timeDiff > interval) {
	                    this.bitrate = (loaded - this.loaded) * (1000 / timeDiff) * 8;
	                    this.loaded = loaded;
	                    this.timestamp = now;
	                }
	                return this.bitrate;
	            };
	        },
	
	        _isXHRUpload: function _isXHRUpload(options) {
	            return !options.forceIframeTransport && (!options.multipart && $.support.xhrFileUpload || $.support.xhrFormDataFileUpload);
	        },
	
	        _getFormData: function _getFormData(options) {
	            var formData;
	            if ($.type(options.formData) === "function") {
	                return options.formData(options.form);
	            }
	            if ($.isArray(options.formData)) {
	                return options.formData;
	            }
	            if ($.type(options.formData) === "object") {
	                formData = [];
	                $.each(options.formData, function (name, value) {
	                    formData.push({ name: name, value: value });
	                });
	                return formData;
	            }
	            return [];
	        },
	
	        _getTotal: function _getTotal(files) {
	            var total = 0;
	            $.each(files, function (index, file) {
	                total += file.size || 1;
	            });
	            return total;
	        },
	
	        _initProgressObject: function _initProgressObject(obj) {
	            var progress = {
	                loaded: 0,
	                total: 0,
	                bitrate: 0
	            };
	            if (obj._progress) {
	                $.extend(obj._progress, progress);
	            } else {
	                obj._progress = progress;
	            }
	        },
	
	        _initResponseObject: function _initResponseObject(obj) {
	            var prop;
	            if (obj._response) {
	                for (prop in obj._response) {
	                    if (obj._response.hasOwnProperty(prop)) {
	                        delete obj._response[prop];
	                    }
	                }
	            } else {
	                obj._response = {};
	            }
	        },
	
	        _onProgress: function _onProgress(e, data) {
	            if (e.lengthComputable) {
	                var now = Date.now ? Date.now() : new Date().getTime(),
	                    loaded;
	                if (data._time && data.progressInterval && now - data._time < data.progressInterval && e.loaded !== e.total) {
	                    return;
	                }
	                data._time = now;
	                loaded = Math.floor(e.loaded / e.total * (data.chunkSize || data._progress.total)) + (data.uploadedBytes || 0);
	                // Add the difference from the previously loaded state
	                // to the global loaded counter:
	                this._progress.loaded += loaded - data._progress.loaded;
	                this._progress.bitrate = this._bitrateTimer.getBitrate(now, this._progress.loaded, data.bitrateInterval);
	                data._progress.loaded = data.loaded = loaded;
	                data._progress.bitrate = data.bitrate = data._bitrateTimer.getBitrate(now, loaded, data.bitrateInterval);
	                // Trigger a custom progress event with a total data property set
	                // to the file size(s) of the current upload and a loaded data
	                // property calculated accordingly:
	                this._trigger("progress", $.Event("progress", { delegatedEvent: e }), data);
	                // Trigger a global progress event for all current file uploads,
	                // including ajax calls queued for sequential file uploads:
	                this._trigger("progressall", $.Event("progressall", { delegatedEvent: e }), this._progress);
	            }
	        },
	
	        _initProgressListener: function _initProgressListener(options) {
	            var that = this,
	                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
	            // Accesss to the native XHR object is required to add event listeners
	            // for the upload progress event:
	            if (xhr.upload) {
	                $(xhr.upload).bind("progress", function (e) {
	                    var oe = e.originalEvent;
	                    // Make sure the progress event properties get copied over:
	                    e.lengthComputable = oe.lengthComputable;
	                    e.loaded = oe.loaded;
	                    e.total = oe.total;
	                    that._onProgress(e, options);
	                });
	                options.xhr = function () {
	                    return xhr;
	                };
	            }
	        },
	
	        _isInstanceOf: function _isInstanceOf(type, obj) {
	            // Cross-frame instanceof check
	            return Object.prototype.toString.call(obj) === "[object " + type + "]";
	        },
	
	        _initXHRData: function _initXHRData(options) {
	            var that = this,
	                formData,
	                file = options.files[0],
	
	            // Ignore non-multipart setting if not supported:
	            multipart = options.multipart || !$.support.xhrFileUpload,
	                paramName = $.type(options.paramName) === "array" ? options.paramName[0] : options.paramName;
	            options.headers = $.extend({}, options.headers);
	            if (options.contentRange) {
	                options.headers["Content-Range"] = options.contentRange;
	            }
	            if (!multipart || options.blob || !this._isInstanceOf("File", file)) {
	                options.headers["Content-Disposition"] = "attachment; filename=\"" + encodeURI(file.name) + "\"";
	            }
	            if (!multipart) {
	                options.contentType = file.type || "application/octet-stream";
	                options.data = options.blob || file;
	            } else if ($.support.xhrFormDataFileUpload) {
	                if (options.postMessage) {
	                    // window.postMessage does not allow sending FormData
	                    // objects, so we just add the File/Blob objects to
	                    // the formData array and let the postMessage window
	                    // create the FormData object out of this array:
	                    formData = this._getFormData(options);
	                    if (options.blob) {
	                        formData.push({
	                            name: paramName,
	                            value: options.blob
	                        });
	                    } else {
	                        $.each(options.files, function (index, file) {
	                            formData.push({
	                                name: $.type(options.paramName) === "array" && options.paramName[index] || paramName,
	                                value: file
	                            });
	                        });
	                    }
	                } else {
	                    if (that._isInstanceOf("FormData", options.formData)) {
	                        formData = options.formData;
	                    } else {
	                        formData = new FormData();
	                        $.each(this._getFormData(options), function (index, field) {
	                            formData.append(field.name, field.value);
	                        });
	                    }
	                    if (options.blob) {
	                        formData.append(paramName, options.blob, file.name);
	                    } else {
	                        $.each(options.files, function (index, file) {
	                            // This check allows the tests to run with
	                            // dummy objects:
	                            if (that._isInstanceOf("File", file) || that._isInstanceOf("Blob", file)) {
	                                formData.append($.type(options.paramName) === "array" && options.paramName[index] || paramName, file, file.uploadName || file.name);
	                            }
	                        });
	                    }
	                }
	                options.data = formData;
	            }
	            // Blob reference is not needed anymore, free memory:
	            options.blob = null;
	        },
	
	        _initIframeSettings: function _initIframeSettings(options) {
	            var targetHost = $("<a></a>").prop("href", options.url).prop("host");
	            // Setting the dataType to iframe enables the iframe transport:
	            options.dataType = "iframe " + (options.dataType || "");
	            // The iframe transport accepts a serialized array as form data:
	            options.formData = this._getFormData(options);
	            // Add redirect url to form data on cross-domain uploads:
	            if (options.redirect && targetHost && targetHost !== location.host) {
	                options.formData.push({
	                    name: options.redirectParamName || "redirect",
	                    value: options.redirect
	                });
	            }
	        },
	
	        _initDataSettings: function _initDataSettings(options) {
	            if (this._isXHRUpload(options)) {
	                if (!this._chunkedUpload(options, true)) {
	                    if (!options.data) {
	                        this._initXHRData(options);
	                    }
	                    this._initProgressListener(options);
	                }
	                if (options.postMessage) {
	                    // Setting the dataType to postmessage enables the
	                    // postMessage transport:
	                    options.dataType = "postmessage " + (options.dataType || "");
	                }
	            } else {
	                this._initIframeSettings(options);
	            }
	        },
	
	        _getParamName: function _getParamName(options) {
	            var fileInput = $(options.fileInput),
	                paramName = options.paramName;
	            if (!paramName) {
	                paramName = [];
	                fileInput.each(function () {
	                    var input = $(this),
	                        name = input.prop("name") || "files[]",
	                        i = (input.prop("files") || [1]).length;
	                    while (i) {
	                        paramName.push(name);
	                        i -= 1;
	                    }
	                });
	                if (!paramName.length) {
	                    paramName = [fileInput.prop("name") || "files[]"];
	                }
	            } else if (!$.isArray(paramName)) {
	                paramName = [paramName];
	            }
	            return paramName;
	        },
	
	        _initFormSettings: function _initFormSettings(options) {
	            // Retrieve missing options from the input field and the
	            // associated form, if available:
	            if (!options.form || !options.form.length) {
	                options.form = $(options.fileInput.prop("form"));
	                // If the given file input doesn't have an associated form,
	                // use the default widget file input's form:
	                if (!options.form.length) {
	                    options.form = $(this.options.fileInput.prop("form"));
	                }
	            }
	            options.paramName = this._getParamName(options);
	            if (!options.url) {
	                options.url = options.form.prop("action") || location.href;
	            }
	            // The HTTP request method must be "POST" or "PUT":
	            options.type = (options.type || $.type(options.form.prop("method")) === "string" && options.form.prop("method") || "").toUpperCase();
	            if (options.type !== "POST" && options.type !== "PUT" && options.type !== "PATCH") {
	                options.type = "POST";
	            }
	            if (!options.formAcceptCharset) {
	                options.formAcceptCharset = options.form.attr("accept-charset");
	            }
	        },
	
	        _getAJAXSettings: function _getAJAXSettings(data) {
	            var options = $.extend({}, this.options, data);
	            this._initFormSettings(options);
	            this._initDataSettings(options);
	            return options;
	        },
	
	        // jQuery 1.6 doesn't provide .state(),
	        // while jQuery 1.8+ removed .isRejected() and .isResolved():
	        _getDeferredState: function _getDeferredState(deferred) {
	            if (deferred.state) {
	                return deferred.state();
	            }
	            if (deferred.isResolved()) {
	                return "resolved";
	            }
	            if (deferred.isRejected()) {
	                return "rejected";
	            }
	            return "pending";
	        },
	
	        // Maps jqXHR callbacks to the equivalent
	        // methods of the given Promise object:
	        _enhancePromise: function _enhancePromise(promise) {
	            promise.success = promise.done;
	            promise.error = promise.fail;
	            promise.complete = promise.always;
	            return promise;
	        },
	
	        // Creates and returns a Promise object enhanced with
	        // the jqXHR methods abort, success, error and complete:
	        _getXHRPromise: function _getXHRPromise(resolveOrReject, context, args) {
	            var dfd = $.Deferred(),
	                promise = dfd.promise();
	            context = context || this.options.context || promise;
	            if (resolveOrReject === true) {
	                dfd.resolveWith(context, args);
	            } else if (resolveOrReject === false) {
	                dfd.rejectWith(context, args);
	            }
	            promise.abort = dfd.promise;
	            return this._enhancePromise(promise);
	        },
	
	        // Adds convenience methods to the data callback argument:
	        _addConvenienceMethods: function _addConvenienceMethods(e, data) {
	            var that = this,
	                getPromise = function getPromise(args) {
	                return $.Deferred().resolveWith(that, args).promise();
	            };
	            data.process = function (resolveFunc, rejectFunc) {
	                if (resolveFunc || rejectFunc) {
	                    data._processQueue = this._processQueue = (this._processQueue || getPromise([this])).pipe(function () {
	                        if (data.errorThrown) {
	                            return $.Deferred().rejectWith(that, [data]).promise();
	                        }
	                        return getPromise(arguments);
	                    }).pipe(resolveFunc, rejectFunc);
	                }
	                return this._processQueue || getPromise([this]);
	            };
	            data.submit = function () {
	                if (this.state() !== "pending") {
	                    data.jqXHR = this.jqXHR = that._trigger("submit", $.Event("submit", { delegatedEvent: e }), this) !== false && that._onSend(e, this);
	                }
	                return this.jqXHR || that._getXHRPromise();
	            };
	            data.abort = function () {
	                if (this.jqXHR) {
	                    return this.jqXHR.abort();
	                }
	                this.errorThrown = "abort";
	                that._trigger("fail", null, this);
	                return that._getXHRPromise(false);
	            };
	            data.state = function () {
	                if (this.jqXHR) {
	                    return that._getDeferredState(this.jqXHR);
	                }
	                if (this._processQueue) {
	                    return that._getDeferredState(this._processQueue);
	                }
	            };
	            data.processing = function () {
	                return !this.jqXHR && this._processQueue && that._getDeferredState(this._processQueue) === "pending";
	            };
	            data.progress = function () {
	                return this._progress;
	            };
	            data.response = function () {
	                return this._response;
	            };
	        },
	
	        // Parses the Range header from the server response
	        // and returns the uploaded bytes:
	        _getUploadedBytes: function _getUploadedBytes(jqXHR) {
	            var range = jqXHR.getResponseHeader("Range"),
	                parts = range && range.split("-"),
	                upperBytesPos = parts && parts.length > 1 && parseInt(parts[1], 10);
	            return upperBytesPos && upperBytesPos + 1;
	        },
	
	        // Uploads a file in multiple, sequential requests
	        // by splitting the file up in multiple blob chunks.
	        // If the second parameter is true, only tests if the file
	        // should be uploaded in chunks, but does not invoke any
	        // upload requests:
	        _chunkedUpload: function _chunkedUpload(options, testOnly) {
	            options.uploadedBytes = options.uploadedBytes || 0;
	            var that = this,
	                file = options.files[0],
	                fs = file.size,
	                ub = options.uploadedBytes,
	                mcs = options.maxChunkSize || fs,
	                slice = this._blobSlice,
	                dfd = $.Deferred(),
	                promise = dfd.promise(),
	                jqXHR,
	                upload;
	            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) || options.data) {
	                return false;
	            }
	            if (testOnly) {
	                return true;
	            }
	            if (ub >= fs) {
	                file.error = options.i18n("uploadedBytes");
	                return this._getXHRPromise(false, options.context, [null, "error", file.error]);
	            }
	            // The chunk upload method:
	            upload = function () {
	                // Clone the options object for each chunk upload:
	                var o = $.extend({}, options),
	                    currentLoaded = o._progress.loaded;
	                o.blob = slice.call(file, ub, ub + mcs, file.type);
	                // Store the current chunk size, as the blob itself
	                // will be dereferenced after data processing:
	                o.chunkSize = o.blob.size;
	                // Expose the chunk bytes position range:
	                o.contentRange = "bytes " + ub + "-" + (ub + o.chunkSize - 1) + "/" + fs;
	                // Process the upload data (the blob and potential form data):
	                that._initXHRData(o);
	                // Add progress listeners for this chunk upload:
	                that._initProgressListener(o);
	                jqXHR = (that._trigger("chunksend", null, o) !== false && $.ajax(o) || that._getXHRPromise(false, o.context)).done(function (result, textStatus, jqXHR) {
	                    ub = that._getUploadedBytes(jqXHR) || ub + o.chunkSize;
	                    // Create a progress event if no final progress event
	                    // with loaded equaling total has been triggered
	                    // for this chunk:
	                    if (currentLoaded + o.chunkSize - o._progress.loaded) {
	                        that._onProgress($.Event("progress", {
	                            lengthComputable: true,
	                            loaded: ub - o.uploadedBytes,
	                            total: ub - o.uploadedBytes
	                        }), o);
	                    }
	                    options.uploadedBytes = o.uploadedBytes = ub;
	                    o.result = result;
	                    o.textStatus = textStatus;
	                    o.jqXHR = jqXHR;
	                    that._trigger("chunkdone", null, o);
	                    that._trigger("chunkalways", null, o);
	                    if (ub < fs) {
	                        // File upload not yet complete,
	                        // continue with the next chunk:
	                        upload();
	                    } else {
	                        dfd.resolveWith(o.context, [result, textStatus, jqXHR]);
	                    }
	                }).fail(function (jqXHR, textStatus, errorThrown) {
	                    o.jqXHR = jqXHR;
	                    o.textStatus = textStatus;
	                    o.errorThrown = errorThrown;
	                    that._trigger("chunkfail", null, o);
	                    that._trigger("chunkalways", null, o);
	                    dfd.rejectWith(o.context, [jqXHR, textStatus, errorThrown]);
	                });
	            };
	            this._enhancePromise(promise);
	            promise.abort = function () {
	                return jqXHR.abort();
	            };
	            upload();
	            return promise;
	        },
	
	        _beforeSend: function _beforeSend(e, data) {
	            if (this._active === 0) {
	                // the start callback is triggered when an upload starts
	                // and no other uploads are currently running,
	                // equivalent to the global ajaxStart event:
	                this._trigger("start");
	                // Set timer for global bitrate progress calculation:
	                this._bitrateTimer = new this._BitrateTimer();
	                // Reset the global progress values:
	                this._progress.loaded = this._progress.total = 0;
	                this._progress.bitrate = 0;
	            }
	            // Make sure the container objects for the .response() and
	            // .progress() methods on the data object are available
	            // and reset to their initial state:
	            this._initResponseObject(data);
	            this._initProgressObject(data);
	            data._progress.loaded = data.loaded = data.uploadedBytes || 0;
	            data._progress.total = data.total = this._getTotal(data.files) || 1;
	            data._progress.bitrate = data.bitrate = 0;
	            this._active += 1;
	            // Initialize the global progress values:
	            this._progress.loaded += data.loaded;
	            this._progress.total += data.total;
	        },
	
	        _onDone: function _onDone(result, textStatus, jqXHR, options) {
	            var total = options._progress.total,
	                response = options._response;
	            if (options._progress.loaded < total) {
	                // Create a progress event if no final progress event
	                // with loaded equaling total has been triggered:
	                this._onProgress($.Event("progress", {
	                    lengthComputable: true,
	                    loaded: total,
	                    total: total
	                }), options);
	            }
	            response.result = options.result = result;
	            response.textStatus = options.textStatus = textStatus;
	            response.jqXHR = options.jqXHR = jqXHR;
	            this._trigger("done", null, options);
	        },
	
	        _onFail: function _onFail(jqXHR, textStatus, errorThrown, options) {
	            var response = options._response;
	            if (options.recalculateProgress) {
	                // Remove the failed (error or abort) file upload from
	                // the global progress calculation:
	                this._progress.loaded -= options._progress.loaded;
	                this._progress.total -= options._progress.total;
	            }
	            response.jqXHR = options.jqXHR = jqXHR;
	            response.textStatus = options.textStatus = textStatus;
	            response.errorThrown = options.errorThrown = errorThrown;
	            this._trigger("fail", null, options);
	        },
	
	        _onAlways: function _onAlways(jqXHRorResult, textStatus, jqXHRorError, options) {
	            // jqXHRorResult, textStatus and jqXHRorError are added to the
	            // options object via done and fail callbacks
	            this._trigger("always", null, options);
	        },
	
	        _onSend: function _onSend(e, data) {
	            if (!data.submit) {
	                this._addConvenienceMethods(e, data);
	            }
	            var that = this,
	                jqXHR,
	                aborted,
	                slot,
	                pipe,
	                options = that._getAJAXSettings(data),
	                send = function send() {
	                that._sending += 1;
	                // Set timer for bitrate progress calculation:
	                options._bitrateTimer = new that._BitrateTimer();
	                jqXHR = jqXHR || ((aborted || that._trigger("send", $.Event("send", { delegatedEvent: e }), options) === false) && that._getXHRPromise(false, options.context, aborted) || that._chunkedUpload(options) || $.ajax(options)).done(function (result, textStatus, jqXHR) {
	                    that._onDone(result, textStatus, jqXHR, options);
	                }).fail(function (jqXHR, textStatus, errorThrown) {
	                    that._onFail(jqXHR, textStatus, errorThrown, options);
	                }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
	                    that._onAlways(jqXHRorResult, textStatus, jqXHRorError, options);
	                    that._sending -= 1;
	                    that._active -= 1;
	                    if (options.limitConcurrentUploads && options.limitConcurrentUploads > that._sending) {
	                        // Start the next queued upload,
	                        // that has not been aborted:
	                        var nextSlot = that._slots.shift();
	                        while (nextSlot) {
	                            if (that._getDeferredState(nextSlot) === "pending") {
	                                nextSlot.resolve();
	                                break;
	                            }
	                            nextSlot = that._slots.shift();
	                        }
	                    }
	                    if (that._active === 0) {
	                        // The stop callback is triggered when all uploads have
	                        // been completed, equivalent to the global ajaxStop event:
	                        that._trigger("stop");
	                    }
	                });
	                return jqXHR;
	            };
	            this._beforeSend(e, options);
	            if (this.options.sequentialUploads || this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending) {
	                if (this.options.limitConcurrentUploads > 1) {
	                    slot = $.Deferred();
	                    this._slots.push(slot);
	                    pipe = slot.pipe(send);
	                } else {
	                    this._sequence = this._sequence.pipe(send, send);
	                    pipe = this._sequence;
	                }
	                // Return the piped Promise object, enhanced with an abort method,
	                // which is delegated to the jqXHR object of the current upload,
	                // and jqXHR callbacks mapped to the equivalent Promise methods:
	                pipe.abort = function () {
	                    aborted = [undefined, "abort", "abort"];
	                    if (!jqXHR) {
	                        if (slot) {
	                            slot.rejectWith(options.context, aborted);
	                        }
	                        return send();
	                    }
	                    return jqXHR.abort();
	                };
	                return this._enhancePromise(pipe);
	            }
	            return send();
	        },
	
	        _onAdd: function _onAdd(e, data) {
	            var that = this,
	                result = true,
	                options = $.extend({}, this.options, data),
	                files = data.files,
	                filesLength = files.length,
	                limit = options.limitMultiFileUploads,
	                limitSize = options.limitMultiFileUploadSize,
	                overhead = options.limitMultiFileUploadSizeOverhead,
	                batchSize = 0,
	                paramName = this._getParamName(options),
	                paramNameSet,
	                paramNameSlice,
	                fileSet,
	                i,
	                j = 0;
	            if (limitSize && (!filesLength || files[0].size === undefined)) {
	                limitSize = undefined;
	            }
	            if (!(options.singleFileUploads || limit || limitSize) || !this._isXHRUpload(options)) {
	                fileSet = [files];
	                paramNameSet = [paramName];
	            } else if (!(options.singleFileUploads || limitSize) && limit) {
	                fileSet = [];
	                paramNameSet = [];
	                for (i = 0; i < filesLength; i += limit) {
	                    fileSet.push(files.slice(i, i + limit));
	                    paramNameSlice = paramName.slice(i, i + limit);
	                    if (!paramNameSlice.length) {
	                        paramNameSlice = paramName;
	                    }
	                    paramNameSet.push(paramNameSlice);
	                }
	            } else if (!options.singleFileUploads && limitSize) {
	                fileSet = [];
	                paramNameSet = [];
	                for (i = 0; i < filesLength; i = i + 1) {
	                    batchSize += files[i].size + overhead;
	                    if (i + 1 === filesLength || batchSize + files[i + 1].size + overhead > limitSize || limit && i + 1 - j >= limit) {
	                        fileSet.push(files.slice(j, i + 1));
	                        paramNameSlice = paramName.slice(j, i + 1);
	                        if (!paramNameSlice.length) {
	                            paramNameSlice = paramName;
	                        }
	                        paramNameSet.push(paramNameSlice);
	                        j = i + 1;
	                        batchSize = 0;
	                    }
	                }
	            } else {
	                paramNameSet = paramName;
	            }
	            data.originalFiles = files;
	            $.each(fileSet || files, function (index, element) {
	                var newData = $.extend({}, data);
	                newData.files = fileSet ? element : [element];
	                newData.paramName = paramNameSet[index];
	                that._initResponseObject(newData);
	                that._initProgressObject(newData);
	                that._addConvenienceMethods(e, newData);
	                result = that._trigger("add", $.Event("add", { delegatedEvent: e }), newData);
	                return result;
	            });
	            return result;
	        },
	
	        _replaceFileInput: function _replaceFileInput(data) {
	            var input = data.fileInput,
	                inputClone = input.clone(true);
	            // Add a reference for the new cloned file input to the data argument:
	            data.fileInputClone = inputClone;
	            $("<form></form>").append(inputClone)[0].reset();
	            // Detaching allows to insert the fileInput on another form
	            // without loosing the file input value:
	            input.after(inputClone).detach();
	            // Avoid memory leaks with the detached file input:
	            $.cleanData(input.unbind("remove"));
	            // Replace the original file input element in the fileInput
	            // elements set with the clone, which has been copied including
	            // event handlers:
	            this.options.fileInput = this.options.fileInput.map(function (i, el) {
	                if (el === input[0]) {
	                    return inputClone[0];
	                }
	                return el;
	            });
	            // If the widget has been initialized on the file input itself,
	            // override this.element with the file input clone:
	            if (input[0] === this.element[0]) {
	                this.element = inputClone;
	            }
	        },
	
	        _handleFileTreeEntry: function _handleFileTreeEntry(entry, path) {
	            var that = this,
	                dfd = $.Deferred(),
	                errorHandler = function errorHandler(e) {
	                if (e && !e.entry) {
	                    e.entry = entry;
	                }
	                // Since $.when returns immediately if one
	                // Deferred is rejected, we use resolve instead.
	                // This allows valid files and invalid items
	                // to be returned together in one set:
	                dfd.resolve([e]);
	            },
	                successHandler = function successHandler(entries) {
	                that._handleFileTreeEntries(entries, path + entry.name + "/").done(function (files) {
	                    dfd.resolve(files);
	                }).fail(errorHandler);
	            },
	                readEntries = (function (_readEntries) {
	                var _readEntriesWrapper = function readEntries() {
	                    return _readEntries.apply(this, arguments);
	                };
	
	                _readEntriesWrapper.toString = function () {
	                    return _readEntries.toString();
	                };
	
	                return _readEntriesWrapper;
	            })(function () {
	                dirReader.readEntries(function (results) {
	                    if (!results.length) {
	                        successHandler(entries);
	                    } else {
	                        entries = entries.concat(results);
	                        readEntries();
	                    }
	                }, errorHandler);
	            }),
	                dirReader,
	                entries = [];
	            path = path || "";
	            if (entry.isFile) {
	                if (entry._file) {
	                    // Workaround for Chrome bug #149735
	                    entry._file.relativePath = path;
	                    dfd.resolve(entry._file);
	                } else {
	                    entry.file(function (file) {
	                        file.relativePath = path;
	                        dfd.resolve(file);
	                    }, errorHandler);
	                }
	            } else if (entry.isDirectory) {
	                dirReader = entry.createReader();
	                readEntries();
	            } else {
	                // Return an empy list for file system items
	                // other than files or directories:
	                dfd.resolve([]);
	            }
	            return dfd.promise();
	        },
	
	        _handleFileTreeEntries: function _handleFileTreeEntries(entries, path) {
	            var that = this;
	            return $.when.apply($, $.map(entries, function (entry) {
	                return that._handleFileTreeEntry(entry, path);
	            })).pipe(function () {
	                return Array.prototype.concat.apply([], arguments);
	            });
	        },
	
	        _getDroppedFiles: function _getDroppedFiles(dataTransfer) {
	            dataTransfer = dataTransfer || {};
	            var items = dataTransfer.items;
	            if (items && items.length && (items[0].webkitGetAsEntry || items[0].getAsEntry)) {
	                return this._handleFileTreeEntries($.map(items, function (item) {
	                    var entry;
	                    if (item.webkitGetAsEntry) {
	                        entry = item.webkitGetAsEntry();
	                        if (entry) {
	                            // Workaround for Chrome bug #149735:
	                            entry._file = item.getAsFile();
	                        }
	                        return entry;
	                    }
	                    return item.getAsEntry();
	                }));
	            }
	            return $.Deferred().resolve($.makeArray(dataTransfer.files)).promise();
	        },
	
	        _getSingleFileInputFiles: function _getSingleFileInputFiles(fileInput) {
	            fileInput = $(fileInput);
	            var entries = fileInput.prop("webkitEntries") || fileInput.prop("entries"),
	                files,
	                value;
	            if (entries && entries.length) {
	                return this._handleFileTreeEntries(entries);
	            }
	            files = $.makeArray(fileInput.prop("files"));
	            if (!files.length) {
	                value = fileInput.prop("value");
	                if (!value) {
	                    return $.Deferred().resolve([]).promise();
	                }
	                // If the files property is not available, the browser does not
	                // support the File API and we add a pseudo File object with
	                // the input value as name with path information removed:
	                files = [{ name: value.replace(/^.*\\/, "") }];
	            } else if (files[0].name === undefined && files[0].fileName) {
	                // File normalization for Safari 4 and Firefox 3:
	                $.each(files, function (index, file) {
	                    file.name = file.fileName;
	                    file.size = file.fileSize;
	                });
	            }
	            return $.Deferred().resolve(files).promise();
	        },
	
	        _getFileInputFiles: function _getFileInputFiles(fileInput) {
	            if (!(fileInput instanceof $) || fileInput.length === 1) {
	                return this._getSingleFileInputFiles(fileInput);
	            }
	            return $.when.apply($, $.map(fileInput, this._getSingleFileInputFiles)).pipe(function () {
	                return Array.prototype.concat.apply([], arguments);
	            });
	        },
	
	        _onChange: function _onChange(e) {
	            var that = this,
	                data = {
	                fileInput: $(e.target),
	                form: $(e.target.form)
	            };
	            this._getFileInputFiles(data.fileInput).always(function (files) {
	                data.files = files;
	                if (that.options.replaceFileInput) {
	                    that._replaceFileInput(data);
	                }
	                if (that._trigger("change", $.Event("change", { delegatedEvent: e }), data) !== false) {
	                    that._onAdd(e, data);
	                }
	            });
	        },
	
	        _onPaste: function _onPaste(e) {
	            var items = e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.items,
	                data = { files: [] };
	            if (items && items.length) {
	                $.each(items, function (index, item) {
	                    var file = item.getAsFile && item.getAsFile();
	                    if (file) {
	                        data.files.push(file);
	                    }
	                });
	                if (this._trigger("paste", $.Event("paste", { delegatedEvent: e }), data) !== false) {
	                    this._onAdd(e, data);
	                }
	            }
	        },
	
	        _onDrop: function _onDrop(e) {
	            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
	            var that = this,
	                dataTransfer = e.dataTransfer,
	                data = {};
	            if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
	                e.preventDefault();
	                this._getDroppedFiles(dataTransfer).always(function (files) {
	                    data.files = files;
	                    if (that._trigger("drop", $.Event("drop", { delegatedEvent: e }), data) !== false) {
	                        that._onAdd(e, data);
	                    }
	                });
	            }
	        },
	
	        _onDragOver: getDragHandler("dragover"),
	
	        _onDragEnter: getDragHandler("dragenter"),
	
	        _onDragLeave: getDragHandler("dragleave"),
	
	        _initEventHandlers: function _initEventHandlers() {
	            if (this._isXHRUpload(this.options)) {
	                this._on(this.options.dropZone, {
	                    dragover: this._onDragOver,
	                    drop: this._onDrop,
	                    // event.preventDefault() on dragenter is required for IE10+:
	                    dragenter: this._onDragEnter,
	                    // dragleave is not required, but added for completeness:
	                    dragleave: this._onDragLeave
	                });
	                this._on(this.options.pasteZone, {
	                    paste: this._onPaste
	                });
	            }
	            if ($.support.fileInput) {
	                this._on(this.options.fileInput, {
	                    change: this._onChange
	                });
	            }
	        },
	
	        _destroyEventHandlers: function _destroyEventHandlers() {
	            this._off(this.options.dropZone, "dragenter dragleave dragover drop");
	            this._off(this.options.pasteZone, "paste");
	            this._off(this.options.fileInput, "change");
	        },
	
	        _setOption: function _setOption(key, value) {
	            var reinit = $.inArray(key, this._specialOptions) !== -1;
	            if (reinit) {
	                this._destroyEventHandlers();
	            }
	            this._super(key, value);
	            if (reinit) {
	                this._initSpecialOptions();
	                this._initEventHandlers();
	            }
	        },
	
	        _initSpecialOptions: function _initSpecialOptions() {
	            var options = this.options;
	            if (options.fileInput === undefined) {
	                options.fileInput = this.element.is("input[type=\"file\"]") ? this.element : this.element.find("input[type=\"file\"]");
	            } else if (!(options.fileInput instanceof $)) {
	                options.fileInput = $(options.fileInput);
	            }
	            if (!(options.dropZone instanceof $)) {
	                options.dropZone = $(options.dropZone);
	            }
	            if (!(options.pasteZone instanceof $)) {
	                options.pasteZone = $(options.pasteZone);
	            }
	        },
	
	        _getRegExp: function _getRegExp(str) {
	            var parts = str.split("/"),
	                modifiers = parts.pop();
	            parts.shift();
	            return new RegExp(parts.join("/"), modifiers);
	        },
	
	        _isRegExpOption: function _isRegExpOption(key, value) {
	            return key !== "url" && $.type(value) === "string" && /^\/.*\/[igm]{0,3}$/.test(value);
	        },
	
	        _initDataAttributes: function _initDataAttributes() {
	            var that = this,
	                options = this.options,
	                data = this.element.data();
	            // Initialize options set via HTML5 data-attributes:
	            $.each(this.element[0].attributes, function (index, attr) {
	                var key = attr.name.toLowerCase(),
	                    value;
	                if (/^data-/.test(key)) {
	                    // Convert hyphen-ated key to camelCase:
	                    key = key.slice(5).replace(/-[a-z]/g, function (str) {
	                        return str.charAt(1).toUpperCase();
	                    });
	                    value = data[key];
	                    if (that._isRegExpOption(key, value)) {
	                        value = that._getRegExp(value);
	                    }
	                    options[key] = value;
	                }
	            });
	        },
	
	        _create: function _create() {
	            this._initDataAttributes();
	            this._initSpecialOptions();
	            this._slots = [];
	            this._sequence = this._getXHRPromise(true);
	            this._sending = this._active = 0;
	            this._initProgressObject(this);
	            this._initEventHandlers();
	        },
	
	        // This method is exposed to the widget API and allows to query
	        // the number of active uploads:
	        active: function active() {
	            return this._active;
	        },
	
	        // This method is exposed to the widget API and allows to query
	        // the widget upload progress.
	        // It returns an object with loaded, total and bitrate properties
	        // for the running uploads:
	        progress: function progress() {
	            return this._progress;
	        },
	
	        // This method is exposed to the widget API and allows adding files
	        // using the fileupload API. The data parameter accepts an object which
	        // must have a files property and can contain additional options:
	        // .fileupload('add', {files: filesList});
	        add: function add(data) {
	            var that = this;
	            if (!data || this.options.disabled) {
	                return;
	            }
	            if (data.fileInput && !data.files) {
	                this._getFileInputFiles(data.fileInput).always(function (files) {
	                    data.files = files;
	                    that._onAdd(null, data);
	                });
	            } else {
	                data.files = $.makeArray(data.files);
	                this._onAdd(null, data);
	            }
	        },
	
	        // This method is exposed to the widget API and allows sending files
	        // using the fileupload API. The data parameter accepts an object which
	        // must have a files or fileInput property and can contain additional options:
	        // .fileupload('send', {files: filesList});
	        // The method returns a Promise object for the file upload call.
	        send: function send(data) {
	            if (data && !this.options.disabled) {
	                if (data.fileInput && !data.files) {
	                    var that = this,
	                        dfd = $.Deferred(),
	                        promise = dfd.promise(),
	                        jqXHR,
	                        aborted;
	                    promise.abort = function () {
	                        aborted = true;
	                        if (jqXHR) {
	                            return jqXHR.abort();
	                        }
	                        dfd.reject(null, "abort", "abort");
	                        return promise;
	                    };
	                    this._getFileInputFiles(data.fileInput).always(function (files) {
	                        if (aborted) {
	                            return;
	                        }
	                        if (!files.length) {
	                            dfd.reject();
	                            return;
	                        }
	                        data.files = files;
	                        jqXHR = that._onSend(null, data);
	                        jqXHR.then(function (result, textStatus, jqXHR) {
	                            dfd.resolve(result, textStatus, jqXHR);
	                        }, function (jqXHR, textStatus, errorThrown) {
	                            dfd.reject(jqXHR, textStatus, errorThrown);
	                        });
	                    });
	                    return this._enhancePromise(promise);
	                }
	                data.files = $.makeArray(data.files);
	                if (data.files.length) {
	                    return this._onSend(null, data);
	                }
	            }
	            return this._getXHRPromise(false, data && data.context);
	        }
	
	    });
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// Top level file is just a mixin of submodules & constants
	"use strict";
	
	var assign = __webpack_require__(35).assign;
	
	var deflate = __webpack_require__(36);
	var inflate = __webpack_require__(37);
	var constants = __webpack_require__(38);
	
	var pako = {};
	
	assign(pako, deflate, inflate, constants);
	
	module.exports = pako;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var base64_url_decode = __webpack_require__(39);
	var json_parse = __webpack_require__(40);
	
	module.exports = function (token) {
	  return json_parse(base64_url_decode(token.split(".")[1]));
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var TYPED_OK = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
	
	exports.assign = function (obj /*from1, from2, from3, ...*/) {
	  var sources = Array.prototype.slice.call(arguments, 1);
	  while (sources.length) {
	    var source = sources.shift();
	    if (!source) {
	      continue;
	    }
	
	    if (typeof source !== "object") {
	      throw new TypeError(source + "must be non-object");
	    }
	
	    for (var p in source) {
	      if (source.hasOwnProperty(p)) {
	        obj[p] = source[p];
	      }
	    }
	  }
	
	  return obj;
	};
	
	// reduce buffer size, avoiding mem copy
	exports.shrinkBuf = function (buf, size) {
	  if (buf.length === size) {
	    return buf;
	  }
	  if (buf.subarray) {
	    return buf.subarray(0, size);
	  }
	  buf.length = size;
	  return buf;
	};
	
	var fnTyped = {
	  arraySet: function arraySet(dest, src, src_offs, len, dest_offs) {
	    if (src.subarray && dest.subarray) {
	      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
	      return;
	    }
	    // Fallback to ordinary array
	    for (var i = 0; i < len; i++) {
	      dest[dest_offs + i] = src[src_offs + i];
	    }
	  },
	  // Join array of chunks to single array.
	  flattenChunks: function flattenChunks(chunks) {
	    var i, l, len, pos, chunk, result;
	
	    // calculate data length
	    len = 0;
	    for (i = 0, l = chunks.length; i < l; i++) {
	      len += chunks[i].length;
	    }
	
	    // join chunks
	    result = new Uint8Array(len);
	    pos = 0;
	    for (i = 0, l = chunks.length; i < l; i++) {
	      chunk = chunks[i];
	      result.set(chunk, pos);
	      pos += chunk.length;
	    }
	
	    return result;
	  }
	};
	
	var fnUntyped = {
	  arraySet: function arraySet(dest, src, src_offs, len, dest_offs) {
	    for (var i = 0; i < len; i++) {
	      dest[dest_offs + i] = src[src_offs + i];
	    }
	  },
	  // Join array of chunks to single array.
	  flattenChunks: function flattenChunks(chunks) {
	    return [].concat.apply([], chunks);
	  }
	};
	
	// Enable/Disable typed arrays use, for testing
	//
	exports.setTyped = function (on) {
	  if (on) {
	    exports.Buf8 = Uint8Array;
	    exports.Buf16 = Uint16Array;
	    exports.Buf32 = Int32Array;
	    exports.assign(exports, fnTyped);
	  } else {
	    exports.Buf8 = Array;
	    exports.Buf16 = Array;
	    exports.Buf32 = Array;
	    exports.assign(exports, fnUntyped);
	  }
	};
	
	exports.setTyped(TYPED_OK);

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var zlib_deflate = __webpack_require__(46);
	var utils = __webpack_require__(35);
	var strings = __webpack_require__(42);
	var msg = __webpack_require__(43);
	var zstream = __webpack_require__(44);
	
	var toString = Object.prototype.toString;
	
	/* Public constants ==========================================================*/
	/* ===========================================================================*/
	
	var Z_NO_FLUSH = 0;
	var Z_FINISH = 4;
	
	var Z_OK = 0;
	var Z_STREAM_END = 1;
	
	var Z_DEFAULT_COMPRESSION = -1;
	
	var Z_DEFAULT_STRATEGY = 0;
	
	var Z_DEFLATED = 8;
	
	/* ===========================================================================*/
	
	/**
	 * class Deflate
	 *
	 * Generic JS-style wrapper for zlib calls. If you don't need
	 * streaming behaviour - use more simple functions: [[deflate]],
	 * [[deflateRaw]] and [[gzip]].
	 **/
	
	/* internal
	 * Deflate.chunks -> Array
	 *
	 * Chunks of output data, if [[Deflate#onData]] not overriden.
	 **/
	
	/**
	 * Deflate.result -> Uint8Array|Array
	 *
	 * Compressed result, generated by default [[Deflate#onData]]
	 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
	 * (call [[Deflate#push]] with `Z_FINISH` / `true` param).
	 **/
	
	/**
	 * Deflate.err -> Number
	 *
	 * Error code after deflate finished. 0 (Z_OK) on success.
	 * You will not need it in real life, because deflate errors
	 * are possible only on wrong options or bad `onData` / `onEnd`
	 * custom handlers.
	 **/
	
	/**
	 * Deflate.msg -> String
	 *
	 * Error message, if [[Deflate.err]] != 0
	 **/
	
	/**
	 * new Deflate(options)
	 * - options (Object): zlib deflate options.
	 *
	 * Creates new deflator instance with specified params. Throws exception
	 * on bad params. Supported options:
	 *
	 * - `level`
	 * - `windowBits`
	 * - `memLevel`
	 * - `strategy`
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information on these.
	 *
	 * Additional options, for internal needs:
	 *
	 * - `chunkSize` - size of generated data chunks (16K by default)
	 * - `raw` (Boolean) - do raw deflate
	 * - `gzip` (Boolean) - create gzip wrapper
	 * - `to` (String) - if equal to 'string', then result will be "binary string"
	 *    (each char code [0..255])
	 * - `header` (Object) - custom header for gzip
	 *   - `text` (Boolean) - true if compressed data believed to be text
	 *   - `time` (Number) - modification time, unix timestamp
	 *   - `os` (Number) - operation system code
	 *   - `extra` (Array) - array of bytes with extra data (max 65536)
	 *   - `name` (String) - file name (binary string)
	 *   - `comment` (String) - comment (binary string)
	 *   - `hcrc` (Boolean) - true if header crc should be added
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
	 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
	 *
	 * var deflate = new pako.Deflate({ level: 3});
	 *
	 * deflate.push(chunk1, false);
	 * deflate.push(chunk2, true);  // true -> last chunk
	 *
	 * if (deflate.err) { throw new Error(deflate.err); }
	 *
	 * console.log(deflate.result);
	 * ```
	 **/
	var Deflate = function Deflate(options) {
	
	  this.options = utils.assign({
	    level: Z_DEFAULT_COMPRESSION,
	    method: Z_DEFLATED,
	    chunkSize: 16384,
	    windowBits: 15,
	    memLevel: 8,
	    strategy: Z_DEFAULT_STRATEGY,
	    to: ""
	  }, options || {});
	
	  var opt = this.options;
	
	  if (opt.raw && opt.windowBits > 0) {
	    opt.windowBits = -opt.windowBits;
	  } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
	    opt.windowBits += 16;
	  }
	
	  this.err = 0; // error code, if happens (0 = Z_OK)
	  this.msg = ""; // error message
	  this.ended = false; // used to avoid multiple onEnd() calls
	  this.chunks = []; // chunks of compressed data
	
	  this.strm = new zstream();
	  this.strm.avail_out = 0;
	
	  var status = zlib_deflate.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);
	
	  if (status !== Z_OK) {
	    throw new Error(msg[status]);
	  }
	
	  if (opt.header) {
	    zlib_deflate.deflateSetHeader(this.strm, opt.header);
	  }
	};
	
	/**
	 * Deflate#push(data[, mode]) -> Boolean
	 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
	 *   converted to utf8 byte sequence.
	 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
	 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
	 *
	 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
	 * new compressed chunks. Returns `true` on success. The last data block must have
	 * mode Z_FINISH (or `true`). That flush internal pending buffers and call
	 * [[Deflate#onEnd]].
	 *
	 * On fail call [[Deflate#onEnd]] with error code and return false.
	 *
	 * We strongly recommend to use `Uint8Array` on input for best speed (output
	 * array format is detected automatically). Also, don't skip last param and always
	 * use the same type in your code (boolean or number). That will improve JS speed.
	 *
	 * For regular `Array`-s make sure all elements are [0..255].
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * push(chunk, false); // push one of data chunks
	 * ...
	 * push(chunk, true);  // push last chunk
	 * ```
	 **/
	Deflate.prototype.push = function (data, mode) {
	  var strm = this.strm;
	  var chunkSize = this.options.chunkSize;
	  var status, _mode;
	
	  if (this.ended) {
	    return false;
	  }
	
	  _mode = mode === ~ ~mode ? mode : mode === true ? Z_FINISH : Z_NO_FLUSH;
	
	  // Convert data if needed
	  if (typeof data === "string") {
	    // If we need to compress text, change encoding to utf8.
	    strm.input = strings.string2buf(data);
	  } else if (toString.call(data) === "[object ArrayBuffer]") {
	    strm.input = new Uint8Array(data);
	  } else {
	    strm.input = data;
	  }
	
	  strm.next_in = 0;
	  strm.avail_in = strm.input.length;
	
	  do {
	    if (strm.avail_out === 0) {
	      strm.output = new utils.Buf8(chunkSize);
	      strm.next_out = 0;
	      strm.avail_out = chunkSize;
	    }
	    status = zlib_deflate.deflate(strm, _mode); /* no bad return value */
	
	    if (status !== Z_STREAM_END && status !== Z_OK) {
	      this.onEnd(status);
	      this.ended = true;
	      return false;
	    }
	    if (strm.avail_out === 0 || strm.avail_in === 0 && _mode === Z_FINISH) {
	      if (this.options.to === "string") {
	        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
	      } else {
	        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
	      }
	    }
	  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);
	
	  // Finalize on the last chunk.
	  if (_mode === Z_FINISH) {
	    status = zlib_deflate.deflateEnd(this.strm);
	    this.onEnd(status);
	    this.ended = true;
	    return status === Z_OK;
	  }
	
	  return true;
	};
	
	/**
	 * Deflate#onData(chunk) -> Void
	 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
	 *   on js engine support. When string output requested, each chunk
	 *   will be string.
	 *
	 * By default, stores data blocks in `chunks[]` property and glue
	 * those in `onEnd`. Override this handler, if you need another behaviour.
	 **/
	Deflate.prototype.onData = function (chunk) {
	  this.chunks.push(chunk);
	};
	
	/**
	 * Deflate#onEnd(status) -> Void
	 * - status (Number): deflate status. 0 (Z_OK) on success,
	 *   other if not.
	 *
	 * Called once after you tell deflate that input stream complete
	 * or error happenned. By default - join collected chunks,
	 * free memory and fill `results` / `err` properties.
	 **/
	Deflate.prototype.onEnd = function (status) {
	  // On success - join
	  if (status === Z_OK) {
	    if (this.options.to === "string") {
	      this.result = this.chunks.join("");
	    } else {
	      this.result = utils.flattenChunks(this.chunks);
	    }
	  }
	  this.chunks = [];
	  this.err = status;
	  this.msg = this.strm.msg;
	};
	
	/**
	 * deflate(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to compress.
	 * - options (Object): zlib deflate options.
	 *
	 * Compress `data` with deflate alrorythm and `options`.
	 *
	 * Supported options are:
	 *
	 * - level
	 * - windowBits
	 * - memLevel
	 * - strategy
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information on these.
	 *
	 * Sugar (options):
	 *
	 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
	 *   negative windowBits implicitly.
	 * - `to` (String) - if equal to 'string', then result will be "binary string"
	 *    (each char code [0..255])
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
	 *
	 * console.log(pako.deflate(data));
	 * ```
	 **/
	function deflate(input, options) {
	  var deflator = new Deflate(options);
	
	  deflator.push(input, true);
	
	  // That will never happens, if you don't cheat with options :)
	  if (deflator.err) {
	    throw deflator.msg;
	  }
	
	  return deflator.result;
	}
	
	/**
	 * deflateRaw(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to compress.
	 * - options (Object): zlib deflate options.
	 *
	 * The same as [[deflate]], but creates raw data, without wrapper
	 * (header and adler32 crc).
	 **/
	function deflateRaw(input, options) {
	  options = options || {};
	  options.raw = true;
	  return deflate(input, options);
	}
	
	/**
	 * gzip(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to compress.
	 * - options (Object): zlib deflate options.
	 *
	 * The same as [[deflate]], but create gzip wrapper instead of
	 * deflate one.
	 **/
	function gzip(input, options) {
	  options = options || {};
	  options.gzip = true;
	  return deflate(input, options);
	}
	
	exports.Deflate = Deflate;
	exports.deflate = deflate;
	exports.deflateRaw = deflateRaw;
	exports.gzip = gzip;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var zlib_inflate = __webpack_require__(41);
	var utils = __webpack_require__(35);
	var strings = __webpack_require__(42);
	var c = __webpack_require__(38);
	var msg = __webpack_require__(43);
	var zstream = __webpack_require__(44);
	var gzheader = __webpack_require__(45);
	
	var toString = Object.prototype.toString;
	
	/**
	 * class Inflate
	 *
	 * Generic JS-style wrapper for zlib calls. If you don't need
	 * streaming behaviour - use more simple functions: [[inflate]]
	 * and [[inflateRaw]].
	 **/
	
	/* internal
	 * inflate.chunks -> Array
	 *
	 * Chunks of output data, if [[Inflate#onData]] not overriden.
	 **/
	
	/**
	 * Inflate.result -> Uint8Array|Array|String
	 *
	 * Uncompressed result, generated by default [[Inflate#onData]]
	 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
	 * (call [[Inflate#push]] with `Z_FINISH` / `true` param).
	 **/
	
	/**
	 * Inflate.err -> Number
	 *
	 * Error code after inflate finished. 0 (Z_OK) on success.
	 * Should be checked if broken data possible.
	 **/
	
	/**
	 * Inflate.msg -> String
	 *
	 * Error message, if [[Inflate.err]] != 0
	 **/
	
	/**
	 * new Inflate(options)
	 * - options (Object): zlib inflate options.
	 *
	 * Creates new inflator instance with specified params. Throws exception
	 * on bad params. Supported options:
	 *
	 * - `windowBits`
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information on these.
	 *
	 * Additional options, for internal needs:
	 *
	 * - `chunkSize` - size of generated data chunks (16K by default)
	 * - `raw` (Boolean) - do raw inflate
	 * - `to` (String) - if equal to 'string', then result will be converted
	 *   from utf8 to utf16 (javascript) string. When string output requested,
	 *   chunk length can differ from `chunkSize`, depending on content.
	 *
	 * By default, when no options set, autodetect deflate/gzip data format via
	 * wrapper header.
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
	 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
	 *
	 * var inflate = new pako.Inflate({ level: 3});
	 *
	 * inflate.push(chunk1, false);
	 * inflate.push(chunk2, true);  // true -> last chunk
	 *
	 * if (inflate.err) { throw new Error(inflate.err); }
	 *
	 * console.log(inflate.result);
	 * ```
	 **/
	var Inflate = function Inflate(options) {
	
	  this.options = utils.assign({
	    chunkSize: 16384,
	    windowBits: 0,
	    to: ""
	  }, options || {});
	
	  var opt = this.options;
	
	  // Force window size for `raw` data, if not set directly,
	  // because we have no header for autodetect.
	  if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
	    opt.windowBits = -opt.windowBits;
	    if (opt.windowBits === 0) {
	      opt.windowBits = -15;
	    }
	  }
	
	  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
	  if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
	    opt.windowBits += 32;
	  }
	
	  // Gzip header has no info about windows size, we can do autodetect only
	  // for deflate. So, if window size not set, force it to max when gzip possible
	  if (opt.windowBits > 15 && opt.windowBits < 48) {
	    // bit 3 (16) -> gzipped data
	    // bit 4 (32) -> autodetect gzip/deflate
	    if ((opt.windowBits & 15) === 0) {
	      opt.windowBits |= 15;
	    }
	  }
	
	  this.err = 0; // error code, if happens (0 = Z_OK)
	  this.msg = ""; // error message
	  this.ended = false; // used to avoid multiple onEnd() calls
	  this.chunks = []; // chunks of compressed data
	
	  this.strm = new zstream();
	  this.strm.avail_out = 0;
	
	  var status = zlib_inflate.inflateInit2(this.strm, opt.windowBits);
	
	  if (status !== c.Z_OK) {
	    throw new Error(msg[status]);
	  }
	
	  this.header = new gzheader();
	
	  zlib_inflate.inflateGetHeader(this.strm, this.header);
	};
	
	/**
	 * Inflate#push(data[, mode]) -> Boolean
	 * - data (Uint8Array|Array|ArrayBuffer|String): input data
	 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
	 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
	 *
	 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
	 * new output chunks. Returns `true` on success. The last data block must have
	 * mode Z_FINISH (or `true`). That flush internal pending buffers and call
	 * [[Inflate#onEnd]].
	 *
	 * On fail call [[Inflate#onEnd]] with error code and return false.
	 *
	 * We strongly recommend to use `Uint8Array` on input for best speed (output
	 * format is detected automatically). Also, don't skip last param and always
	 * use the same type in your code (boolean or number). That will improve JS speed.
	 *
	 * For regular `Array`-s make sure all elements are [0..255].
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * push(chunk, false); // push one of data chunks
	 * ...
	 * push(chunk, true);  // push last chunk
	 * ```
	 **/
	Inflate.prototype.push = function (data, mode) {
	  var strm = this.strm;
	  var chunkSize = this.options.chunkSize;
	  var status, _mode;
	  var next_out_utf8, tail, utf8str;
	
	  if (this.ended) {
	    return false;
	  }
	  _mode = mode === ~ ~mode ? mode : mode === true ? c.Z_FINISH : c.Z_NO_FLUSH;
	
	  // Convert data if needed
	  if (typeof data === "string") {
	    // Only binary strings can be decompressed on practice
	    strm.input = strings.binstring2buf(data);
	  } else if (toString.call(data) === "[object ArrayBuffer]") {
	    strm.input = new Uint8Array(data);
	  } else {
	    strm.input = data;
	  }
	
	  strm.next_in = 0;
	  strm.avail_in = strm.input.length;
	
	  do {
	    if (strm.avail_out === 0) {
	      strm.output = new utils.Buf8(chunkSize);
	      strm.next_out = 0;
	      strm.avail_out = chunkSize;
	    }
	
	    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH); /* no bad return value */
	
	    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
	      this.onEnd(status);
	      this.ended = true;
	      return false;
	    }
	
	    if (strm.next_out) {
	      if (strm.avail_out === 0 || status === c.Z_STREAM_END || strm.avail_in === 0 && _mode === c.Z_FINISH) {
	
	        if (this.options.to === "string") {
	
	          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
	
	          tail = strm.next_out - next_out_utf8;
	          utf8str = strings.buf2string(strm.output, next_out_utf8);
	
	          // move tail
	          strm.next_out = tail;
	          strm.avail_out = chunkSize - tail;
	          if (tail) {
	            utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0);
	          }
	
	          this.onData(utf8str);
	        } else {
	          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
	        }
	      }
	    }
	  } while (strm.avail_in > 0 && status !== c.Z_STREAM_END);
	
	  if (status === c.Z_STREAM_END) {
	    _mode = c.Z_FINISH;
	  }
	  // Finalize on the last chunk.
	  if (_mode === c.Z_FINISH) {
	    status = zlib_inflate.inflateEnd(this.strm);
	    this.onEnd(status);
	    this.ended = true;
	    return status === c.Z_OK;
	  }
	
	  return true;
	};
	
	/**
	 * Inflate#onData(chunk) -> Void
	 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
	 *   on js engine support. When string output requested, each chunk
	 *   will be string.
	 *
	 * By default, stores data blocks in `chunks[]` property and glue
	 * those in `onEnd`. Override this handler, if you need another behaviour.
	 **/
	Inflate.prototype.onData = function (chunk) {
	  this.chunks.push(chunk);
	};
	
	/**
	 * Inflate#onEnd(status) -> Void
	 * - status (Number): inflate status. 0 (Z_OK) on success,
	 *   other if not.
	 *
	 * Called once after you tell inflate that input stream complete
	 * or error happenned. By default - join collected chunks,
	 * free memory and fill `results` / `err` properties.
	 **/
	Inflate.prototype.onEnd = function (status) {
	  // On success - join
	  if (status === c.Z_OK) {
	    if (this.options.to === "string") {
	      // Glue & convert here, until we teach pako to send
	      // utf8 alligned strings to onData
	      this.result = this.chunks.join("");
	    } else {
	      this.result = utils.flattenChunks(this.chunks);
	    }
	  }
	  this.chunks = [];
	  this.err = status;
	  this.msg = this.strm.msg;
	};
	
	/**
	 * inflate(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to decompress.
	 * - options (Object): zlib inflate options.
	 *
	 * Decompress `data` with inflate/ungzip and `options`. Autodetect
	 * format via wrapper header by default. That's why we don't provide
	 * separate `ungzip` method.
	 *
	 * Supported options are:
	 *
	 * - windowBits
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information.
	 *
	 * Sugar (options):
	 *
	 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
	 *   negative windowBits implicitly.
	 * - `to` (String) - if equal to 'string', then result will be converted
	 *   from utf8 to utf16 (javascript) string. When string output requested,
	 *   chunk length can differ from `chunkSize`, depending on content.
	 *
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
	 *   , output;
	 *
	 * try {
	 *   output = pako.inflate(input);
	 * } catch (err)
	 *   console.log(err);
	 * }
	 * ```
	 **/
	function inflate(input, options) {
	  var inflator = new Inflate(options);
	
	  inflator.push(input, true);
	
	  // That will never happens, if you don't cheat with options :)
	  if (inflator.err) {
	    throw inflator.msg;
	  }
	
	  return inflator.result;
	}
	
	/**
	 * inflateRaw(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to decompress.
	 * - options (Object): zlib inflate options.
	 *
	 * The same as [[inflate]], but creates raw data, without wrapper
	 * (header and adler32 crc).
	 **/
	function inflateRaw(input, options) {
	  options = options || {};
	  options.raw = true;
	  return inflate(input, options);
	}
	
	/**
	 * ungzip(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to decompress.
	 * - options (Object): zlib inflate options.
	 *
	 * Just shortcut to [[inflate]], because it autodetects format
	 * by header.content. Done for convenience.
	 **/
	
	exports.Inflate = Inflate;
	exports.inflate = inflate;
	exports.inflateRaw = inflateRaw;
	exports.ungzip = inflate;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = {
	
	  /* Allowed flush values; see deflate() and inflate() below for details */
	  Z_NO_FLUSH: 0,
	  Z_PARTIAL_FLUSH: 1,
	  Z_SYNC_FLUSH: 2,
	  Z_FULL_FLUSH: 3,
	  Z_FINISH: 4,
	  Z_BLOCK: 5,
	  Z_TREES: 6,
	
	  /* Return codes for the compression/decompression functions. Negative values
	  * are errors, positive values are used for special but normal events.
	  */
	  Z_OK: 0,
	  Z_STREAM_END: 1,
	  Z_NEED_DICT: 2,
	  Z_ERRNO: -1,
	  Z_STREAM_ERROR: -2,
	  Z_DATA_ERROR: -3,
	  //Z_MEM_ERROR:     -4,
	  Z_BUF_ERROR: -5,
	  //Z_VERSION_ERROR: -6,
	
	  /* compression levels */
	  Z_NO_COMPRESSION: 0,
	  Z_BEST_SPEED: 1,
	  Z_BEST_COMPRESSION: 9,
	  Z_DEFAULT_COMPRESSION: -1,
	
	  Z_FILTERED: 1,
	  Z_HUFFMAN_ONLY: 2,
	  Z_RLE: 3,
	  Z_FIXED: 4,
	  Z_DEFAULT_STRATEGY: 0,
	
	  /* Possible values of the data_type field (though see inflate()) */
	  Z_BINARY: 0,
	  Z_TEXT: 1,
	  //Z_ASCII:                1, // = Z_TEXT (deprecated)
	  Z_UNKNOWN: 2,
	
	  /* The deflate compression method */
	  Z_DEFLATED: 8
	  //Z_NULL:                 null // Use -1 or null inline, depending on var type
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Base64 = __webpack_require__(47);
	
	module.exports = function (str) {
	  var output = str.replace("-", "+").replace("_", "/");
	  switch (output.length % 4) {
	    case 0:
	      break;
	    case 2:
	      output += "==";
	      break;
	    case 3:
	      output += "=";
	      break;
	    default:
	      throw "Illegal base64url string!";
	  }
	
	  var result = Base64.atob(output);
	
	  try {
	    return decodeURIComponent(escape(result));
	  } catch (err) {
	    return result;
	  }
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (str) {
	  return window.JSON ? window.JSON.parse(str) : eval("(" + str + ")");
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var utils = __webpack_require__(35);
	var adler32 = __webpack_require__(48);
	var crc32 = __webpack_require__(49);
	var inflate_fast = __webpack_require__(50);
	var inflate_table = __webpack_require__(51);
	
	var CODES = 0;
	var LENS = 1;
	var DISTS = 2;
	
	/* Public constants ==========================================================*/
	/* ===========================================================================*/
	
	/* Allowed flush values; see deflate() and inflate() below for details */
	//var Z_NO_FLUSH      = 0;
	//var Z_PARTIAL_FLUSH = 1;
	//var Z_SYNC_FLUSH    = 2;
	//var Z_FULL_FLUSH    = 3;
	var Z_FINISH = 4;
	var Z_BLOCK = 5;
	var Z_TREES = 6;
	
	/* Return codes for the compression/decompression functions. Negative values
	 * are errors, positive values are used for special but normal events.
	 */
	var Z_OK = 0;
	var Z_STREAM_END = 1;
	var Z_NEED_DICT = 2;
	//var Z_ERRNO         = -1;
	var Z_STREAM_ERROR = -2;
	var Z_DATA_ERROR = -3;
	var Z_MEM_ERROR = -4;
	var Z_BUF_ERROR = -5;
	//var Z_VERSION_ERROR = -6;
	
	/* The deflate compression method */
	var Z_DEFLATED = 8;
	
	/* STATES ====================================================================*/
	/* ===========================================================================*/
	
	var HEAD = 1; /* i: waiting for magic header */
	var FLAGS = 2; /* i: waiting for method and flags (gzip) */
	var TIME = 3; /* i: waiting for modification time (gzip) */
	var OS = 4; /* i: waiting for extra flags and operating system (gzip) */
	var EXLEN = 5; /* i: waiting for extra length (gzip) */
	var EXTRA = 6; /* i: waiting for extra bytes (gzip) */
	var NAME = 7; /* i: waiting for end of file name (gzip) */
	var COMMENT = 8; /* i: waiting for end of comment (gzip) */
	var HCRC = 9; /* i: waiting for header crc (gzip) */
	var DICTID = 10; /* i: waiting for dictionary check value */
	var DICT = 11; /* waiting for inflateSetDictionary() call */
	var TYPE = 12; /* i: waiting for type bits, including last-flag bit */
	var TYPEDO = 13; /* i: same, but skip check to exit inflate on new block */
	var STORED = 14; /* i: waiting for stored size (length and complement) */
	var COPY_ = 15; /* i/o: same as COPY below, but only first time in */
	var COPY = 16; /* i/o: waiting for input or output to copy stored block */
	var TABLE = 17; /* i: waiting for dynamic block table lengths */
	var LENLENS = 18; /* i: waiting for code length code lengths */
	var CODELENS = 19; /* i: waiting for length/lit and distance code lengths */
	var LEN_ = 20; /* i: same as LEN below, but only first time in */
	var LEN = 21; /* i: waiting for length/lit/eob code */
	var LENEXT = 22; /* i: waiting for length extra bits */
	var DIST = 23; /* i: waiting for distance code */
	var DISTEXT = 24; /* i: waiting for distance extra bits */
	var MATCH = 25; /* o: waiting for output space to copy string */
	var LIT = 26; /* o: waiting for output space to write literal */
	var CHECK = 27; /* i: waiting for 32-bit check value */
	var LENGTH = 28; /* i: waiting for 32-bit length (gzip) */
	var DONE = 29; /* finished check, done -- remain here until reset */
	var BAD = 30; /* got a data error -- remain here until reset */
	var MEM = 31; /* got an inflate() memory error -- remain here until reset */
	var SYNC = 32; /* looking for synchronization bytes to restart inflate() */
	
	/* ===========================================================================*/
	
	var ENOUGH_LENS = 852;
	var ENOUGH_DISTS = 592;
	//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);
	
	var MAX_WBITS = 15;
	/* 32K LZ77 window */
	var DEF_WBITS = MAX_WBITS;
	
	function ZSWAP32(q) {
	  return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
	}
	
	function InflateState() {
	  this.mode = 0; /* current inflate mode */
	  this.last = false; /* true if processing last block */
	  this.wrap = 0; /* bit 0 true for zlib, bit 1 true for gzip */
	  this.havedict = false; /* true if dictionary provided */
	  this.flags = 0; /* gzip header method and flags (0 if zlib) */
	  this.dmax = 0; /* zlib header max distance (INFLATE_STRICT) */
	  this.check = 0; /* protected copy of check value */
	  this.total = 0; /* protected copy of output count */
	  // TODO: may be {}
	  this.head = null; /* where to save gzip header information */
	
	  /* sliding window */
	  this.wbits = 0; /* log base 2 of requested window size */
	  this.wsize = 0; /* window size or zero if not using window */
	  this.whave = 0; /* valid bytes in the window */
	  this.wnext = 0; /* window write index */
	  this.window = null; /* allocated sliding window, if needed */
	
	  /* bit accumulator */
	  this.hold = 0; /* input bit accumulator */
	  this.bits = 0; /* number of bits in "in" */
	
	  /* for string and stored block copying */
	  this.length = 0; /* literal or length of data to copy */
	  this.offset = 0; /* distance back to copy string from */
	
	  /* for table and code decoding */
	  this.extra = 0; /* extra bits needed */
	
	  /* fixed and dynamic code tables */
	  this.lencode = null; /* starting table for length/literal codes */
	  this.distcode = null; /* starting table for distance codes */
	  this.lenbits = 0; /* index bits for lencode */
	  this.distbits = 0; /* index bits for distcode */
	
	  /* dynamic table building */
	  this.ncode = 0; /* number of code length code lengths */
	  this.nlen = 0; /* number of length code lengths */
	  this.ndist = 0; /* number of distance code lengths */
	  this.have = 0; /* number of code lengths in lens[] */
	  this.next = null; /* next available space in codes[] */
	
	  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
	  this.work = new utils.Buf16(288); /* work area for code table building */
	
	  /*
	   because we don't have pointers in js, we use lencode and distcode directly
	   as buffers so we don't need codes
	  */
	  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
	  this.lendyn = null; /* dynamic table for length/literal codes (JS specific) */
	  this.distdyn = null; /* dynamic table for distance codes (JS specific) */
	  this.sane = 0; /* if false, allow invalid distance too far */
	  this.back = 0; /* bits back of last unprocessed length/lit */
	  this.was = 0; /* initial length of match */
	}
	
	function inflateResetKeep(strm) {
	  var state;
	
	  if (!strm || !strm.state) {
	    return Z_STREAM_ERROR;
	  }
	  state = strm.state;
	  strm.total_in = strm.total_out = state.total = 0;
	  strm.msg = ""; /*Z_NULL*/
	  if (state.wrap) {
	    /* to support ill-conceived Java test suite */
	    strm.adler = state.wrap & 1;
	  }
	  state.mode = HEAD;
	  state.last = 0;
	  state.havedict = 0;
	  state.dmax = 32768;
	  state.head = null /*Z_NULL*/;
	  state.hold = 0;
	  state.bits = 0;
	  //state.lencode = state.distcode = state.next = state.codes;
	  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
	  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);
	
	  state.sane = 1;
	  state.back = -1;
	  //Tracev((stderr, "inflate: reset\n"));
	  return Z_OK;
	}
	
	function inflateReset(strm) {
	  var state;
	
	  if (!strm || !strm.state) {
	    return Z_STREAM_ERROR;
	  }
	  state = strm.state;
	  state.wsize = 0;
	  state.whave = 0;
	  state.wnext = 0;
	  return inflateResetKeep(strm);
	}
	
	function inflateReset2(strm, windowBits) {
	  var wrap;
	  var state;
	
	  /* get the state */
	  if (!strm || !strm.state) {
	    return Z_STREAM_ERROR;
	  }
	  state = strm.state;
	
	  /* extract wrap request from windowBits parameter */
	  if (windowBits < 0) {
	    wrap = 0;
	    windowBits = -windowBits;
	  } else {
	    wrap = (windowBits >> 4) + 1;
	    if (windowBits < 48) {
	      windowBits &= 15;
	    }
	  }
	
	  /* set number of window bits, free window if different */
	  if (windowBits && (windowBits < 8 || windowBits > 15)) {
	    return Z_STREAM_ERROR;
	  }
	  if (state.window !== null && state.wbits !== windowBits) {
	    state.window = null;
	  }
	
	  /* update state and reset the rest of it */
	  state.wrap = wrap;
	  state.wbits = windowBits;
	  return inflateReset(strm);
	}
	
	function inflateInit2(strm, windowBits) {
	  var ret;
	  var state;
	
	  if (!strm) {
	    return Z_STREAM_ERROR;
	  }
	  //strm.msg = Z_NULL;                 /* in case we return an error */
	
	  state = new InflateState();
	
	  //if (state === Z_NULL) return Z_MEM_ERROR;
	  //Tracev((stderr, "inflate: allocated\n"));
	  strm.state = state;
	  state.window = null /*Z_NULL*/;
	  ret = inflateReset2(strm, windowBits);
	  if (ret !== Z_OK) {
	    strm.state = null /*Z_NULL*/;
	  }
	  return ret;
	}
	
	function inflateInit(strm) {
	  return inflateInit2(strm, DEF_WBITS);
	}
	
	/*
	 Return state with length and distance decoding tables and index sizes set to
	 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
	 If BUILDFIXED is defined, then instead this routine builds the tables the
	 first time it's called, and returns those tables the first time and
	 thereafter.  This reduces the size of the code by about 2K bytes, in
	 exchange for a little execution time.  However, BUILDFIXED should not be
	 used for threaded applications, since the rewriting of the tables and virgin
	 may not be thread-safe.
	 */
	var virgin = true;
	
	var lenfix, distfix; // We have no pointers in JS, so keep tables separate
	
	function fixedtables(state) {
	  /* build fixed huffman tables if first call (may not be thread safe) */
	  if (virgin) {
	    var sym;
	
	    lenfix = new utils.Buf32(512);
	    distfix = new utils.Buf32(32);
	
	    /* literal/length table */
	    sym = 0;
	    while (sym < 144) {
	      state.lens[sym++] = 8;
	    }
	    while (sym < 256) {
	      state.lens[sym++] = 9;
	    }
	    while (sym < 280) {
	      state.lens[sym++] = 7;
	    }
	    while (sym < 288) {
	      state.lens[sym++] = 8;
	    }
	
	    inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
	
	    /* distance table */
	    sym = 0;
	    while (sym < 32) {
	      state.lens[sym++] = 5;
	    }
	
	    inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
	
	    /* do this just once */
	    virgin = false;
	  }
	
	  state.lencode = lenfix;
	  state.lenbits = 9;
	  state.distcode = distfix;
	  state.distbits = 5;
	}
	
	/*
	 Update the window with the last wsize (normally 32K) bytes written before
	 returning.  If window does not exist yet, create it.  This is only called
	 when a window is already in use, or when output has been written during this
	 inflate call, but the end of the deflate stream has not been reached yet.
	 It is also called to create a window for dictionary data when a dictionary
	 is loaded.
	
	 Providing output buffers larger than 32K to inflate() should provide a speed
	 advantage, since only the last 32K of output is copied to the sliding window
	 upon return from inflate(), and since all distances after the first 32K of
	 output will fall in the output data, making match copies simpler and faster.
	 The advantage may be dependent on the size of the processor's data caches.
	 */
	function updatewindow(strm, src, end, copy) {
	  var dist;
	  var state = strm.state;
	
	  /* if it hasn't been done already, allocate space for the window */
	  if (state.window === null) {
	    state.wsize = 1 << state.wbits;
	    state.wnext = 0;
	    state.whave = 0;
	
	    state.window = new utils.Buf8(state.wsize);
	  }
	
	  /* copy state->wsize or less output bytes into the circular window */
	  if (copy >= state.wsize) {
	    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
	    state.wnext = 0;
	    state.whave = state.wsize;
	  } else {
	    dist = state.wsize - state.wnext;
	    if (dist > copy) {
	      dist = copy;
	    }
	    //zmemcpy(state->window + state->wnext, end - copy, dist);
	    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
	    copy -= dist;
	    if (copy) {
	      //zmemcpy(state->window, end - copy, copy);
	      utils.arraySet(state.window, src, end - copy, copy, 0);
	      state.wnext = copy;
	      state.whave = state.wsize;
	    } else {
	      state.wnext += dist;
	      if (state.wnext === state.wsize) {
	        state.wnext = 0;
	      }
	      if (state.whave < state.wsize) {
	        state.whave += dist;
	      }
	    }
	  }
	  return 0;
	}
	
	function inflate(strm, flush) {
	  var state;
	  var input, output; // input/output buffers
	  var next; /* next input INDEX */
	  var put; /* next output INDEX */
	  var have, left; /* available input and output */
	  var hold; /* bit buffer */
	  var bits; /* bits in bit buffer */
	  var _in, _out; /* save starting available input and output */
	  var copy; /* number of stored or match bytes to copy */
	  var from; /* where to copy match bytes from */
	  var from_source;
	  var here = 0; /* current decoding table entry */
	  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
	  //var last;                   /* parent table entry */
	  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
	  var len; /* length to copy for repeats, bits to drop */
	  var ret; /* return code */
	  var hbuf = new utils.Buf8(4); /* buffer for gzip header crc calculation */
	  var opts;
	
	  var n; // temporary var for NEED_BITS
	
	  var order = /* permutation of code lengths */
	  [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
	
	  if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
	    return Z_STREAM_ERROR;
	  }
	
	  state = strm.state;
	  if (state.mode === TYPE) {
	    state.mode = TYPEDO;
	  } /* skip check */
	
	  //--- LOAD() ---
	  put = strm.next_out;
	  output = strm.output;
	  left = strm.avail_out;
	  next = strm.next_in;
	  input = strm.input;
	  have = strm.avail_in;
	  hold = state.hold;
	  bits = state.bits;
	  //---
	
	  _in = have;
	  _out = left;
	  ret = Z_OK;
	
	  inf_leave: // goto emulation
	  for (;;) {
	    switch (state.mode) {
	      case HEAD:
	        if (state.wrap === 0) {
	          state.mode = TYPEDO;
	          break;
	        }
	        //=== NEEDBITS(16);
	        while (bits < 16) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if (state.wrap & 2 && hold === 35615) {
	          /* gzip header */
	          state.check = 0 /*crc32(0L, Z_NULL, 0)*/;
	          //=== CRC2(state.check, hold);
	          hbuf[0] = hold & 255;
	          hbuf[1] = hold >>> 8 & 255;
	          state.check = crc32(state.check, hbuf, 2, 0);
	          //===//
	
	          //=== INITBITS();
	          hold = 0;
	          bits = 0;
	          //===//
	          state.mode = FLAGS;
	          break;
	        }
	        state.flags = 0; /* expect zlib header */
	        if (state.head) {
	          state.head.done = false;
	        }
	        if (!(state.wrap & 1) || /* check if zlib header allowed */
	        (((hold & 255) << 8) + (hold >> 8)) % 31) {
	          strm.msg = "incorrect header check";
	          state.mode = BAD;
	          break;
	        }
	        if ((hold & 15) !== Z_DEFLATED) {
	          strm.msg = "unknown compression method";
	          state.mode = BAD;
	          break;
	        }
	        //--- DROPBITS(4) ---//
	        hold >>>= 4;
	        bits -= 4;
	        //---//
	        len = (hold & 15) + 8;
	        if (state.wbits === 0) {
	          state.wbits = len;
	        } else if (len > state.wbits) {
	          strm.msg = "invalid window size";
	          state.mode = BAD;
	          break;
	        }
	        state.dmax = 1 << len;
	        //Tracev((stderr, "inflate:   zlib header ok\n"));
	        strm.adler = state.check = 1 /*adler32(0L, Z_NULL, 0)*/;
	        state.mode = hold & 512 ? DICTID : TYPE;
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        break;
	      case FLAGS:
	        //=== NEEDBITS(16); */
	        while (bits < 16) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.flags = hold;
	        if ((state.flags & 255) !== Z_DEFLATED) {
	          strm.msg = "unknown compression method";
	          state.mode = BAD;
	          break;
	        }
	        if (state.flags & 57344) {
	          strm.msg = "unknown header flags set";
	          state.mode = BAD;
	          break;
	        }
	        if (state.head) {
	          state.head.text = hold >> 8 & 1;
	        }
	        if (state.flags & 512) {
	          //=== CRC2(state.check, hold);
	          hbuf[0] = hold & 255;
	          hbuf[1] = hold >>> 8 & 255;
	          state.check = crc32(state.check, hbuf, 2, 0);
	          //===//
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = TIME;
	      /* falls through */
	      case TIME:
	        //=== NEEDBITS(32); */
	        while (bits < 32) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if (state.head) {
	          state.head.time = hold;
	        }
	        if (state.flags & 512) {
	          //=== CRC4(state.check, hold)
	          hbuf[0] = hold & 255;
	          hbuf[1] = hold >>> 8 & 255;
	          hbuf[2] = hold >>> 16 & 255;
	          hbuf[3] = hold >>> 24 & 255;
	          state.check = crc32(state.check, hbuf, 4, 0);
	          //===
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = OS;
	      /* falls through */
	      case OS:
	        //=== NEEDBITS(16); */
	        while (bits < 16) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if (state.head) {
	          state.head.xflags = hold & 255;
	          state.head.os = hold >> 8;
	        }
	        if (state.flags & 512) {
	          //=== CRC2(state.check, hold);
	          hbuf[0] = hold & 255;
	          hbuf[1] = hold >>> 8 & 255;
	          state.check = crc32(state.check, hbuf, 2, 0);
	          //===//
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = EXLEN;
	      /* falls through */
	      case EXLEN:
	        if (state.flags & 1024) {
	          //=== NEEDBITS(16); */
	          while (bits < 16) {
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          state.length = hold;
	          if (state.head) {
	            state.head.extra_len = hold;
	          }
	          if (state.flags & 512) {
	            //=== CRC2(state.check, hold);
	            hbuf[0] = hold & 255;
	            hbuf[1] = hold >>> 8 & 255;
	            state.check = crc32(state.check, hbuf, 2, 0);
	            //===//
	          }
	          //=== INITBITS();
	          hold = 0;
	          bits = 0;
	          //===//
	        } else if (state.head) {
	          state.head.extra = null /*Z_NULL*/;
	        }
	        state.mode = EXTRA;
	      /* falls through */
	      case EXTRA:
	        if (state.flags & 1024) {
	          copy = state.length;
	          if (copy > have) {
	            copy = have;
	          }
	          if (copy) {
	            if (state.head) {
	              len = state.head.extra_len - state.length;
	              if (!state.head.extra) {
	                // Use untyped array for more conveniend processing later
	                state.head.extra = new Array(state.head.extra_len);
	              }
	              utils.arraySet(state.head.extra, input, next,
	              // extra field is limited to 65536 bytes
	              // - no need for additional size check
	              copy,
	              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
	              len);
	              //zmemcpy(state.head.extra + len, next,
	              //        len + copy > state.head.extra_max ?
	              //        state.head.extra_max - len : copy);
	            }
	            if (state.flags & 512) {
	              state.check = crc32(state.check, input, copy, next);
	            }
	            have -= copy;
	            next += copy;
	            state.length -= copy;
	          }
	          if (state.length) {
	            break inf_leave;
	          }
	        }
	        state.length = 0;
	        state.mode = NAME;
	      /* falls through */
	      case NAME:
	        if (state.flags & 2048) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          copy = 0;
	          do {
	            // TODO: 2 or 1 bytes?
	            len = input[next + copy++];
	            /* use constant limit because in js we should not preallocate memory */
	            if (state.head && len && state.length < 65536 /*state.head.name_max*/) {
	              state.head.name += String.fromCharCode(len);
	            }
	          } while (len && copy < have);
	
	          if (state.flags & 512) {
	            state.check = crc32(state.check, input, copy, next);
	          }
	          have -= copy;
	          next += copy;
	          if (len) {
	            break inf_leave;
	          }
	        } else if (state.head) {
	          state.head.name = null;
	        }
	        state.length = 0;
	        state.mode = COMMENT;
	      /* falls through */
	      case COMMENT:
	        if (state.flags & 4096) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          copy = 0;
	          do {
	            len = input[next + copy++];
	            /* use constant limit because in js we should not preallocate memory */
	            if (state.head && len && state.length < 65536 /*state.head.comm_max*/) {
	              state.head.comment += String.fromCharCode(len);
	            }
	          } while (len && copy < have);
	          if (state.flags & 512) {
	            state.check = crc32(state.check, input, copy, next);
	          }
	          have -= copy;
	          next += copy;
	          if (len) {
	            break inf_leave;
	          }
	        } else if (state.head) {
	          state.head.comment = null;
	        }
	        state.mode = HCRC;
	      /* falls through */
	      case HCRC:
	        if (state.flags & 512) {
	          //=== NEEDBITS(16); */
	          while (bits < 16) {
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          if (hold !== (state.check & 65535)) {
	            strm.msg = "header crc mismatch";
	            state.mode = BAD;
	            break;
	          }
	          //=== INITBITS();
	          hold = 0;
	          bits = 0;
	          //===//
	        }
	        if (state.head) {
	          state.head.hcrc = state.flags >> 9 & 1;
	          state.head.done = true;
	        }
	        strm.adler = state.check = 0 /*crc32(0L, Z_NULL, 0)*/;
	        state.mode = TYPE;
	        break;
	      case DICTID:
	        //=== NEEDBITS(32); */
	        while (bits < 32) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        strm.adler = state.check = ZSWAP32(hold);
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = DICT;
	      /* falls through */
	      case DICT:
	        if (state.havedict === 0) {
	          //--- RESTORE() ---
	          strm.next_out = put;
	          strm.avail_out = left;
	          strm.next_in = next;
	          strm.avail_in = have;
	          state.hold = hold;
	          state.bits = bits;
	          //---
	          return Z_NEED_DICT;
	        }
	        strm.adler = state.check = 1 /*adler32(0L, Z_NULL, 0)*/;
	        state.mode = TYPE;
	      /* falls through */
	      case TYPE:
	        if (flush === Z_BLOCK || flush === Z_TREES) {
	          break inf_leave;
	        }
	      /* falls through */
	      case TYPEDO:
	        if (state.last) {
	          //--- BYTEBITS() ---//
	          hold >>>= bits & 7;
	          bits -= bits & 7;
	          //---//
	          state.mode = CHECK;
	          break;
	        }
	        //=== NEEDBITS(3); */
	        while (bits < 3) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.last = hold & 1;
	        //--- DROPBITS(1) ---//
	        hold >>>= 1;
	        bits -= 1;
	        //---//
	
	        switch (hold & 3) {
	          case 0:
	            /* stored block */
	            //Tracev((stderr, "inflate:     stored block%s\n",
	            //        state.last ? " (last)" : ""));
	            state.mode = STORED;
	            break;
	          case 1:
	            /* fixed block */
	            fixedtables(state);
	            //Tracev((stderr, "inflate:     fixed codes block%s\n",
	            //        state.last ? " (last)" : ""));
	            state.mode = LEN_; /* decode codes */
	            if (flush === Z_TREES) {
	              //--- DROPBITS(2) ---//
	              hold >>>= 2;
	              bits -= 2;
	              //---//
	              break inf_leave;
	            }
	            break;
	          case 2:
	            /* dynamic block */
	            //Tracev((stderr, "inflate:     dynamic codes block%s\n",
	            //        state.last ? " (last)" : ""));
	            state.mode = TABLE;
	            break;
	          case 3:
	            strm.msg = "invalid block type";
	            state.mode = BAD;
	        }
	        //--- DROPBITS(2) ---//
	        hold >>>= 2;
	        bits -= 2;
	        //---//
	        break;
	      case STORED:
	        //--- BYTEBITS() ---// /* go to byte boundary */
	        hold >>>= bits & 7;
	        bits -= bits & 7;
	        //---//
	        //=== NEEDBITS(32); */
	        while (bits < 32) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
	          strm.msg = "invalid stored block lengths";
	          state.mode = BAD;
	          break;
	        }
	        state.length = hold & 65535;
	        //Tracev((stderr, "inflate:       stored length %u\n",
	        //        state.length));
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = COPY_;
	        if (flush === Z_TREES) {
	          break inf_leave;
	        }
	      /* falls through */
	      case COPY_:
	        state.mode = COPY;
	      /* falls through */
	      case COPY:
	        copy = state.length;
	        if (copy) {
	          if (copy > have) {
	            copy = have;
	          }
	          if (copy > left) {
	            copy = left;
	          }
	          if (copy === 0) {
	            break inf_leave;
	          }
	          //--- zmemcpy(put, next, copy); ---
	          utils.arraySet(output, input, next, copy, put);
	          //---//
	          have -= copy;
	          next += copy;
	          left -= copy;
	          put += copy;
	          state.length -= copy;
	          break;
	        }
	        //Tracev((stderr, "inflate:       stored end\n"));
	        state.mode = TYPE;
	        break;
	      case TABLE:
	        //=== NEEDBITS(14); */
	        while (bits < 14) {
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.nlen = (hold & 31) + 257;
	        //--- DROPBITS(5) ---//
	        hold >>>= 5;
	        bits -= 5;
	        //---//
	        state.ndist = (hold & 31) + 1;
	        //--- DROPBITS(5) ---//
	        hold >>>= 5;
	        bits -= 5;
	        //---//
	        state.ncode = (hold & 15) + 4;
	        //--- DROPBITS(4) ---//
	        hold >>>= 4;
	        bits -= 4;
	        //---//
	        //#ifndef PKZIP_BUG_WORKAROUND
	        if (state.nlen > 286 || state.ndist > 30) {
	          strm.msg = "too many length or distance symbols";
	          state.mode = BAD;
	          break;
	        }
	        //#endif
	        //Tracev((stderr, "inflate:       table sizes ok\n"));
	        state.have = 0;
	        state.mode = LENLENS;
	      /* falls through */
	      case LENLENS:
	        while (state.have < state.ncode) {
	          //=== NEEDBITS(3);
	          while (bits < 3) {
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          state.lens[order[state.have++]] = hold & 7; //BITS(3);
	          //--- DROPBITS(3) ---//
	          hold >>>= 3;
	          bits -= 3;
	          //---//
	        }
	        while (state.have < 19) {
	          state.lens[order[state.have++]] = 0;
	        }
	        // We have separate tables & no pointers. 2 commented lines below not needed.
	        //state.next = state.codes;
	        //state.lencode = state.next;
	        // Switch to use dynamic table
	        state.lencode = state.lendyn;
	        state.lenbits = 7;
	
	        opts = { bits: state.lenbits };
	        ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
	        state.lenbits = opts.bits;
	
	        if (ret) {
	          strm.msg = "invalid code lengths set";
	          state.mode = BAD;
	          break;
	        }
	        //Tracev((stderr, "inflate:       code lengths ok\n"));
	        state.have = 0;
	        state.mode = CODELENS;
	      /* falls through */
	      case CODELENS:
	        while (state.have < state.nlen + state.ndist) {
	          for (;;) {
	            here = state.lencode[hold & (1 << state.lenbits) - 1]; /*BITS(state.lenbits)*/
	            here_bits = here >>> 24;
	            here_op = here >>> 16 & 255;
	            here_val = here & 65535;
	
	            if (here_bits <= bits) {
	              break;
	            }
	            //--- PULLBYTE() ---//
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	            //---//
	          }
	          if (here_val < 16) {
	            //--- DROPBITS(here.bits) ---//
	            hold >>>= here_bits;
	            bits -= here_bits;
	            //---//
	            state.lens[state.have++] = here_val;
	          } else {
	            if (here_val === 16) {
	              //=== NEEDBITS(here.bits + 2);
	              n = here_bits + 2;
	              while (bits < n) {
	                if (have === 0) {
	                  break inf_leave;
	                }
	                have--;
	                hold += input[next++] << bits;
	                bits += 8;
	              }
	              //===//
	              //--- DROPBITS(here.bits) ---//
	              hold >>>= here_bits;
	              bits -= here_bits;
	              //---//
	              if (state.have === 0) {
	                strm.msg = "invalid bit length repeat";
	                state.mode = BAD;
	                break;
	              }
	              len = state.lens[state.have - 1];
	              copy = 3 + (hold & 3); //BITS(2);
	              //--- DROPBITS(2) ---//
	              hold >>>= 2;
	              bits -= 2;
	              //---//
	            } else if (here_val === 17) {
	              //=== NEEDBITS(here.bits + 3);
	              n = here_bits + 3;
	              while (bits < n) {
	                if (have === 0) {
	                  break inf_leave;
	                }
	                have--;
	                hold += input[next++] << bits;
	                bits += 8;
	              }
	              //===//
	              //--- DROPBITS(here.bits) ---//
	              hold >>>= here_bits;
	              bits -= here_bits;
	              //---//
	              len = 0;
	              copy = 3 + (hold & 7); //BITS(3);
	              //--- DROPBITS(3) ---//
	              hold >>>= 3;
	              bits -= 3;
	              //---//
	            } else {
	              //=== NEEDBITS(here.bits + 7);
	              n = here_bits + 7;
	              while (bits < n) {
	                if (have === 0) {
	                  break inf_leave;
	                }
	                have--;
	                hold += input[next++] << bits;
	                bits += 8;
	              }
	              //===//
	              //--- DROPBITS(here.bits) ---//
	              hold >>>= here_bits;
	              bits -= here_bits;
	              //---//
	              len = 0;
	              copy = 11 + (hold & 127); //BITS(7);
	              //--- DROPBITS(7) ---//
	              hold >>>= 7;
	              bits -= 7;
	              //---//
	            }
	            if (state.have + copy > state.nlen + state.ndist) {
	              strm.msg = "invalid bit length repeat";
	              state.mode = BAD;
	              break;
	            }
	            while (copy--) {
	              state.lens[state.have++] = len;
	            }
	          }
	        }
	
	        /* handle error breaks in while */
	        if (state.mode === BAD) {
	          break;
	        }
	
	        /* check for end-of-block code (better have one) */
	        if (state.lens[256] === 0) {
	          strm.msg = "invalid code -- missing end-of-block";
	          state.mode = BAD;
	          break;
	        }
	
	        /* build code tables -- note: do not change the lenbits or distbits
	           values here (9 and 6) without reading the comments in inftrees.h
	           concerning the ENOUGH constants, which depend on those values */
	        state.lenbits = 9;
	
	        opts = { bits: state.lenbits };
	        ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
	        // We have separate tables & no pointers. 2 commented lines below not needed.
	        // state.next_index = opts.table_index;
	        state.lenbits = opts.bits;
	        // state.lencode = state.next;
	
	        if (ret) {
	          strm.msg = "invalid literal/lengths set";
	          state.mode = BAD;
	          break;
	        }
	
	        state.distbits = 6;
	        //state.distcode.copy(state.codes);
	        // Switch to use dynamic table
	        state.distcode = state.distdyn;
	        opts = { bits: state.distbits };
	        ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
	        // We have separate tables & no pointers. 2 commented lines below not needed.
	        // state.next_index = opts.table_index;
	        state.distbits = opts.bits;
	        // state.distcode = state.next;
	
	        if (ret) {
	          strm.msg = "invalid distances set";
	          state.mode = BAD;
	          break;
	        }
	        //Tracev((stderr, 'inflate:       codes ok\n'));
	        state.mode = LEN_;
	        if (flush === Z_TREES) {
	          break inf_leave;
	        }
	      /* falls through */
	      case LEN_:
	        state.mode = LEN;
	      /* falls through */
	      case LEN:
	        if (have >= 6 && left >= 258) {
	          //--- RESTORE() ---
	          strm.next_out = put;
	          strm.avail_out = left;
	          strm.next_in = next;
	          strm.avail_in = have;
	          state.hold = hold;
	          state.bits = bits;
	          //---
	          inflate_fast(strm, _out);
	          //--- LOAD() ---
	          put = strm.next_out;
	          output = strm.output;
	          left = strm.avail_out;
	          next = strm.next_in;
	          input = strm.input;
	          have = strm.avail_in;
	          hold = state.hold;
	          bits = state.bits;
	          //---
	
	          if (state.mode === TYPE) {
	            state.back = -1;
	          }
	          break;
	        }
	        state.back = 0;
	        for (;;) {
	          here = state.lencode[hold & (1 << state.lenbits) - 1]; /*BITS(state.lenbits)*/
	          here_bits = here >>> 24;
	          here_op = here >>> 16 & 255;
	          here_val = here & 65535;
	
	          if (here_bits <= bits) {
	            break;
	          }
	          //--- PULLBYTE() ---//
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        if (here_op && (here_op & 240) === 0) {
	          last_bits = here_bits;
	          last_op = here_op;
	          last_val = here_val;
	          for (;;) {
	            here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
	            here_bits = here >>> 24;
	            here_op = here >>> 16 & 255;
	            here_val = here & 65535;
	
	            if (last_bits + here_bits <= bits) {
	              break;
	            }
	            //--- PULLBYTE() ---//
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	            //---//
	          }
	          //--- DROPBITS(last.bits) ---//
	          hold >>>= last_bits;
	          bits -= last_bits;
	          //---//
	          state.back += last_bits;
	        }
	        //--- DROPBITS(here.bits) ---//
	        hold >>>= here_bits;
	        bits -= here_bits;
	        //---//
	        state.back += here_bits;
	        state.length = here_val;
	        if (here_op === 0) {
	          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
	          //        "inflate:         literal '%c'\n" :
	          //        "inflate:         literal 0x%02x\n", here.val));
	          state.mode = LIT;
	          break;
	        }
	        if (here_op & 32) {
	          //Tracevv((stderr, "inflate:         end of block\n"));
	          state.back = -1;
	          state.mode = TYPE;
	          break;
	        }
	        if (here_op & 64) {
	          strm.msg = "invalid literal/length code";
	          state.mode = BAD;
	          break;
	        }
	        state.extra = here_op & 15;
	        state.mode = LENEXT;
	      /* falls through */
	      case LENEXT:
	        if (state.extra) {
	          //=== NEEDBITS(state.extra);
	          n = state.extra;
	          while (bits < n) {
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          state.length += hold & (1 << state.extra) - 1 /*BITS(state.extra)*/;
	          //--- DROPBITS(state.extra) ---//
	          hold >>>= state.extra;
	          bits -= state.extra;
	          //---//
	          state.back += state.extra;
	        }
	        //Tracevv((stderr, "inflate:         length %u\n", state.length));
	        state.was = state.length;
	        state.mode = DIST;
	      /* falls through */
	      case DIST:
	        for (;;) {
	          here = state.distcode[hold & (1 << state.distbits) - 1]; /*BITS(state.distbits)*/
	          here_bits = here >>> 24;
	          here_op = here >>> 16 & 255;
	          here_val = here & 65535;
	
	          if (here_bits <= bits) {
	            break;
	          }
	          //--- PULLBYTE() ---//
	          if (have === 0) {
	            break inf_leave;
	          }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        if ((here_op & 240) === 0) {
	          last_bits = here_bits;
	          last_op = here_op;
	          last_val = here_val;
	          for (;;) {
	            here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
	            here_bits = here >>> 24;
	            here_op = here >>> 16 & 255;
	            here_val = here & 65535;
	
	            if (last_bits + here_bits <= bits) {
	              break;
	            }
	            //--- PULLBYTE() ---//
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	            //---//
	          }
	          //--- DROPBITS(last.bits) ---//
	          hold >>>= last_bits;
	          bits -= last_bits;
	          //---//
	          state.back += last_bits;
	        }
	        //--- DROPBITS(here.bits) ---//
	        hold >>>= here_bits;
	        bits -= here_bits;
	        //---//
	        state.back += here_bits;
	        if (here_op & 64) {
	          strm.msg = "invalid distance code";
	          state.mode = BAD;
	          break;
	        }
	        state.offset = here_val;
	        state.extra = here_op & 15;
	        state.mode = DISTEXT;
	      /* falls through */
	      case DISTEXT:
	        if (state.extra) {
	          //=== NEEDBITS(state.extra);
	          n = state.extra;
	          while (bits < n) {
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          state.offset += hold & (1 << state.extra) - 1 /*BITS(state.extra)*/;
	          //--- DROPBITS(state.extra) ---//
	          hold >>>= state.extra;
	          bits -= state.extra;
	          //---//
	          state.back += state.extra;
	        }
	        //#ifdef INFLATE_STRICT
	        if (state.offset > state.dmax) {
	          strm.msg = "invalid distance too far back";
	          state.mode = BAD;
	          break;
	        }
	        //#endif
	        //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
	        state.mode = MATCH;
	      /* falls through */
	      case MATCH:
	        if (left === 0) {
	          break inf_leave;
	        }
	        copy = _out - left;
	        if (state.offset > copy) {
	          /* copy from window */
	          copy = state.offset - copy;
	          if (copy > state.whave) {
	            if (state.sane) {
	              strm.msg = "invalid distance too far back";
	              state.mode = BAD;
	              break;
	            }
	            // (!) This block is disabled in zlib defailts,
	            // don't enable it for binary compatibility
	            //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
	            //          Trace((stderr, "inflate.c too far\n"));
	            //          copy -= state.whave;
	            //          if (copy > state.length) { copy = state.length; }
	            //          if (copy > left) { copy = left; }
	            //          left -= copy;
	            //          state.length -= copy;
	            //          do {
	            //            output[put++] = 0;
	            //          } while (--copy);
	            //          if (state.length === 0) { state.mode = LEN; }
	            //          break;
	            //#endif
	          }
	          if (copy > state.wnext) {
	            copy -= state.wnext;
	            from = state.wsize - copy;
	          } else {
	            from = state.wnext - copy;
	          }
	          if (copy > state.length) {
	            copy = state.length;
	          }
	          from_source = state.window;
	        } else {
	          /* copy from output */
	          from_source = output;
	          from = put - state.offset;
	          copy = state.length;
	        }
	        if (copy > left) {
	          copy = left;
	        }
	        left -= copy;
	        state.length -= copy;
	        do {
	          output[put++] = from_source[from++];
	        } while (--copy);
	        if (state.length === 0) {
	          state.mode = LEN;
	        }
	        break;
	      case LIT:
	        if (left === 0) {
	          break inf_leave;
	        }
	        output[put++] = state.length;
	        left--;
	        state.mode = LEN;
	        break;
	      case CHECK:
	        if (state.wrap) {
	          //=== NEEDBITS(32);
	          while (bits < 32) {
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            // Use '|' insdead of '+' to make sure that result is signed
	            hold |= input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          _out -= left;
	          strm.total_out += _out;
	          state.total += _out;
	          if (_out) {
	            strm.adler = state.check = state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out);
	          }
	          _out = left;
	          // NB: crc32 stored as signed 32-bit int, ZSWAP32 returns signed too
	          if ((state.flags ? hold : ZSWAP32(hold)) !== state.check) {
	            strm.msg = "incorrect data check";
	            state.mode = BAD;
	            break;
	          }
	          //=== INITBITS();
	          hold = 0;
	          bits = 0;
	          //===//
	          //Tracev((stderr, "inflate:   check matches trailer\n"));
	        }
	        state.mode = LENGTH;
	      /* falls through */
	      case LENGTH:
	        if (state.wrap && state.flags) {
	          //=== NEEDBITS(32);
	          while (bits < 32) {
	            if (have === 0) {
	              break inf_leave;
	            }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          if (hold !== (state.total & 4294967295)) {
	            strm.msg = "incorrect length check";
	            state.mode = BAD;
	            break;
	          }
	          //=== INITBITS();
	          hold = 0;
	          bits = 0;
	          //===//
	          //Tracev((stderr, "inflate:   length matches trailer\n"));
	        }
	        state.mode = DONE;
	      /* falls through */
	      case DONE:
	        ret = Z_STREAM_END;
	        break inf_leave;
	      case BAD:
	        ret = Z_DATA_ERROR;
	        break inf_leave;
	      case MEM:
	        return Z_MEM_ERROR;
	      case SYNC:
	      /* falls through */
	      default:
	        return Z_STREAM_ERROR;
	    }
	  }
	
	  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"
	
	  /*
	     Return from inflate(), updating the total counts and the check value.
	     If there was no progress during the inflate() call, return a buffer
	     error.  Call updatewindow() to create and/or update the window state.
	     Note: a memory error from inflate() is non-recoverable.
	   */
	
	  //--- RESTORE() ---
	  strm.next_out = put;
	  strm.avail_out = left;
	  strm.next_in = next;
	  strm.avail_in = have;
	  state.hold = hold;
	  state.bits = bits;
	  //---
	
	  if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH)) {
	    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
	      state.mode = MEM;
	      return Z_MEM_ERROR;
	    }
	  }
	  _in -= strm.avail_in;
	  _out -= strm.avail_out;
	  strm.total_in += _in;
	  strm.total_out += _out;
	  state.total += _out;
	  if (state.wrap && _out) {
	    strm.adler = state.check = state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out);
	  }
	  strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
	  if ((_in === 0 && _out === 0 || flush === Z_FINISH) && ret === Z_OK) {
	    ret = Z_BUF_ERROR;
	  }
	  return ret;
	}
	
	function inflateEnd(strm) {
	
	  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
	    return Z_STREAM_ERROR;
	  }
	
	  var state = strm.state;
	  if (state.window) {
	    state.window = null;
	  }
	  strm.state = null;
	  return Z_OK;
	}
	
	function inflateGetHeader(strm, head) {
	  var state;
	
	  /* check state */
	  if (!strm || !strm.state) {
	    return Z_STREAM_ERROR;
	  }
	  state = strm.state;
	  if ((state.wrap & 2) === 0) {
	    return Z_STREAM_ERROR;
	  }
	
	  /* save header structure */
	  state.head = head;
	  head.done = false;
	  return Z_OK;
	}
	
	exports.inflateReset = inflateReset;
	exports.inflateReset2 = inflateReset2;
	exports.inflateResetKeep = inflateResetKeep;
	exports.inflateInit = inflateInit;
	exports.inflateInit2 = inflateInit2;
	exports.inflate = inflate;
	exports.inflateEnd = inflateEnd;
	exports.inflateGetHeader = inflateGetHeader;
	exports.inflateInfo = "pako inflate (from Nodeca project)";
	
	/* Not implemented
	exports.inflateCopy = inflateCopy;
	exports.inflateGetDictionary = inflateGetDictionary;
	exports.inflateMark = inflateMark;
	exports.inflatePrime = inflatePrime;
	exports.inflateSetDictionary = inflateSetDictionary;
	exports.inflateSync = inflateSync;
	exports.inflateSyncPoint = inflateSyncPoint;
	exports.inflateUndermine = inflateUndermine;
	*/
	/*BITS(8)*/ /*BITS(4)*/ /*BITS(4)*/ /*BITS(1)*/ /*BITS(2)*/ /*BITS(5)*/ /*BITS(5)*/ /*BITS(4)*/ /*BITS(last.bits + last.op)*/ /*BITS(last.bits + last.op)*/
	/*UPDATE(state.check, put - _out, _out);*/
	/*UPDATE(state.check, strm.next_out - _out, _out);*/

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// String encode/decode helpers
	"use strict";
	
	var utils = __webpack_require__(35);
	
	// Quick check if we can use fast array to bin string conversion
	//
	// - apply(Array) can fail on Android 2.2
	// - apply(Uint8Array) can fail on iOS 5.1 Safary
	//
	var STR_APPLY_OK = true;
	var STR_APPLY_UIA_OK = true;
	
	try {
	  String.fromCharCode.apply(null, [0]);
	} catch (__) {
	  STR_APPLY_OK = false;
	}
	try {
	  String.fromCharCode.apply(null, new Uint8Array(1));
	} catch (__) {
	  STR_APPLY_UIA_OK = false;
	}
	
	// Table with utf8 lengths (calculated by first byte of sequence)
	// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
	// because max possible codepoint is 0x10ffff
	var _utf8len = new utils.Buf8(256);
	for (var i = 0; i < 256; i++) {
	  _utf8len[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
	}
	_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start
	
	// convert string to array (typed, when possible)
	exports.string2buf = function (str) {
	  var buf,
	      c,
	      c2,
	      m_pos,
	      i,
	      str_len = str.length,
	      buf_len = 0;
	
	  // count binary size
	  for (m_pos = 0; m_pos < str_len; m_pos++) {
	    c = str.charCodeAt(m_pos);
	    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
	      c2 = str.charCodeAt(m_pos + 1);
	      if ((c2 & 64512) === 56320) {
	        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
	        m_pos++;
	      }
	    }
	    buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
	  }
	
	  // allocate buffer
	  buf = new utils.Buf8(buf_len);
	
	  // convert
	  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
	    c = str.charCodeAt(m_pos);
	    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
	      c2 = str.charCodeAt(m_pos + 1);
	      if ((c2 & 64512) === 56320) {
	        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
	        m_pos++;
	      }
	    }
	    if (c < 128) {
	      /* one byte */
	      buf[i++] = c;
	    } else if (c < 2048) {
	      /* two bytes */
	      buf[i++] = 192 | c >>> 6;
	      buf[i++] = 128 | c & 63;
	    } else if (c < 65536) {
	      /* three bytes */
	      buf[i++] = 224 | c >>> 12;
	      buf[i++] = 128 | c >>> 6 & 63;
	      buf[i++] = 128 | c & 63;
	    } else {
	      /* four bytes */
	      buf[i++] = 240 | c >>> 18;
	      buf[i++] = 128 | c >>> 12 & 63;
	      buf[i++] = 128 | c >>> 6 & 63;
	      buf[i++] = 128 | c & 63;
	    }
	  }
	
	  return buf;
	};
	
	// Helper (used in 2 places)
	function buf2binstring(buf, len) {
	  // use fallback for big arrays to avoid stack overflow
	  if (len < 65537) {
	    if (buf.subarray && STR_APPLY_UIA_OK || !buf.subarray && STR_APPLY_OK) {
	      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
	    }
	  }
	
	  var result = "";
	  for (var i = 0; i < len; i++) {
	    result += String.fromCharCode(buf[i]);
	  }
	  return result;
	}
	
	// Convert byte array to binary string
	exports.buf2binstring = function (buf) {
	  return buf2binstring(buf, buf.length);
	};
	
	// Convert binary string (typed, when possible)
	exports.binstring2buf = function (str) {
	  var buf = new utils.Buf8(str.length);
	  for (var i = 0, len = buf.length; i < len; i++) {
	    buf[i] = str.charCodeAt(i);
	  }
	  return buf;
	};
	
	// convert array to string
	exports.buf2string = function (buf, max) {
	  var i, out, c, c_len;
	  var len = max || buf.length;
	
	  // Reserve max possible length (2 words per char)
	  // NB: by unknown reasons, Array is significantly faster for
	  //     String.fromCharCode.apply than Uint16Array.
	  var utf16buf = new Array(len * 2);
	
	  for (out = 0, i = 0; i < len;) {
	    c = buf[i++];
	    // quick process ascii
	    if (c < 128) {
	      utf16buf[out++] = c;continue;
	    }
	
	    c_len = _utf8len[c];
	    // skip 5 & 6 byte codes
	    if (c_len > 4) {
	      utf16buf[out++] = 65533;i += c_len - 1;continue;
	    }
	
	    // apply mask on first byte
	    c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
	    // join the rest
	    while (c_len > 1 && i < len) {
	      c = c << 6 | buf[i++] & 63;
	      c_len--;
	    }
	
	    // terminated by end of string?
	    if (c_len > 1) {
	      utf16buf[out++] = 65533;continue;
	    }
	
	    if (c < 65536) {
	      utf16buf[out++] = c;
	    } else {
	      c -= 65536;
	      utf16buf[out++] = 55296 | c >> 10 & 1023;
	      utf16buf[out++] = 56320 | c & 1023;
	    }
	  }
	
	  return buf2binstring(utf16buf, out);
	};
	
	// Calculate max possible position in utf8 buffer,
	// that will not break sequence. If that's not possible
	// - (very small limits) return max size as is.
	//
	// buf[] - utf8 bytes array
	// max   - length limit (mandatory);
	exports.utf8border = function (buf, max) {
	  var pos;
	
	  max = max || buf.length;
	  if (max > buf.length) {
	    max = buf.length;
	  }
	
	  // go back from last position, until start of sequence found
	  pos = max - 1;
	  while (pos >= 0 && (buf[pos] & 192) === 128) {
	    pos--;
	  }
	
	  // Fuckup - very small and broken sequence,
	  // return max, because we should return something anyway.
	  if (pos < 0) {
	    return max;
	  }
	
	  // If we came to start of buffer - that means vuffer is too small,
	  // return max too.
	  if (pos === 0) {
	    return max;
	  }
	
	  return pos + _utf8len[buf[pos]] > max ? pos : max;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = {
	  "2": "need dictionary", /* Z_NEED_DICT       2  */
	  "1": "stream end", /* Z_STREAM_END      1  */
	  "0": "", /* Z_OK              0  */
	  "-1": "file error", /* Z_ERRNO         (-1) */
	  "-2": "stream error", /* Z_STREAM_ERROR  (-2) */
	  "-3": "data error", /* Z_DATA_ERROR    (-3) */
	  "-4": "insufficient memory", /* Z_MEM_ERROR     (-4) */
	  "-5": "buffer error", /* Z_BUF_ERROR     (-5) */
	  "-6": "incompatible version" /* Z_VERSION_ERROR (-6) */
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function ZStream() {
	  /* next input byte */
	  this.input = null; // JS specific, because we have no pointers
	  this.next_in = 0;
	  /* number of bytes available at input */
	  this.avail_in = 0;
	  /* total number of input bytes read so far */
	  this.total_in = 0;
	  /* next output byte should be put there */
	  this.output = null; // JS specific, because we have no pointers
	  this.next_out = 0;
	  /* remaining free space at output */
	  this.avail_out = 0;
	  /* total number of bytes output so far */
	  this.total_out = 0;
	  /* last error message, NULL if no error */
	  this.msg = "" /*Z_NULL*/;
	  /* not visible by applications */
	  this.state = null;
	  /* best guess about the data type: binary or text */
	  this.data_type = 2 /*Z_UNKNOWN*/;
	  /* adler32 value of the uncompressed data */
	  this.adler = 0;
	}
	
	module.exports = ZStream;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function GZheader() {
	  /* true if compressed data believed to be text */
	  this.text = 0;
	  /* modification time */
	  this.time = 0;
	  /* extra flags (not used when writing a gzip file) */
	  this.xflags = 0;
	  /* operating system */
	  this.os = 0;
	  /* pointer to extra field or Z_NULL if none */
	  this.extra = null;
	  /* extra field length (valid if extra != Z_NULL) */
	  this.extra_len = 0; // Actually, we don't need it in JS,
	  // but leave for few code modifications
	
	  //
	  // Setup limits is not necessary because in js we should not preallocate memory
	  // for inflate use constant limit in 65536 bytes
	  //
	
	  /* space at extra (only when reading header) */
	  // this.extra_max  = 0;
	  /* pointer to zero-terminated file name or Z_NULL */
	  this.name = "";
	  /* space at name (only when reading header) */
	  // this.name_max   = 0;
	  /* pointer to zero-terminated comment or Z_NULL */
	  this.comment = "";
	  /* space at comment (only when reading header) */
	  // this.comm_max   = 0;
	  /* true if there was or will be a header crc */
	  this.hcrc = 0;
	  /* true when done reading gzip header (not used when writing a gzip file) */
	  this.done = false;
	}
	
	module.exports = GZheader;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var utils = __webpack_require__(35);
	var trees = __webpack_require__(52);
	var adler32 = __webpack_require__(48);
	var crc32 = __webpack_require__(49);
	var msg = __webpack_require__(43);
	
	/* Public constants ==========================================================*/
	/* ===========================================================================*/
	
	/* Allowed flush values; see deflate() and inflate() below for details */
	var Z_NO_FLUSH = 0;
	var Z_PARTIAL_FLUSH = 1;
	//var Z_SYNC_FLUSH    = 2;
	var Z_FULL_FLUSH = 3;
	var Z_FINISH = 4;
	var Z_BLOCK = 5;
	//var Z_TREES         = 6;
	
	/* Return codes for the compression/decompression functions. Negative values
	 * are errors, positive values are used for special but normal events.
	 */
	var Z_OK = 0;
	var Z_STREAM_END = 1;
	//var Z_NEED_DICT     = 2;
	//var Z_ERRNO         = -1;
	var Z_STREAM_ERROR = -2;
	var Z_DATA_ERROR = -3;
	//var Z_MEM_ERROR     = -4;
	var Z_BUF_ERROR = -5;
	//var Z_VERSION_ERROR = -6;
	
	/* compression levels */
	//var Z_NO_COMPRESSION      = 0;
	//var Z_BEST_SPEED          = 1;
	//var Z_BEST_COMPRESSION    = 9;
	var Z_DEFAULT_COMPRESSION = -1;
	
	var Z_FILTERED = 1;
	var Z_HUFFMAN_ONLY = 2;
	var Z_RLE = 3;
	var Z_FIXED = 4;
	var Z_DEFAULT_STRATEGY = 0;
	
	/* Possible values of the data_type field (though see inflate()) */
	//var Z_BINARY              = 0;
	//var Z_TEXT                = 1;
	//var Z_ASCII               = 1; // = Z_TEXT
	var Z_UNKNOWN = 2;
	
	/* The deflate compression method */
	var Z_DEFLATED = 8;
	
	/*============================================================================*/
	
	var MAX_MEM_LEVEL = 9;
	/* Maximum value for memLevel in deflateInit2 */
	var MAX_WBITS = 15;
	/* 32K LZ77 window */
	var DEF_MEM_LEVEL = 8;
	
	var LENGTH_CODES = 29;
	/* number of length codes, not counting the special END_BLOCK code */
	var LITERALS = 256;
	/* number of literal bytes 0..255 */
	var L_CODES = LITERALS + 1 + LENGTH_CODES;
	/* number of Literal or Length codes, including the END_BLOCK code */
	var D_CODES = 30;
	/* number of distance codes */
	var BL_CODES = 19;
	/* number of codes used to transfer the bit lengths */
	var HEAP_SIZE = 2 * L_CODES + 1;
	/* maximum heap size */
	var MAX_BITS = 15;
	/* All codes must not exceed MAX_BITS bits */
	
	var MIN_MATCH = 3;
	var MAX_MATCH = 258;
	var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
	
	var PRESET_DICT = 32;
	
	var INIT_STATE = 42;
	var EXTRA_STATE = 69;
	var NAME_STATE = 73;
	var COMMENT_STATE = 91;
	var HCRC_STATE = 103;
	var BUSY_STATE = 113;
	var FINISH_STATE = 666;
	
	var BS_NEED_MORE = 1; /* block not completed, need more input or more output */
	var BS_BLOCK_DONE = 2; /* block flush performed */
	var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
	var BS_FINISH_DONE = 4; /* finish done, accept no more input or output */
	
	var OS_CODE = 3; // Unix :) . Don't detect, use this default.
	
	function err(strm, errorCode) {
	  strm.msg = msg[errorCode];
	  return errorCode;
	}
	
	function rank(f) {
	  return (f << 1) - (f > 4 ? 9 : 0);
	}
	
	function zero(buf) {
	  var len = buf.length;while (--len >= 0) {
	    buf[len] = 0;
	  }
	}
	
	/* =========================================================================
	 * Flush as much pending output as possible. All deflate() output goes
	 * through this function so some applications may wish to modify it
	 * to avoid allocating a large strm->output buffer and copying into it.
	 * (See also read_buf()).
	 */
	function flush_pending(strm) {
	  var s = strm.state;
	
	  //_tr_flush_bits(s);
	  var len = s.pending;
	  if (len > strm.avail_out) {
	    len = strm.avail_out;
	  }
	  if (len === 0) {
	    return;
	  }
	
	  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
	  strm.next_out += len;
	  s.pending_out += len;
	  strm.total_out += len;
	  strm.avail_out -= len;
	  s.pending -= len;
	  if (s.pending === 0) {
	    s.pending_out = 0;
	  }
	}
	
	function flush_block_only(s, last) {
	  trees._tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
	  s.block_start = s.strstart;
	  flush_pending(s.strm);
	}
	
	function put_byte(s, b) {
	  s.pending_buf[s.pending++] = b;
	}
	
	/* =========================================================================
	 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
	 * IN assertion: the stream state is correct and there is enough room in
	 * pending_buf.
	 */
	function putShortMSB(s, b) {
	  //  put_byte(s, (Byte)(b >> 8));
	  //  put_byte(s, (Byte)(b & 0xff));
	  s.pending_buf[s.pending++] = b >>> 8 & 255;
	  s.pending_buf[s.pending++] = b & 255;
	}
	
	/* ===========================================================================
	 * Read a new buffer from the current input stream, update the adler32
	 * and total number of bytes read.  All deflate() input goes through
	 * this function so some applications may wish to modify it to avoid
	 * allocating a large strm->input buffer and copying from it.
	 * (See also flush_pending()).
	 */
	function read_buf(strm, buf, start, size) {
	  var len = strm.avail_in;
	
	  if (len > size) {
	    len = size;
	  }
	  if (len === 0) {
	    return 0;
	  }
	
	  strm.avail_in -= len;
	
	  utils.arraySet(buf, strm.input, strm.next_in, len, start);
	  if (strm.state.wrap === 1) {
	    strm.adler = adler32(strm.adler, buf, len, start);
	  } else if (strm.state.wrap === 2) {
	    strm.adler = crc32(strm.adler, buf, len, start);
	  }
	
	  strm.next_in += len;
	  strm.total_in += len;
	
	  return len;
	}
	
	/* ===========================================================================
	 * Set match_start to the longest match starting at the given string and
	 * return its length. Matches shorter or equal to prev_length are discarded,
	 * in which case the result is equal to prev_length and match_start is
	 * garbage.
	 * IN assertions: cur_match is the head of the hash chain for the current
	 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
	 * OUT assertion: the match length is not greater than s->lookahead.
	 */
	function longest_match(s, cur_match) {
	  var chain_length = s.max_chain_length; /* max hash chain length */
	  var scan = s.strstart; /* current string */
	  var match; /* matched string */
	  var len; /* length of current match */
	  var best_len = s.prev_length; /* best match length so far */
	  var nice_match = s.nice_match; /* stop if match long enough */
	  var limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0 /*NIL*/;
	
	  var _win = s.window; // shortcut
	
	  var wmask = s.w_mask;
	  var prev = s.prev;
	
	  /* Stop when cur_match becomes <= limit. To simplify the code,
	   * we prevent matches with the string of window index 0.
	   */
	
	  var strend = s.strstart + MAX_MATCH;
	  var scan_end1 = _win[scan + best_len - 1];
	  var scan_end = _win[scan + best_len];
	
	  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
	   * It is easy to get rid of this optimization if necessary.
	   */
	  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");
	
	  /* Do not waste too much time if we already have a good match: */
	  if (s.prev_length >= s.good_match) {
	    chain_length >>= 2;
	  }
	  /* Do not look for matches beyond the end of the input. This is necessary
	   * to make deflate deterministic.
	   */
	  if (nice_match > s.lookahead) {
	    nice_match = s.lookahead;
	  }
	
	  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");
	
	  do {
	    // Assert(cur_match < s->strstart, "no future");
	    match = cur_match;
	
	    /* Skip to next match if the match length cannot increase
	     * or if the match length is less than 2.  Note that the checks below
	     * for insufficient lookahead only occur occasionally for performance
	     * reasons.  Therefore uninitialized memory will be accessed, and
	     * conditional jumps will be made that depend on those values.
	     * However the length of the match is limited to the lookahead, so
	     * the output of deflate is not affected by the uninitialized values.
	     */
	
	    if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
	      continue;
	    }
	
	    /* The check at best_len-1 can be removed because it will be made
	     * again later. (This heuristic is not always a win.)
	     * It is not necessary to compare scan[2] and match[2] since they
	     * are always equal when the other bytes match, given that
	     * the hash keys are equal and that HASH_BITS >= 8.
	     */
	    scan += 2;
	    match++;
	    // Assert(*scan == *match, "match[2]?");
	
	    /* We check for insufficient lookahead only every 8th comparison;
	     * the 256th check will be made at strstart+258.
	     */
	    do {} while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
	
	    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");
	
	    len = MAX_MATCH - (strend - scan);
	    scan = strend - MAX_MATCH;
	
	    if (len > best_len) {
	      s.match_start = cur_match;
	      best_len = len;
	      if (len >= nice_match) {
	        break;
	      }
	      scan_end1 = _win[scan + best_len - 1];
	      scan_end = _win[scan + best_len];
	    }
	  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
	
	  if (best_len <= s.lookahead) {
	    return best_len;
	  }
	  return s.lookahead;
	}
	
	/* ===========================================================================
	 * Fill the window when the lookahead becomes insufficient.
	 * Updates strstart and lookahead.
	 *
	 * IN assertion: lookahead < MIN_LOOKAHEAD
	 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
	 *    At least one byte has been read, or avail_in == 0; reads are
	 *    performed for at least two bytes (required for the zip translate_eol
	 *    option -- not supported here).
	 */
	function fill_window(s) {
	  var _w_size = s.w_size;
	  var p, n, m, more, str;
	
	  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");
	
	  do {
	    more = s.window_size - s.lookahead - s.strstart;
	
	    // JS ints have 32 bit, block below not needed
	    /* Deal with !@#$% 64K limit: */
	    //if (sizeof(int) <= 2) {
	    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
	    //        more = wsize;
	    //
	    //  } else if (more == (unsigned)(-1)) {
	    //        /* Very unlikely, but possible on 16 bit machine if
	    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
	    //         */
	    //        more--;
	    //    }
	    //}
	
	    /* If the window is almost full and there is insufficient lookahead,
	     * move the upper half to the lower one to make room in the upper half.
	     */
	    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
	
	      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
	      s.match_start -= _w_size;
	      s.strstart -= _w_size;
	      /* we now have strstart >= MAX_DIST */
	      s.block_start -= _w_size;
	
	      /* Slide the hash table (could be avoided with 32 bit values
	       at the expense of memory usage). We slide even when level == 0
	       to keep the hash table consistent if we switch back to level > 0
	       later. (Using level 0 permanently is not an optimal usage of
	       zlib, so we don't care about this pathological case.)
	       */
	
	      n = s.hash_size;
	      p = n;
	      do {
	        m = s.head[--p];
	        s.head[p] = m >= _w_size ? m - _w_size : 0;
	      } while (--n);
	
	      n = _w_size;
	      p = n;
	      do {
	        m = s.prev[--p];
	        s.prev[p] = m >= _w_size ? m - _w_size : 0;
	        /* If n is not on any hash chain, prev[n] is garbage but
	         * its value will never be used.
	         */
	      } while (--n);
	
	      more += _w_size;
	    }
	    if (s.strm.avail_in === 0) {
	      break;
	    }
	
	    /* If there was no sliding:
	     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
	     *    more == window_size - lookahead - strstart
	     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
	     * => more >= window_size - 2*WSIZE + 2
	     * In the BIG_MEM or MMAP case (not yet supported),
	     *   window_size == input_size + MIN_LOOKAHEAD  &&
	     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
	     * Otherwise, window_size == 2*WSIZE so more >= 2.
	     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
	     */
	    //Assert(more >= 2, "more < 2");
	    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
	    s.lookahead += n;
	
	    /* Initialize the hash value now that we have some input: */
	    if (s.lookahead + s.insert >= MIN_MATCH) {
	      str = s.strstart - s.insert;
	      s.ins_h = s.window[str];
	
	      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
	      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 1]) & s.hash_mask;
	      //#if MIN_MATCH != 3
	      //        Call update_hash() MIN_MATCH-3 more times
	      //#endif
	      while (s.insert) {
	        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
	        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
	
	        s.prev[str & s.w_mask] = s.head[s.ins_h];
	        s.head[s.ins_h] = str;
	        str++;
	        s.insert--;
	        if (s.lookahead + s.insert < MIN_MATCH) {
	          break;
	        }
	      }
	    }
	    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
	     * but this is not important since only literal bytes will be emitted.
	     */
	  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
	
	  /* If the WIN_INIT bytes after the end of the current data have never been
	   * written, then zero those bytes in order to avoid memory check reports of
	   * the use of uninitialized (or uninitialised as Julian writes) bytes by
	   * the longest match routines.  Update the high water mark for the next
	   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
	   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
	   */
	  //  if (s.high_water < s.window_size) {
	  //    var curr = s.strstart + s.lookahead;
	  //    var init = 0;
	  //
	  //    if (s.high_water < curr) {
	  //      /* Previous high water mark below current data -- zero WIN_INIT
	  //       * bytes or up to end of window, whichever is less.
	  //       */
	  //      init = s.window_size - curr;
	  //      if (init > WIN_INIT)
	  //        init = WIN_INIT;
	  //      zmemzero(s->window + curr, (unsigned)init);
	  //      s->high_water = curr + init;
	  //    }
	  //    else if (s->high_water < (ulg)curr + WIN_INIT) {
	  //      /* High water mark at or above current data, but below current data
	  //       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
	  //       * to end of window, whichever is less.
	  //       */
	  //      init = (ulg)curr + WIN_INIT - s->high_water;
	  //      if (init > s->window_size - s->high_water)
	  //        init = s->window_size - s->high_water;
	  //      zmemzero(s->window + s->high_water, (unsigned)init);
	  //      s->high_water += init;
	  //    }
	  //  }
	  //
	  //  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
	  //    "not enough room for search");
	}
	
	/* ===========================================================================
	 * Copy without compression as much as possible from the input stream, return
	 * the current block state.
	 * This function does not insert new strings in the dictionary since
	 * uncompressible data is probably not useful. This function is used
	 * only for the level=0 compression option.
	 * NOTE: this function should be optimized to avoid extra copying from
	 * window to pending_buf.
	 */
	function deflate_stored(s, flush) {
	  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
	   * to pending_buf_size, and each stored block has a 5 byte header:
	   */
	  var max_block_size = 65535;
	
	  if (max_block_size > s.pending_buf_size - 5) {
	    max_block_size = s.pending_buf_size - 5;
	  }
	
	  /* Copy as much as possible from input to output: */
	  for (;;) {
	    /* Fill the window as much as possible: */
	    if (s.lookahead <= 1) {
	
	      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
	      //  s->block_start >= (long)s->w_size, "slide too late");
	      //      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
	      //        s.block_start >= s.w_size)) {
	      //        throw  new Error("slide too late");
	      //      }
	
	      fill_window(s);
	      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	
	      if (s.lookahead === 0) {
	        break;
	      }
	      /* flush the current block */
	    }
	    //Assert(s->block_start >= 0L, "block gone");
	    //    if (s.block_start < 0) throw new Error("block gone");
	
	    s.strstart += s.lookahead;
	    s.lookahead = 0;
	
	    /* Emit a stored block if pending_buf will be full: */
	    var max_start = s.block_start + max_block_size;
	
	    if (s.strstart === 0 || s.strstart >= max_start) {
	      /* strstart == 0 is possible when wraparound on 16-bit machine */
	      s.lookahead = s.strstart - max_start;
	      s.strstart = max_start;
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	    /* Flush if we may have to slide, otherwise block_start may become
	     * negative and the data will be gone:
	     */
	    if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	
	  s.insert = 0;
	
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	
	  if (s.strstart > s.block_start) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	
	  return BS_NEED_MORE;
	}
	
	/* ===========================================================================
	 * Compress as much as possible from the input stream, return the current
	 * block state.
	 * This function does not perform lazy evaluation of matches and inserts
	 * new strings in the dictionary only for unmatched strings or for short
	 * matches. It is used only for the fast compression options.
	 */
	function deflate_fast(s, flush) {
	  var hash_head; /* head of the hash chain */
	  var bflush; /* set if current block must be flushed */
	
	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the next match, plus MIN_MATCH bytes to insert the
	     * string following the next match.
	     */
	    if (s.lookahead < MIN_LOOKAHEAD) {
	      fill_window(s);
	      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) {
	        break; /* flush the current block */
	      }
	    }
	
	    /* Insert the string window[strstart .. strstart+2] in the
	     * dictionary, and set hash_head to the head of the hash chain:
	     */
	    hash_head = 0 /*NIL*/;
	    if (s.lookahead >= MIN_MATCH) {
	      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	      s.head[s.ins_h] = s.strstart;
	      /***/
	    }
	
	    /* Find the longest match, discarding those <= prev_length.
	     * At this point we have always match_length < MIN_MATCH
	     */
	    if (hash_head !== 0 /*NIL*/ && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
	      /* To simplify the code, we prevent matches with the string
	       * of window index 0 (in particular we have to avoid a match
	       * of the string with itself at the start of the input file).
	       */
	      s.match_length = longest_match(s, hash_head);
	      /* longest_match() sets match_start */
	    }
	    if (s.match_length >= MIN_MATCH) {
	      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only
	
	      /*** _tr_tally_dist(s, s.strstart - s.match_start,
	                     s.match_length - MIN_MATCH, bflush); ***/
	      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
	
	      s.lookahead -= s.match_length;
	
	      /* Insert new strings in the hash table only if the match length
	       * is not too large. This saves time but degrades compression.
	       */
	      if (s.match_length <= s.max_lazy_match /*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
	        s.match_length--; /* string at strstart already in table */
	        do {
	          s.strstart++;
	          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	          s.head[s.ins_h] = s.strstart;
	          /***/
	          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
	           * always MIN_MATCH bytes ahead.
	           */
	        } while (--s.match_length !== 0);
	        s.strstart++;
	      } else {
	        s.strstart += s.match_length;
	        s.match_length = 0;
	        s.ins_h = s.window[s.strstart];
	        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
	        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 1]) & s.hash_mask;
	
	        //#if MIN_MATCH != 3
	        //                Call UPDATE_HASH() MIN_MATCH-3 more times
	        //#endif
	        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
	         * matter since it will be recomputed at next deflate call.
	         */
	      }
	    } else {
	      /* No match, output a literal byte */
	      //Tracevv((stderr,"%c", s.window[s.strstart]));
	      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
	
	      s.lookahead--;
	      s.strstart++;
	    }
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}
	
	/* ===========================================================================
	 * Same as above, but achieves better compression. We use a lazy
	 * evaluation for matches: a match is finally adopted only if there is
	 * no better match at the next window position.
	 */
	function deflate_slow(s, flush) {
	  var hash_head; /* head of hash chain */
	  var bflush; /* set if current block must be flushed */
	
	  var max_insert;
	
	  /* Process the input block. */
	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the next match, plus MIN_MATCH bytes to insert the
	     * string following the next match.
	     */
	    if (s.lookahead < MIN_LOOKAHEAD) {
	      fill_window(s);
	      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) {
	        break;
	      } /* flush the current block */
	    }
	
	    /* Insert the string window[strstart .. strstart+2] in the
	     * dictionary, and set hash_head to the head of the hash chain:
	     */
	    hash_head = 0 /*NIL*/;
	    if (s.lookahead >= MIN_MATCH) {
	      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	      s.head[s.ins_h] = s.strstart;
	      /***/
	    }
	
	    /* Find the longest match, discarding those <= prev_length.
	     */
	    s.prev_length = s.match_length;
	    s.prev_match = s.match_start;
	    s.match_length = MIN_MATCH - 1;
	
	    if (hash_head !== 0 /*NIL*/ && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD /*MAX_DIST(s)*/) {
	      /* To simplify the code, we prevent matches with the string
	       * of window index 0 (in particular we have to avoid a match
	       * of the string with itself at the start of the input file).
	       */
	      s.match_length = longest_match(s, hash_head);
	      /* longest_match() sets match_start */
	
	      if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096 /*TOO_FAR*/)) {
	
	        /* If prev_match is also MIN_MATCH, match_start is garbage
	         * but we will ignore the current match anyway.
	         */
	        s.match_length = MIN_MATCH - 1;
	      }
	    }
	    /* If there was a match at the previous step and the current
	     * match is not better, output the previous match:
	     */
	    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
	      max_insert = s.strstart + s.lookahead - MIN_MATCH;
	      /* Do not insert strings in hash table beyond this. */
	
	      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);
	
	      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
	                     s.prev_length - MIN_MATCH, bflush);***/
	      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
	      /* Insert in hash table all strings up to the end of the match.
	       * strstart-1 and strstart are already inserted. If there is not
	       * enough lookahead, the last two strings are not inserted in
	       * the hash table.
	       */
	      s.lookahead -= s.prev_length - 1;
	      s.prev_length -= 2;
	      do {
	        if (++s.strstart <= max_insert) {
	          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	          s.head[s.ins_h] = s.strstart;
	          /***/
	        }
	      } while (--s.prev_length !== 0);
	      s.match_available = 0;
	      s.match_length = MIN_MATCH - 1;
	      s.strstart++;
	
	      if (bflush) {
	        /*** FLUSH_BLOCK(s, 0); ***/
	        flush_block_only(s, false);
	        if (s.strm.avail_out === 0) {
	          return BS_NEED_MORE;
	        }
	        /***/
	      }
	    } else if (s.match_available) {
	      /* If there was no match at the previous position, output a
	       * single literal. If there was a match but the current match
	       * is longer, truncate the previous match to a single literal.
	       */
	      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
	      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
	
	      if (bflush) {
	        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
	        flush_block_only(s, false);
	        /***/
	      }
	      s.strstart++;
	      s.lookahead--;
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	    } else {
	      /* There is no previous match to compare with, wait for
	       * the next step to decide.
	       */
	      s.match_available = 1;
	      s.strstart++;
	      s.lookahead--;
	    }
	  }
	  //Assert (flush != Z_NO_FLUSH, "no flush?");
	  if (s.match_available) {
	    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
	    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
	    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
	
	    s.match_available = 0;
	  }
	  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	
	  return BS_BLOCK_DONE;
	}
	
	/* ===========================================================================
	 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
	 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
	 * deflate switches away from Z_RLE.)
	 */
	function deflate_rle(s, flush) {
	  var bflush; /* set if current block must be flushed */
	  var prev; /* byte at distance one to match */
	  var scan, strend; /* scan goes up to strend for length of run */
	
	  var _win = s.window;
	
	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the longest run, plus one for the unrolled loop.
	     */
	    if (s.lookahead <= MAX_MATCH) {
	      fill_window(s);
	      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) {
	        break;
	      } /* flush the current block */
	    }
	
	    /* See how many times the previous byte repeats */
	    s.match_length = 0;
	    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
	      scan = s.strstart - 1;
	      prev = _win[scan];
	      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
	        strend = s.strstart + MAX_MATCH;
	        do {} while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
	        s.match_length = MAX_MATCH - (strend - scan);
	        if (s.match_length > s.lookahead) {
	          s.match_length = s.lookahead;
	        }
	      }
	      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
	    }
	
	    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
	    if (s.match_length >= MIN_MATCH) {
	      //check_match(s, s.strstart, s.strstart - 1, s.match_length);
	
	      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
	      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);
	
	      s.lookahead -= s.match_length;
	      s.strstart += s.match_length;
	      s.match_length = 0;
	    } else {
	      /* No match, output a literal byte */
	      //Tracevv((stderr,"%c", s->window[s->strstart]));
	      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
	
	      s.lookahead--;
	      s.strstart++;
	    }
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = 0;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}
	
	/* ===========================================================================
	 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
	 * (It will be regenerated if this run of deflate switches away from Huffman.)
	 */
	function deflate_huff(s, flush) {
	  var bflush; /* set if current block must be flushed */
	
	  for (;;) {
	    /* Make sure that we have a literal to write. */
	    if (s.lookahead === 0) {
	      fill_window(s);
	      if (s.lookahead === 0) {
	        if (flush === Z_NO_FLUSH) {
	          return BS_NEED_MORE;
	        }
	        break; /* flush the current block */
	      }
	    }
	
	    /* Output a literal byte */
	    s.match_length = 0;
	    //Tracevv((stderr,"%c", s->window[s->strstart]));
	    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
	    s.lookahead--;
	    s.strstart++;
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = 0;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}
	
	/* Values for max_lazy_match, good_match and max_chain_length, depending on
	 * the desired pack level (0..9). The values given below have been tuned to
	 * exclude worst case performance for pathological files. Better values may be
	 * found for specific files.
	 */
	var Config = function Config(good_length, max_lazy, nice_length, max_chain, func) {
	  this.good_length = good_length;
	  this.max_lazy = max_lazy;
	  this.nice_length = nice_length;
	  this.max_chain = max_chain;
	  this.func = func;
	};
	
	var configuration_table;
	
	configuration_table = [
	/*      good lazy nice chain */
	new Config(0, 0, 0, 0, deflate_stored), /* 0 store only */
	new Config(4, 4, 8, 4, deflate_fast), /* 1 max speed, no lazy matches */
	new Config(4, 5, 16, 8, deflate_fast), /* 2 */
	new Config(4, 6, 32, 32, deflate_fast), /* 3 */
	
	new Config(4, 4, 16, 16, deflate_slow), /* 4 lazy matches */
	new Config(8, 16, 32, 32, deflate_slow), /* 5 */
	new Config(8, 16, 128, 128, deflate_slow), /* 6 */
	new Config(8, 32, 128, 256, deflate_slow), /* 7 */
	new Config(32, 128, 258, 1024, deflate_slow), /* 8 */
	new Config(32, 258, 258, 4096, deflate_slow) /* 9 max compression */
	];
	
	/* ===========================================================================
	 * Initialize the "longest match" routines for a new zlib stream
	 */
	function lm_init(s) {
	  s.window_size = 2 * s.w_size;
	
	  /*** CLEAR_HASH(s); ***/
	  zero(s.head); // Fill with NIL (= 0);
	
	  /* Set the default configuration parameters:
	   */
	  s.max_lazy_match = configuration_table[s.level].max_lazy;
	  s.good_match = configuration_table[s.level].good_length;
	  s.nice_match = configuration_table[s.level].nice_length;
	  s.max_chain_length = configuration_table[s.level].max_chain;
	
	  s.strstart = 0;
	  s.block_start = 0;
	  s.lookahead = 0;
	  s.insert = 0;
	  s.match_length = s.prev_length = MIN_MATCH - 1;
	  s.match_available = 0;
	  s.ins_h = 0;
	}
	
	function DeflateState() {
	  this.strm = null; /* pointer back to this zlib stream */
	  this.status = 0; /* as the name implies */
	  this.pending_buf = null; /* output still pending */
	  this.pending_buf_size = 0; /* size of pending_buf */
	  this.pending_out = 0; /* next pending byte to output to the stream */
	  this.pending = 0; /* nb of bytes in the pending buffer */
	  this.wrap = 0; /* bit 0 true for zlib, bit 1 true for gzip */
	  this.gzhead = null; /* gzip header information to write */
	  this.gzindex = 0; /* where in extra, name, or comment */
	  this.method = Z_DEFLATED; /* can only be DEFLATED */
	  this.last_flush = -1; /* value of flush param for previous deflate call */
	
	  this.w_size = 0; /* LZ77 window size (32K by default) */
	  this.w_bits = 0; /* log2(w_size)  (8..16) */
	  this.w_mask = 0; /* w_size - 1 */
	
	  this.window = null;
	  /* Sliding window. Input bytes are read into the second half of the window,
	   * and move to the first half later to keep a dictionary of at least wSize
	   * bytes. With this organization, matches are limited to a distance of
	   * wSize-MAX_MATCH bytes, but this ensures that IO is always
	   * performed with a length multiple of the block size.
	   */
	
	  this.window_size = 0;
	  /* Actual size of window: 2*wSize, except when the user input buffer
	   * is directly used as sliding window.
	   */
	
	  this.prev = null;
	  /* Link to older string with same hash index. To limit the size of this
	   * array to 64K, this link is maintained only for the last 32K strings.
	   * An index in this array is thus a window index modulo 32K.
	   */
	
	  this.head = null; /* Heads of the hash chains or NIL. */
	
	  this.ins_h = 0; /* hash index of string to be inserted */
	  this.hash_size = 0; /* number of elements in hash table */
	  this.hash_bits = 0; /* log2(hash_size) */
	  this.hash_mask = 0; /* hash_size-1 */
	
	  this.hash_shift = 0;
	  /* Number of bits by which ins_h must be shifted at each input
	   * step. It must be such that after MIN_MATCH steps, the oldest
	   * byte no longer takes part in the hash key, that is:
	   *   hash_shift * MIN_MATCH >= hash_bits
	   */
	
	  this.block_start = 0;
	  /* Window position at the beginning of the current output block. Gets
	   * negative when the window is moved backwards.
	   */
	
	  this.match_length = 0; /* length of best match */
	  this.prev_match = 0; /* previous match */
	  this.match_available = 0; /* set if previous match exists */
	  this.strstart = 0; /* start of string to insert */
	  this.match_start = 0; /* start of matching string */
	  this.lookahead = 0; /* number of valid bytes ahead in window */
	
	  this.prev_length = 0;
	  /* Length of the best match at previous step. Matches not greater than this
	   * are discarded. This is used in the lazy match evaluation.
	   */
	
	  this.max_chain_length = 0;
	  /* To speed up deflation, hash chains are never searched beyond this
	   * length.  A higher limit improves compression ratio but degrades the
	   * speed.
	   */
	
	  this.max_lazy_match = 0;
	  /* Attempt to find a better match only when the current match is strictly
	   * smaller than this value. This mechanism is used only for compression
	   * levels >= 4.
	   */
	  // That's alias to max_lazy_match, don't use directly
	  //this.max_insert_length = 0;
	  /* Insert new strings in the hash table only if the match length is not
	   * greater than this length. This saves time but degrades compression.
	   * max_insert_length is used only for compression levels <= 3.
	   */
	
	  this.level = 0; /* compression level (1..9) */
	  this.strategy = 0; /* favor or force Huffman coding*/
	
	  this.good_match = 0;
	  /* Use a faster search when the previous match is longer than this */
	
	  this.nice_match = 0; /* Stop searching when current match exceeds this */
	
	  /* used by trees.c: */
	
	  /* Didn't use ct_data typedef below to suppress compiler warning */
	
	  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
	  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
	  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */
	
	  // Use flat array of DOUBLE size, with interleaved fata,
	  // because JS does not support effective
	  this.dyn_ltree = new utils.Buf16(HEAP_SIZE * 2);
	  this.dyn_dtree = new utils.Buf16((2 * D_CODES + 1) * 2);
	  this.bl_tree = new utils.Buf16((2 * BL_CODES + 1) * 2);
	  zero(this.dyn_ltree);
	  zero(this.dyn_dtree);
	  zero(this.bl_tree);
	
	  this.l_desc = null; /* desc. for literal tree */
	  this.d_desc = null; /* desc. for distance tree */
	  this.bl_desc = null; /* desc. for bit length tree */
	
	  //ush bl_count[MAX_BITS+1];
	  this.bl_count = new utils.Buf16(MAX_BITS + 1);
	  /* number of codes at each bit length for an optimal tree */
	
	  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
	  this.heap = new utils.Buf16(2 * L_CODES + 1); /* heap used to build the Huffman trees */
	  zero(this.heap);
	
	  this.heap_len = 0; /* number of elements in the heap */
	  this.heap_max = 0; /* element of largest frequency */
	  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
	   * The same heap array is used to build all trees.
	   */
	
	  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
	  zero(this.depth);
	  /* Depth of each subtree used as tie breaker for trees of equal frequency
	   */
	
	  this.l_buf = 0; /* buffer index for literals or lengths */
	
	  this.lit_bufsize = 0;
	  /* Size of match buffer for literals/lengths.  There are 4 reasons for
	   * limiting lit_bufsize to 64K:
	   *   - frequencies can be kept in 16 bit counters
	   *   - if compression is not successful for the first block, all input
	   *     data is still in the window so we can still emit a stored block even
	   *     when input comes from standard input.  (This can also be done for
	   *     all blocks if lit_bufsize is not greater than 32K.)
	   *   - if compression is not successful for a file smaller than 64K, we can
	   *     even emit a stored file instead of a stored block (saving 5 bytes).
	   *     This is applicable only for zip (not gzip or zlib).
	   *   - creating new Huffman trees less frequently may not provide fast
	   *     adaptation to changes in the input data statistics. (Take for
	   *     example a binary file with poorly compressible code followed by
	   *     a highly compressible string table.) Smaller buffer sizes give
	   *     fast adaptation but have of course the overhead of transmitting
	   *     trees more frequently.
	   *   - I can't count above 4
	   */
	
	  this.last_lit = 0; /* running index in l_buf */
	
	  this.d_buf = 0;
	  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
	   * the same number of elements. To use different lengths, an extra flag
	   * array would be necessary.
	   */
	
	  this.opt_len = 0; /* bit length of current block with optimal trees */
	  this.static_len = 0; /* bit length of current block with static trees */
	  this.matches = 0; /* number of string matches in current block */
	  this.insert = 0; /* bytes at end of window left to insert */
	
	  this.bi_buf = 0;
	  /* Output buffer. bits are inserted starting at the bottom (least
	   * significant bits).
	   */
	  this.bi_valid = 0;
	  /* Number of valid bits in bi_buf.  All bits above the last valid bit
	   * are always zero.
	   */
	
	  // Used for window memory init. We safely ignore it for JS. That makes
	  // sense only for pointers and memory check tools.
	  //this.high_water = 0;
	  /* High water mark offset in window for initialized bytes -- bytes above
	   * this are set to zero in order to avoid memory check warnings when
	   * longest match routines access bytes past the input.  This is then
	   * updated to the new high water mark.
	   */
	}
	
	function deflateResetKeep(strm) {
	  var s;
	
	  if (!strm || !strm.state) {
	    return err(strm, Z_STREAM_ERROR);
	  }
	
	  strm.total_in = strm.total_out = 0;
	  strm.data_type = Z_UNKNOWN;
	
	  s = strm.state;
	  s.pending = 0;
	  s.pending_out = 0;
	
	  if (s.wrap < 0) {
	    s.wrap = -s.wrap;
	    /* was made negative by deflate(..., Z_FINISH); */
	  }
	  s.status = s.wrap ? INIT_STATE : BUSY_STATE;
	  strm.adler = s.wrap === 2 ? 0 // crc32(0, Z_NULL, 0)
	  : 1; // adler32(0, Z_NULL, 0)
	  s.last_flush = Z_NO_FLUSH;
	  trees._tr_init(s);
	  return Z_OK;
	}
	
	function deflateReset(strm) {
	  var ret = deflateResetKeep(strm);
	  if (ret === Z_OK) {
	    lm_init(strm.state);
	  }
	  return ret;
	}
	
	function deflateSetHeader(strm, head) {
	  if (!strm || !strm.state) {
	    return Z_STREAM_ERROR;
	  }
	  if (strm.state.wrap !== 2) {
	    return Z_STREAM_ERROR;
	  }
	  strm.state.gzhead = head;
	  return Z_OK;
	}
	
	function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
	  if (!strm) {
	    // === Z_NULL
	    return Z_STREAM_ERROR;
	  }
	  var wrap = 1;
	
	  if (level === Z_DEFAULT_COMPRESSION) {
	    level = 6;
	  }
	
	  if (windowBits < 0) {
	    /* suppress zlib wrapper */
	    wrap = 0;
	    windowBits = -windowBits;
	  } else if (windowBits > 15) {
	    wrap = 2; /* write gzip wrapper instead */
	    windowBits -= 16;
	  }
	
	  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED) {
	    return err(strm, Z_STREAM_ERROR);
	  }
	
	  if (windowBits === 8) {
	    windowBits = 9;
	  }
	  /* until 256-byte window bug fixed */
	
	  var s = new DeflateState();
	
	  strm.state = s;
	  s.strm = strm;
	
	  s.wrap = wrap;
	  s.gzhead = null;
	  s.w_bits = windowBits;
	  s.w_size = 1 << s.w_bits;
	  s.w_mask = s.w_size - 1;
	
	  s.hash_bits = memLevel + 7;
	  s.hash_size = 1 << s.hash_bits;
	  s.hash_mask = s.hash_size - 1;
	  s.hash_shift = ~ ~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
	
	  s.window = new utils.Buf8(s.w_size * 2);
	  s.head = new utils.Buf16(s.hash_size);
	  s.prev = new utils.Buf16(s.w_size);
	
	  // Don't need mem init magic for JS.
	  //s.high_water = 0;  /* nothing written to s->window yet */
	
	  s.lit_bufsize = 1 << memLevel + 6; /* 16K elements by default */
	
	  s.pending_buf_size = s.lit_bufsize * 4;
	  s.pending_buf = new utils.Buf8(s.pending_buf_size);
	
	  s.d_buf = s.lit_bufsize >> 1;
	  s.l_buf = (1 + 2) * s.lit_bufsize;
	
	  s.level = level;
	  s.strategy = strategy;
	  s.method = method;
	
	  return deflateReset(strm);
	}
	
	function deflateInit(strm, level) {
	  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
	}
	
	function deflate(strm, flush) {
	  var old_flush, s;
	  var beg, val; // for gzip header write only
	
	  if (!strm || !strm.state || flush > Z_BLOCK || flush < 0) {
	    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
	  }
	
	  s = strm.state;
	
	  if (!strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE && flush !== Z_FINISH) {
	    return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR : Z_STREAM_ERROR);
	  }
	
	  s.strm = strm; /* just in case */
	  old_flush = s.last_flush;
	  s.last_flush = flush;
	
	  /* Write the header */
	  if (s.status === INIT_STATE) {
	
	    if (s.wrap === 2) {
	      // GZIP header
	      strm.adler = 0; //crc32(0L, Z_NULL, 0);
	      put_byte(s, 31);
	      put_byte(s, 139);
	      put_byte(s, 8);
	      if (!s.gzhead) {
	        // s->gzhead == Z_NULL
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
	        put_byte(s, OS_CODE);
	        s.status = BUSY_STATE;
	      } else {
	        put_byte(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16));
	        put_byte(s, s.gzhead.time & 255);
	        put_byte(s, s.gzhead.time >> 8 & 255);
	        put_byte(s, s.gzhead.time >> 16 & 255);
	        put_byte(s, s.gzhead.time >> 24 & 255);
	        put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
	        put_byte(s, s.gzhead.os & 255);
	        if (s.gzhead.extra && s.gzhead.extra.length) {
	          put_byte(s, s.gzhead.extra.length & 255);
	          put_byte(s, s.gzhead.extra.length >> 8 & 255);
	        }
	        if (s.gzhead.hcrc) {
	          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
	        }
	        s.gzindex = 0;
	        s.status = EXTRA_STATE;
	      }
	    } else // DEFLATE header
	      {
	        var header = Z_DEFLATED + (s.w_bits - 8 << 4) << 8;
	        var level_flags = -1;
	
	        if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
	          level_flags = 0;
	        } else if (s.level < 6) {
	          level_flags = 1;
	        } else if (s.level === 6) {
	          level_flags = 2;
	        } else {
	          level_flags = 3;
	        }
	        header |= level_flags << 6;
	        if (s.strstart !== 0) {
	          header |= PRESET_DICT;
	        }
	        header += 31 - header % 31;
	
	        s.status = BUSY_STATE;
	        putShortMSB(s, header);
	
	        /* Save the adler32 of the preset dictionary: */
	        if (s.strstart !== 0) {
	          putShortMSB(s, strm.adler >>> 16);
	          putShortMSB(s, strm.adler & 65535);
	        }
	        strm.adler = 1; // adler32(0L, Z_NULL, 0);
	      }
	  }
	
	  //#ifdef GZIP
	  if (s.status === EXTRA_STATE) {
	    if (s.gzhead.extra /* != Z_NULL*/) {
	      beg = s.pending; /* start of bytes to update crc */
	
	      while (s.gzindex < (s.gzhead.extra.length & 65535)) {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            break;
	          }
	        }
	        put_byte(s, s.gzhead.extra[s.gzindex] & 255);
	        s.gzindex++;
	      }
	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (s.gzindex === s.gzhead.extra.length) {
	        s.gzindex = 0;
	        s.status = NAME_STATE;
	      }
	    } else {
	      s.status = NAME_STATE;
	    }
	  }
	  if (s.status === NAME_STATE) {
	    if (s.gzhead.name /* != Z_NULL*/) {
	      beg = s.pending; /* start of bytes to update crc */
	      //int val;
	
	      do {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            val = 1;
	            break;
	          }
	        }
	        // JS specific: little magic to add zero terminator to end of string
	        if (s.gzindex < s.gzhead.name.length) {
	          val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
	        } else {
	          val = 0;
	        }
	        put_byte(s, val);
	      } while (val !== 0);
	
	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (val === 0) {
	        s.gzindex = 0;
	        s.status = COMMENT_STATE;
	      }
	    } else {
	      s.status = COMMENT_STATE;
	    }
	  }
	  if (s.status === COMMENT_STATE) {
	    if (s.gzhead.comment /* != Z_NULL*/) {
	      beg = s.pending; /* start of bytes to update crc */
	      //int val;
	
	      do {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            val = 1;
	            break;
	          }
	        }
	        // JS specific: little magic to add zero terminator to end of string
	        if (s.gzindex < s.gzhead.comment.length) {
	          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
	        } else {
	          val = 0;
	        }
	        put_byte(s, val);
	      } while (val !== 0);
	
	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (val === 0) {
	        s.status = HCRC_STATE;
	      }
	    } else {
	      s.status = HCRC_STATE;
	    }
	  }
	  if (s.status === HCRC_STATE) {
	    if (s.gzhead.hcrc) {
	      if (s.pending + 2 > s.pending_buf_size) {
	        flush_pending(strm);
	      }
	      if (s.pending + 2 <= s.pending_buf_size) {
	        put_byte(s, strm.adler & 255);
	        put_byte(s, strm.adler >> 8 & 255);
	        strm.adler = 0; //crc32(0L, Z_NULL, 0);
	        s.status = BUSY_STATE;
	      }
	    } else {
	      s.status = BUSY_STATE;
	    }
	  }
	  //#endif
	
	  /* Flush as much pending output as possible */
	  if (s.pending !== 0) {
	    flush_pending(strm);
	    if (strm.avail_out === 0) {
	      /* Since avail_out is 0, deflate will be called again with
	       * more output space, but possibly with both pending and
	       * avail_in equal to zero. There won't be anything to do,
	       * but this is not an error situation so make sure we
	       * return OK instead of BUF_ERROR at next call of deflate:
	       */
	      s.last_flush = -1;
	      return Z_OK;
	    }
	
	    /* Make sure there is something to do and avoid duplicate consecutive
	     * flushes. For repeated and useless calls with Z_FINISH, we keep
	     * returning Z_STREAM_END instead of Z_BUF_ERROR.
	     */
	  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH) {
	    return err(strm, Z_BUF_ERROR);
	  }
	
	  /* User must not provide more input after the first FINISH: */
	  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
	    return err(strm, Z_BUF_ERROR);
	  }
	
	  /* Start a new block or continue the current one.
	   */
	  if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH && s.status !== FINISH_STATE) {
	    var bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
	
	    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
	      s.status = FINISH_STATE;
	    }
	    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
	      if (strm.avail_out === 0) {
	        s.last_flush = -1;
	        /* avoid BUF_ERROR next call, see above */
	      }
	      return Z_OK;
	      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
	       * of deflate should use the same flush parameter to make sure
	       * that the flush is complete. So we don't have to output an
	       * empty block here, this will be done at next call. This also
	       * ensures that for a very small output buffer, we emit at most
	       * one empty block.
	       */
	    }
	    if (bstate === BS_BLOCK_DONE) {
	      if (flush === Z_PARTIAL_FLUSH) {
	        trees._tr_align(s);
	      } else if (flush !== Z_BLOCK) {
	        /* FULL_FLUSH or SYNC_FLUSH */
	
	        trees._tr_stored_block(s, 0, 0, false);
	        /* For a full flush, this empty block will be recognized
	         * as a special marker by inflate_sync().
	         */
	        if (flush === Z_FULL_FLUSH) {
	          /*** CLEAR_HASH(s); ***/ /* forget history */
	          zero(s.head); // Fill with NIL (= 0);
	
	          if (s.lookahead === 0) {
	            s.strstart = 0;
	            s.block_start = 0;
	            s.insert = 0;
	          }
	        }
	      }
	      flush_pending(strm);
	      if (strm.avail_out === 0) {
	        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
	        return Z_OK;
	      }
	    }
	  }
	  //Assert(strm->avail_out > 0, "bug2");
	  //if (strm.avail_out <= 0) { throw new Error("bug2");}
	
	  if (flush !== Z_FINISH) {
	    return Z_OK;
	  }
	  if (s.wrap <= 0) {
	    return Z_STREAM_END;
	  }
	
	  /* Write the trailer */
	  if (s.wrap === 2) {
	    put_byte(s, strm.adler & 255);
	    put_byte(s, strm.adler >> 8 & 255);
	    put_byte(s, strm.adler >> 16 & 255);
	    put_byte(s, strm.adler >> 24 & 255);
	    put_byte(s, strm.total_in & 255);
	    put_byte(s, strm.total_in >> 8 & 255);
	    put_byte(s, strm.total_in >> 16 & 255);
	    put_byte(s, strm.total_in >> 24 & 255);
	  } else {
	    putShortMSB(s, strm.adler >>> 16);
	    putShortMSB(s, strm.adler & 65535);
	  }
	
	  flush_pending(strm);
	  /* If avail_out is zero, the application will call deflate again
	   * to flush the rest.
	   */
	  if (s.wrap > 0) {
	    s.wrap = -s.wrap;
	  }
	  /* write the trailer only once! */
	  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
	}
	
	function deflateEnd(strm) {
	  var status;
	
	  if (!strm /*== Z_NULL*/ || !strm.state /*== Z_NULL*/) {
	    return Z_STREAM_ERROR;
	  }
	
	  status = strm.state.status;
	  if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) {
	    return err(strm, Z_STREAM_ERROR);
	  }
	
	  strm.state = null;
	
	  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
	}
	
	/* =========================================================================
	 * Copy the source state to the destination state
	 */
	//function deflateCopy(dest, source) {
	//
	//}
	
	exports.deflateInit = deflateInit;
	exports.deflateInit2 = deflateInit2;
	exports.deflateReset = deflateReset;
	exports.deflateResetKeep = deflateResetKeep;
	exports.deflateSetHeader = deflateSetHeader;
	exports.deflate = deflate;
	exports.deflateEnd = deflateEnd;
	exports.deflateInfo = "pako deflate (from Nodeca project)";
	
	/* Not implemented
	exports.deflateBound = deflateBound;
	exports.deflateCopy = deflateCopy;
	exports.deflateSetDictionary = deflateSetDictionary;
	exports.deflateParams = deflateParams;
	exports.deflatePending = deflatePending;
	exports.deflatePrime = deflatePrime;
	exports.deflateTune = deflateTune;
	*/

	/*jshint noempty:false*/

	/*jshint noempty:false*/

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	;(function () {
	
	  var object = true ? exports : this,
	      // #8: web workers
	  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	      INVALID_CHARACTER_ERR = (function () {
	    // fabricate a suitable error object
	    try {
	      document.createElement("$");
	    } catch (error) {
	      return error;
	    }
	  })();
	
	  // encoder
	  // [https://gist.github.com/999166] by [https://github.com/nignag]
	  object.btoa || (object.btoa = function (input) {
	    for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars, output = "";
	    // if the next input index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    input.charAt(idx | 0) || (map = "=", idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
	      charCode = input.charCodeAt(idx += 3 / 4);
	      if (charCode > 255) throw INVALID_CHARACTER_ERR;
	      block = block << 8 | charCode;
	    }
	    return output;
	  });
	
	  // decoder
	  // [https://gist.github.com/1020396] by [https://github.com/atk]
	  object.atob || (object.atob = function (input) {
	    input = input.replace(/=+$/, "");
	    if (input.length % 4 == 1) throw INVALID_CHARACTER_ERR;
	    for (
	    // initialize result and counters
	    var bc = 0, bs, buffer, idx = 0, output = "";
	    // get next character
	    buffer = input.charAt(idx++);
	    // character found in table? initialize bit storage and add its ascii value;
	    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
	    // and if not first of each 4 characters,
	    // convert the first 8 bits to one ascii character
	    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
	      // try to find character in table (0-63, not found => -1)
	      buffer = chars.indexOf(buffer);
	    }
	    return output;
	  });
	})();

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// Note: adler32 takes 12% for level 0 and 2% for level 6.
	// It doesn't worth to make additional optimizationa as in original.
	// Small size is preferable.
	
	function adler32(adler, buf, len, pos) {
	  var s1 = adler & 65535 | 0,
	      s2 = adler >>> 16 & 65535 | 0,
	      n = 0;
	
	  while (len !== 0) {
	    // Set limit ~ twice less than 5552, to keep
	    // s2 in 31-bits, because we force signed ints.
	    // in other case %= will fail.
	    n = len > 2000 ? 2000 : len;
	    len -= n;
	
	    do {
	      s1 = s1 + buf[pos++] | 0;
	      s2 = s2 + s1 | 0;
	    } while (--n);
	
	    s1 %= 65521;
	    s2 %= 65521;
	  }
	
	  return s1 | s2 << 16 | 0;
	}
	
	module.exports = adler32;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// Note: we can't get significant speed boost here.
	// So write code to minimize size - no pregenerated tables
	// and array tools dependencies.
	
	// Use ordinary array, since untyped makes no boost here
	function makeTable() {
	  var c,
	      table = [];
	
	  for (var n = 0; n < 256; n++) {
	    c = n;
	    for (var k = 0; k < 8; k++) {
	      c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
	    }
	    table[n] = c;
	  }
	
	  return table;
	}
	
	// Create table on load. Just 255 signed longs. Not a problem.
	var crcTable = makeTable();
	
	function crc32(crc, buf, len, pos) {
	  var t = crcTable,
	      end = pos + len;
	
	  crc = crc ^ -1;
	
	  for (var i = pos; i < end; i++) {
	    crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
	  }
	
	  return crc ^ -1; // >>> 0;
	}
	
	module.exports = crc32;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// See state defs from inflate.js
	var BAD = 30; /* got a data error -- remain here until reset */
	var TYPE = 12; /* i: waiting for type bits, including last-flag bit */
	
	/*
	   Decode literal, length, and distance codes and write out the resulting
	   literal and match bytes until either not enough input or output is
	   available, an end-of-block is encountered, or a data error is encountered.
	   When large enough input and output buffers are supplied to inflate(), for
	   example, a 16K input buffer and a 64K output buffer, more than 95% of the
	   inflate execution time is spent in this routine.
	
	   Entry assumptions:
	
	        state.mode === LEN
	        strm.avail_in >= 6
	        strm.avail_out >= 258
	        start >= strm.avail_out
	        state.bits < 8
	
	   On return, state.mode is one of:
	
	        LEN -- ran out of enough output space or enough available input
	        TYPE -- reached end of block code, inflate() to interpret next block
	        BAD -- error in block data
	
	   Notes:
	
	    - The maximum input bits used by a length/distance pair is 15 bits for the
	      length code, 5 bits for the length extra, 15 bits for the distance code,
	      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
	      Therefore if strm.avail_in >= 6, then there is enough input to avoid
	      checking for available input while decoding.
	
	    - The maximum bytes that a single length/distance pair can output is 258
	      bytes, which is the maximum length that can be coded.  inflate_fast()
	      requires strm.avail_out >= 258 for each loop to avoid checking for
	      output space.
	 */
	module.exports = function inflate_fast(strm, start) {
	  var state;
	  var _in; /* local strm.input */
	  var last; /* have enough input while in < last */
	  var _out; /* local strm.output */
	  var beg; /* inflate()'s initial strm.output */
	  var end; /* while out < end, enough space available */
	  //#ifdef INFLATE_STRICT
	  var dmax; /* maximum distance from zlib header */
	  //#endif
	  var wsize; /* window size or zero if not using window */
	  var whave; /* valid bytes in the window */
	  var wnext; /* window write index */
	  var window; /* allocated sliding window, if wsize != 0 */
	  var hold; /* local strm.hold */
	  var bits; /* local strm.bits */
	  var lcode; /* local strm.lencode */
	  var dcode; /* local strm.distcode */
	  var lmask; /* mask for first level of length codes */
	  var dmask; /* mask for first level of distance codes */
	  var here; /* retrieved table entry */
	  var op; /* code bits, operation, extra bits, or */
	  /*  window position, window bytes to copy */
	  var len; /* match length, unused bytes */
	  var dist; /* match distance */
	  var from; /* where to copy match from */
	  var from_source;
	
	  var input, output; // JS specific, because we have no pointers
	
	  /* copy state to local variables */
	  state = strm.state;
	  //here = state.here;
	  _in = strm.next_in;
	  input = strm.input;
	  last = _in + (strm.avail_in - 5);
	  _out = strm.next_out;
	  output = strm.output;
	  beg = _out - (start - strm.avail_out);
	  end = _out + (strm.avail_out - 257);
	  //#ifdef INFLATE_STRICT
	  dmax = state.dmax;
	  //#endif
	  wsize = state.wsize;
	  whave = state.whave;
	  wnext = state.wnext;
	  window = state.window;
	  hold = state.hold;
	  bits = state.bits;
	  lcode = state.lencode;
	  dcode = state.distcode;
	  lmask = (1 << state.lenbits) - 1;
	  dmask = (1 << state.distbits) - 1;
	
	  /* decode literals and length/distances until end-of-block or not enough
	     input data or output space */
	
	  top: do {
	    if (bits < 15) {
	      hold += input[_in++] << bits;
	      bits += 8;
	      hold += input[_in++] << bits;
	      bits += 8;
	    }
	
	    here = lcode[hold & lmask];
	
	    dolen: for (;;) {
	      // Goto emulation
	      op = here >>> 24 /*here.bits*/;
	      hold >>>= op;
	      bits -= op;
	      op = here >>> 16 & 255 /*here.op*/;
	      if (op === 0) {
	        /* literal */
	        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
	        //        "inflate:         literal '%c'\n" :
	        //        "inflate:         literal 0x%02x\n", here.val));
	        output[_out++] = here & 65535 /*here.val*/;
	      } else if (op & 16) {
	        /* length base */
	        len = here & 65535 /*here.val*/;
	        op &= 15; /* number of extra bits */
	        if (op) {
	          if (bits < op) {
	            hold += input[_in++] << bits;
	            bits += 8;
	          }
	          len += hold & (1 << op) - 1;
	          hold >>>= op;
	          bits -= op;
	        }
	        //Tracevv((stderr, "inflate:         length %u\n", len));
	        if (bits < 15) {
	          hold += input[_in++] << bits;
	          bits += 8;
	          hold += input[_in++] << bits;
	          bits += 8;
	        }
	        here = dcode[hold & dmask];
	
	        dodist: for (;;) {
	          // goto emulation
	          op = here >>> 24 /*here.bits*/;
	          hold >>>= op;
	          bits -= op;
	          op = here >>> 16 & 255 /*here.op*/;
	
	          if (op & 16) {
	            /* distance base */
	            dist = here & 65535 /*here.val*/;
	            op &= 15; /* number of extra bits */
	            if (bits < op) {
	              hold += input[_in++] << bits;
	              bits += 8;
	              if (bits < op) {
	                hold += input[_in++] << bits;
	                bits += 8;
	              }
	            }
	            dist += hold & (1 << op) - 1;
	            //#ifdef INFLATE_STRICT
	            if (dist > dmax) {
	              strm.msg = "invalid distance too far back";
	              state.mode = BAD;
	              break top;
	            }
	            //#endif
	            hold >>>= op;
	            bits -= op;
	            //Tracevv((stderr, "inflate:         distance %u\n", dist));
	            op = _out - beg; /* max distance in output */
	            if (dist > op) {
	              /* see if copy from window */
	              op = dist - op; /* distance back in window */
	              if (op > whave) {
	                if (state.sane) {
	                  strm.msg = "invalid distance too far back";
	                  state.mode = BAD;
	                  break top;
	                }
	
	                // (!) This block is disabled in zlib defailts,
	                // don't enable it for binary compatibility
	                //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
	                //                if (len <= op - whave) {
	                //                  do {
	                //                    output[_out++] = 0;
	                //                  } while (--len);
	                //                  continue top;
	                //                }
	                //                len -= op - whave;
	                //                do {
	                //                  output[_out++] = 0;
	                //                } while (--op > whave);
	                //                if (op === 0) {
	                //                  from = _out - dist;
	                //                  do {
	                //                    output[_out++] = output[from++];
	                //                  } while (--len);
	                //                  continue top;
	                //                }
	                //#endif
	              }
	              from = 0; // window index
	              from_source = window;
	              if (wnext === 0) {
	                /* very common case */
	                from += wsize - op;
	                if (op < len) {
	                  /* some from window */
	                  len -= op;
	                  do {
	                    output[_out++] = window[from++];
	                  } while (--op);
	                  from = _out - dist; /* rest from output */
	                  from_source = output;
	                }
	              } else if (wnext < op) {
	                /* wrap around window */
	                from += wsize + wnext - op;
	                op -= wnext;
	                if (op < len) {
	                  /* some from end of window */
	                  len -= op;
	                  do {
	                    output[_out++] = window[from++];
	                  } while (--op);
	                  from = 0;
	                  if (wnext < len) {
	                    /* some from start of window */
	                    op = wnext;
	                    len -= op;
	                    do {
	                      output[_out++] = window[from++];
	                    } while (--op);
	                    from = _out - dist; /* rest from output */
	                    from_source = output;
	                  }
	                }
	              } else {
	                /* contiguous in window */
	                from += wnext - op;
	                if (op < len) {
	                  /* some from window */
	                  len -= op;
	                  do {
	                    output[_out++] = window[from++];
	                  } while (--op);
	                  from = _out - dist; /* rest from output */
	                  from_source = output;
	                }
	              }
	              while (len > 2) {
	                output[_out++] = from_source[from++];
	                output[_out++] = from_source[from++];
	                output[_out++] = from_source[from++];
	                len -= 3;
	              }
	              if (len) {
	                output[_out++] = from_source[from++];
	                if (len > 1) {
	                  output[_out++] = from_source[from++];
	                }
	              }
	            } else {
	              from = _out - dist; /* copy direct from output */
	              do {
	                /* minimum length is three */
	                output[_out++] = output[from++];
	                output[_out++] = output[from++];
	                output[_out++] = output[from++];
	                len -= 3;
	              } while (len > 2);
	              if (len) {
	                output[_out++] = output[from++];
	                if (len > 1) {
	                  output[_out++] = output[from++];
	                }
	              }
	            }
	          } else if ((op & 64) === 0) {
	            /* 2nd level distance code */
	            here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
	            continue dodist;
	          } else {
	            strm.msg = "invalid distance code";
	            state.mode = BAD;
	            break top;
	          }
	
	          break; // need to emulate goto via "continue"
	        }
	      } else if ((op & 64) === 0) {
	        /* 2nd level length code */
	        here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
	        continue dolen;
	      } else if (op & 32) {
	        /* end-of-block */
	        //Tracevv((stderr, "inflate:         end of block\n"));
	        state.mode = TYPE;
	        break top;
	      } else {
	        strm.msg = "invalid literal/length code";
	        state.mode = BAD;
	        break top;
	      }
	
	      break; // need to emulate goto via "continue"
	    }
	  } while (_in < last && _out < end);
	
	  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
	  len = bits >> 3;
	  _in -= len;
	  bits -= len << 3;
	  hold &= (1 << bits) - 1;
	
	  /* update state and return */
	  strm.next_in = _in;
	  strm.next_out = _out;
	  strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
	  strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
	  state.hold = hold;
	  state.bits = bits;
	  return;
	};
	/*here.val*/ /*here.val*/

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var utils = __webpack_require__(35);
	
	var MAXBITS = 15;
	var ENOUGH_LENS = 852;
	var ENOUGH_DISTS = 592;
	//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);
	
	var CODES = 0;
	var LENS = 1;
	var DISTS = 2;
	
	var lbase = [/* Length codes 257..285 base */
	3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0];
	
	var lext = [/* Length codes 257..285 extra */
	16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78];
	
	var dbase = [/* Distance codes 0..29 base */
	1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0];
	
	var dext = [/* Distance codes 0..29 extra */
	16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
	
	module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
	  var bits = opts.bits;
	  //here = opts.here; /* table entry for duplication */
	
	  var len = 0; /* a code's length in bits */
	  var sym = 0; /* index of code symbols */
	  var min = 0,
	      max = 0; /* minimum and maximum code lengths */
	  var root = 0; /* number of index bits for root table */
	  var curr = 0; /* number of index bits for current table */
	  var drop = 0; /* code bits to drop for sub-table */
	  var left = 0; /* number of prefix codes available */
	  var used = 0; /* code entries in table used */
	  var huff = 0; /* Huffman code */
	  var incr; /* for incrementing code, index */
	  var fill; /* index for replicating entries */
	  var low; /* low bits for current root entry */
	  var mask; /* mask for low root bits */
	  var next; /* next available space in table */
	  var base = null; /* base value table to use */
	  var base_index = 0;
	  //  var shoextra;    /* extra bits table to use */
	  var end; /* use base and extra for symbol > end */
	  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
	  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
	  var extra = null;
	  var extra_index = 0;
	
	  var here_bits, here_op, here_val;
	
	  /*
	   Process a set of code lengths to create a canonical Huffman code.  The
	   code lengths are lens[0..codes-1].  Each length corresponds to the
	   symbols 0..codes-1.  The Huffman code is generated by first sorting the
	   symbols by length from short to long, and retaining the symbol order
	   for codes with equal lengths.  Then the code starts with all zero bits
	   for the first code of the shortest length, and the codes are integer
	   increments for the same length, and zeros are appended as the length
	   increases.  For the deflate format, these bits are stored backwards
	   from their more natural integer increment ordering, and so when the
	   decoding tables are built in the large loop below, the integer codes
	   are incremented backwards.
	    This routine assumes, but does not check, that all of the entries in
	   lens[] are in the range 0..MAXBITS.  The caller must assure this.
	   1..MAXBITS is interpreted as that code length.  zero means that that
	   symbol does not occur in this code.
	    The codes are sorted by computing a count of codes for each length,
	   creating from that a table of starting indices for each length in the
	   sorted table, and then entering the symbols in order in the sorted
	   table.  The sorted table is work[], with that space being provided by
	   the caller.
	    The length counts are used for other purposes as well, i.e. finding
	   the minimum and maximum length codes, determining if there are any
	   codes at all, checking for a valid set of lengths, and looking ahead
	   at length counts to determine sub-table sizes when building the
	   decoding tables.
	   */
	
	  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
	  for (len = 0; len <= MAXBITS; len++) {
	    count[len] = 0;
	  }
	  for (sym = 0; sym < codes; sym++) {
	    count[lens[lens_index + sym]]++;
	  }
	
	  /* bound code lengths, force root to be within code lengths */
	  root = bits;
	  for (max = MAXBITS; max >= 1; max--) {
	    if (count[max] !== 0) {
	      break;
	    }
	  }
	  if (root > max) {
	    root = max;
	  }
	  if (max === 0) {
	    /* no symbols to code at all */
	    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
	    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
	    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
	    table[table_index++] = 1 << 24 | 64 << 16 | 0;
	
	    //table.op[opts.table_index] = 64;
	    //table.bits[opts.table_index] = 1;
	    //table.val[opts.table_index++] = 0;
	    table[table_index++] = 1 << 24 | 64 << 16 | 0;
	
	    opts.bits = 1;
	    return 0; /* no symbols, but wait for decoding to report error */
	  }
	  for (min = 1; min < max; min++) {
	    if (count[min] !== 0) {
	      break;
	    }
	  }
	  if (root < min) {
	    root = min;
	  }
	
	  /* check for an over-subscribed or incomplete set of lengths */
	  left = 1;
	  for (len = 1; len <= MAXBITS; len++) {
	    left <<= 1;
	    left -= count[len];
	    if (left < 0) {
	      return -1;
	    } /* over-subscribed */
	  }
	  if (left > 0 && (type === CODES || max !== 1)) {
	    return -1; /* incomplete set */
	  }
	
	  /* generate offsets into symbol table for each length for sorting */
	  offs[1] = 0;
	  for (len = 1; len < MAXBITS; len++) {
	    offs[len + 1] = offs[len] + count[len];
	  }
	
	  /* sort symbols by length, by symbol order within each length */
	  for (sym = 0; sym < codes; sym++) {
	    if (lens[lens_index + sym] !== 0) {
	      work[offs[lens[lens_index + sym]]++] = sym;
	    }
	  }
	
	  /*
	   Create and fill in decoding tables.  In this loop, the table being
	   filled is at next and has curr index bits.  The code being used is huff
	   with length len.  That code is converted to an index by dropping drop
	   bits off of the bottom.  For codes where len is less than drop + curr,
	   those top drop + curr - len bits are incremented through all values to
	   fill the table with replicated entries.
	    root is the number of index bits for the root table.  When len exceeds
	   root, sub-tables are created pointed to by the root entry with an index
	   of the low root bits of huff.  This is saved in low to check for when a
	   new sub-table should be started.  drop is zero when the root table is
	   being filled, and drop is root when sub-tables are being filled.
	    When a new sub-table is needed, it is necessary to look ahead in the
	   code lengths to determine what size sub-table is needed.  The length
	   counts are used for this, and so count[] is decremented as codes are
	   entered in the tables.
	    used keeps track of how many table entries have been allocated from the
	   provided *table space.  It is checked for LENS and DIST tables against
	   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
	   the initial root table size constants.  See the comments in inftrees.h
	   for more information.
	    sym increments through all symbols, and the loop terminates when
	   all codes of length max, i.e. all codes, have been processed.  This
	   routine permits incomplete codes, so another loop after this one fills
	   in the rest of the decoding tables with invalid code markers.
	   */
	
	  /* set up for code type */
	  // poor man optimization - use if-else instead of switch,
	  // to avoid deopts in old v8
	  if (type === CODES) {
	    base = extra = work; /* dummy value--not used */
	    end = 19;
	  } else if (type === LENS) {
	    base = lbase;
	    base_index -= 257;
	    extra = lext;
	    extra_index -= 257;
	    end = 256;
	  } else {
	    /* DISTS */
	    base = dbase;
	    extra = dext;
	    end = -1;
	  }
	
	  /* initialize opts for loop */
	  huff = 0; /* starting code */
	  sym = 0; /* starting code symbol */
	  len = min; /* starting code length */
	  next = table_index; /* current table to fill in */
	  curr = root; /* current table index bits */
	  drop = 0; /* current bits to drop from code for index */
	  low = -1; /* trigger new sub-table when len > root */
	  used = 1 << root; /* use root table entries */
	  mask = used - 1; /* mask for comparing low */
	
	  /* check available table space */
	  if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
	    return 1;
	  }
	
	  var i = 0;
	  /* process all codes and make table entries */
	  for (;;) {
	    i++;
	    /* create table entry */
	    here_bits = len - drop;
	    if (work[sym] < end) {
	      here_op = 0;
	      here_val = work[sym];
	    } else if (work[sym] > end) {
	      here_op = extra[extra_index + work[sym]];
	      here_val = base[base_index + work[sym]];
	    } else {
	      here_op = 32 + 64; /* end of block */
	      here_val = 0;
	    }
	
	    /* replicate for those indices with low len bits equal to huff */
	    incr = 1 << len - drop;
	    fill = 1 << curr;
	    min = fill; /* save offset to next table */
	    do {
	      fill -= incr;
	      table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
	    } while (fill !== 0);
	
	    /* backwards increment the len-bit code huff */
	    incr = 1 << len - 1;
	    while (huff & incr) {
	      incr >>= 1;
	    }
	    if (incr !== 0) {
	      huff &= incr - 1;
	      huff += incr;
	    } else {
	      huff = 0;
	    }
	
	    /* go to next symbol, update count, len */
	    sym++;
	    if (--count[len] === 0) {
	      if (len === max) {
	        break;
	      }
	      len = lens[lens_index + work[sym]];
	    }
	
	    /* create new sub-table if needed */
	    if (len > root && (huff & mask) !== low) {
	      /* if first time, transition to sub-tables */
	      if (drop === 0) {
	        drop = root;
	      }
	
	      /* increment past last table */
	      next += min; /* here min is 1 << curr */
	
	      /* determine length of next table */
	      curr = len - drop;
	      left = 1 << curr;
	      while (curr + drop < max) {
	        left -= count[curr + drop];
	        if (left <= 0) {
	          break;
	        }
	        curr++;
	        left <<= 1;
	      }
	
	      /* check for enough space */
	      used += 1 << curr;
	      if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
	        return 1;
	      }
	
	      /* point entry in root table to sub-table */
	      low = huff & mask;
	      /*table.op[low] = curr;
	      table.bits[low] = root;
	      table.val[low] = next - opts.table_index;*/
	      table[low] = root << 24 | curr << 16 | next - table_index | 0;
	    }
	  }
	
	  /* fill in remaining table entry if code is incomplete (guaranteed to have
	   at most one remaining entry, since if the code is incomplete, the
	   maximum code length that was allowed to get this far is one bit) */
	  if (huff !== 0) {
	    //table.op[next + huff] = 64;            /* invalid code marker */
	    //table.bits[next + huff] = len - drop;
	    //table.val[next + huff] = 0;
	    table[next + huff] = len - drop << 24 | 64 << 16 | 0;
	  }
	
	  /* set return parameters */
	  //opts.table_index += used;
	  opts.bits = root;
	  return 0;
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var utils = __webpack_require__(35);
	
	/* Public constants ==========================================================*/
	/* ===========================================================================*/
	
	//var Z_FILTERED          = 1;
	//var Z_HUFFMAN_ONLY      = 2;
	//var Z_RLE               = 3;
	var Z_FIXED = 4;
	//var Z_DEFAULT_STRATEGY  = 0;
	
	/* Possible values of the data_type field (though see inflate()) */
	var Z_BINARY = 0;
	var Z_TEXT = 1;
	//var Z_ASCII             = 1; // = Z_TEXT
	var Z_UNKNOWN = 2;
	
	/*============================================================================*/
	
	function zero(buf) {
	  var len = buf.length;while (--len >= 0) {
	    buf[len] = 0;
	  }
	}
	
	// From zutil.h
	
	var STORED_BLOCK = 0;
	var STATIC_TREES = 1;
	var DYN_TREES = 2;
	/* The three kinds of block type */
	
	var MIN_MATCH = 3;
	var MAX_MATCH = 258;
	/* The minimum and maximum match lengths */
	
	// From deflate.h
	/* ===========================================================================
	 * Internal compression state.
	 */
	
	var LENGTH_CODES = 29;
	/* number of length codes, not counting the special END_BLOCK code */
	
	var LITERALS = 256;
	/* number of literal bytes 0..255 */
	
	var L_CODES = LITERALS + 1 + LENGTH_CODES;
	/* number of Literal or Length codes, including the END_BLOCK code */
	
	var D_CODES = 30;
	/* number of distance codes */
	
	var BL_CODES = 19;
	/* number of codes used to transfer the bit lengths */
	
	var HEAP_SIZE = 2 * L_CODES + 1;
	/* maximum heap size */
	
	var MAX_BITS = 15;
	/* All codes must not exceed MAX_BITS bits */
	
	var Buf_size = 16;
	/* size of bit buffer in bi_buf */
	
	/* ===========================================================================
	 * Constants
	 */
	
	var MAX_BL_BITS = 7;
	/* Bit length codes must not exceed MAX_BL_BITS bits */
	
	var END_BLOCK = 256;
	/* end of block literal code */
	
	var REP_3_6 = 16;
	/* repeat previous bit length 3-6 times (2 bits of repeat count) */
	
	var REPZ_3_10 = 17;
	/* repeat a zero length 3-10 times  (3 bits of repeat count) */
	
	var REPZ_11_138 = 18;
	/* repeat a zero length 11-138 times  (7 bits of repeat count) */
	
	var extra_lbits = /* extra bits for each length code */
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
	
	var extra_dbits = /* extra bits for each distance code */
	[0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
	
	var extra_blbits = /* extra bits for each bit length code */
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
	
	var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
	/* The lengths of the bit length codes are sent in order of decreasing
	 * probability, to avoid transmitting the lengths for unused bit length codes.
	 */
	
	/* ===========================================================================
	 * Local data. These are initialized only once.
	 */
	
	// We pre-fill arrays with 0 to avoid uninitialized gaps
	
	var DIST_CODE_LEN = 512; /* see definition of array dist_code below */
	
	// !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
	var static_ltree = new Array((L_CODES + 2) * 2);
	zero(static_ltree);
	/* The static literal tree. Since the bit lengths are imposed, there is no
	 * need for the L_CODES extra codes used during heap construction. However
	 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
	 * below).
	 */
	
	var static_dtree = new Array(D_CODES * 2);
	zero(static_dtree);
	/* The static distance tree. (Actually a trivial tree since all codes use
	 * 5 bits.)
	 */
	
	var _dist_code = new Array(DIST_CODE_LEN);
	zero(_dist_code);
	/* Distance codes. The first 256 values correspond to the distances
	 * 3 .. 258, the last 256 values correspond to the top 8 bits of
	 * the 15 bit distances.
	 */
	
	var _length_code = new Array(MAX_MATCH - MIN_MATCH + 1);
	zero(_length_code);
	/* length code for each normalized match length (0 == MIN_MATCH) */
	
	var base_length = new Array(LENGTH_CODES);
	zero(base_length);
	/* First normalized length for each code (0 = MIN_MATCH) */
	
	var base_dist = new Array(D_CODES);
	zero(base_dist);
	/* First normalized distance for each code (0 = distance of 1) */
	
	var StaticTreeDesc = function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
	
	  this.static_tree = static_tree; /* static tree or NULL */
	  this.extra_bits = extra_bits; /* extra bits for each code or NULL */
	  this.extra_base = extra_base; /* base index for extra_bits */
	  this.elems = elems; /* max number of elements in the tree */
	  this.max_length = max_length; /* max bit length for the codes */
	
	  // show if `static_tree` has data or dummy - needed for monomorphic objects
	  this.has_stree = static_tree && static_tree.length;
	};
	
	var static_l_desc;
	var static_d_desc;
	var static_bl_desc;
	
	var TreeDesc = function TreeDesc(dyn_tree, stat_desc) {
	  this.dyn_tree = dyn_tree; /* the dynamic tree */
	  this.max_code = 0; /* largest code with non zero frequency */
	  this.stat_desc = stat_desc; /* the corresponding static tree */
	};
	
	function d_code(dist) {
	  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
	}
	
	/* ===========================================================================
	 * Output a short LSB first on the stream.
	 * IN assertion: there is enough room in pendingBuf.
	 */
	function put_short(s, w) {
	  //    put_byte(s, (uch)((w) & 0xff));
	  //    put_byte(s, (uch)((ush)(w) >> 8));
	  s.pending_buf[s.pending++] = w & 255;
	  s.pending_buf[s.pending++] = w >>> 8 & 255;
	}
	
	/* ===========================================================================
	 * Send a value on a given number of bits.
	 * IN assertion: length <= 16 and value fits in length bits.
	 */
	function send_bits(s, value, length) {
	  if (s.bi_valid > Buf_size - length) {
	    s.bi_buf |= value << s.bi_valid & 65535;
	    put_short(s, s.bi_buf);
	    s.bi_buf = value >> Buf_size - s.bi_valid;
	    s.bi_valid += length - Buf_size;
	  } else {
	    s.bi_buf |= value << s.bi_valid & 65535;
	    s.bi_valid += length;
	  }
	}
	
	function send_code(s, c, tree) {
	  send_bits(s, tree[c * 2], /*.Code*/tree[c * 2 + 1] /*.Len*/);
	}
	
	/* ===========================================================================
	 * Reverse the first len bits of a code, using straightforward code (a faster
	 * method would use a table)
	 * IN assertion: 1 <= len <= 15
	 */
	function bi_reverse(code, len) {
	  var res = 0;
	  do {
	    res |= code & 1;
	    code >>>= 1;
	    res <<= 1;
	  } while (--len > 0);
	  return res >>> 1;
	}
	
	/* ===========================================================================
	 * Flush the bit buffer, keeping at most 7 bits in it.
	 */
	function bi_flush(s) {
	  if (s.bi_valid === 16) {
	    put_short(s, s.bi_buf);
	    s.bi_buf = 0;
	    s.bi_valid = 0;
	  } else if (s.bi_valid >= 8) {
	    s.pending_buf[s.pending++] = s.bi_buf & 255;
	    s.bi_buf >>= 8;
	    s.bi_valid -= 8;
	  }
	}
	
	/* ===========================================================================
	 * Compute the optimal bit lengths for a tree and update the total bit length
	 * for the current block.
	 * IN assertion: the fields freq and dad are set, heap[heap_max] and
	 *    above are the tree nodes sorted by increasing frequency.
	 * OUT assertions: the field len is set to the optimal bit length, the
	 *     array bl_count contains the frequencies for each bit length.
	 *     The length opt_len is updated; static_len is also updated if stree is
	 *     not null.
	 */
	function gen_bitlen(s, desc)
	//    deflate_state *s;
	//    tree_desc *desc;    /* the tree descriptor */
	{
	  var tree = desc.dyn_tree;
	  var max_code = desc.max_code;
	  var stree = desc.stat_desc.static_tree;
	  var has_stree = desc.stat_desc.has_stree;
	  var extra = desc.stat_desc.extra_bits;
	  var base = desc.stat_desc.extra_base;
	  var max_length = desc.stat_desc.max_length;
	  var h; /* heap index */
	  var n, m; /* iterate over the tree elements */
	  var bits; /* bit length */
	  var xbits; /* extra bits */
	  var f; /* frequency */
	  var overflow = 0; /* number of elements with bit length too large */
	
	  for (bits = 0; bits <= MAX_BITS; bits++) {
	    s.bl_count[bits] = 0;
	  }
	
	  /* In a first pass, compute the optimal bit lengths (which may
	   * overflow in the case of the bit length tree).
	   */
	  tree[s.heap[s.heap_max] * 2 + 1] /*.Len*/ = 0; /* root of the heap */
	
	  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
	    n = s.heap[h];
	    bits = tree[tree[n * 2 + 1] /*.Dad*/ * 2 + 1] /*.Len*/ + 1;
	    if (bits > max_length) {
	      bits = max_length;
	      overflow++;
	    }
	    tree[n * 2 + 1] /*.Len*/ = bits;
	    /* We overwrite tree[n].Dad which is no longer needed */
	
	    if (n > max_code) {
	      continue;
	    } /* not a leaf node */
	
	    s.bl_count[bits]++;
	    xbits = 0;
	    if (n >= base) {
	      xbits = extra[n - base];
	    }
	    f = tree[n * 2] /*.Freq*/;
	    s.opt_len += f * (bits + xbits);
	    if (has_stree) {
	      s.static_len += f * (stree[n * 2 + 1] /*.Len*/ + xbits);
	    }
	  }
	  if (overflow === 0) {
	    return;
	  }
	
	  // Trace((stderr,"\nbit length overflow\n"));
	  /* This happens for example on obj2 and pic of the Calgary corpus */
	
	  /* Find the first bit length which could increase: */
	  do {
	    bits = max_length - 1;
	    while (s.bl_count[bits] === 0) {
	      bits--;
	    }
	    s.bl_count[bits]--; /* move one leaf down the tree */
	    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
	    s.bl_count[max_length]--;
	    /* The brother of the overflow item also moves one step up,
	     * but this does not affect bl_count[max_length]
	     */
	    overflow -= 2;
	  } while (overflow > 0);
	
	  /* Now recompute all bit lengths, scanning in increasing frequency.
	   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
	   * lengths instead of fixing only the wrong ones. This idea is taken
	   * from 'ar' written by Haruhiko Okumura.)
	   */
	  for (bits = max_length; bits !== 0; bits--) {
	    n = s.bl_count[bits];
	    while (n !== 0) {
	      m = s.heap[--h];
	      if (m > max_code) {
	        continue;
	      }
	      if (tree[m * 2 + 1] /*.Len*/ !== bits) {
	        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
	        s.opt_len += (bits - tree[m * 2 + 1] /*.Len*/) * tree[m * 2] /*.Freq*/;
	        tree[m * 2 + 1] /*.Len*/ = bits;
	      }
	      n--;
	    }
	  }
	}
	
	/* ===========================================================================
	 * Generate the codes for a given tree and bit counts (which need not be
	 * optimal).
	 * IN assertion: the array bl_count contains the bit length statistics for
	 * the given tree and the field len is set for all tree elements.
	 * OUT assertion: the field code is set for all tree elements of non
	 *     zero code length.
	 */
	function gen_codes(tree, max_code, bl_count)
	//    ct_data *tree;             /* the tree to decorate */
	//    int max_code;              /* largest code with non zero frequency */
	//    ushf *bl_count;            /* number of codes at each bit length */
	{
	  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
	  var code = 0; /* running code value */
	  var bits; /* bit index */
	  var n; /* code index */
	
	  /* The distribution counts are first used to generate the code values
	   * without bit reversal.
	   */
	  for (bits = 1; bits <= MAX_BITS; bits++) {
	    next_code[bits] = code = code + bl_count[bits - 1] << 1;
	  }
	  /* Check that the bit counts in bl_count are consistent. The last code
	   * must be all ones.
	   */
	  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
	  //        "inconsistent bit counts");
	  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));
	
	  for (n = 0; n <= max_code; n++) {
	    var len = tree[n * 2 + 1] /*.Len*/;
	    if (len === 0) {
	      continue;
	    }
	    /* Now reverse the bits */
	    tree[n * 2] /*.Code*/ = bi_reverse(next_code[len]++, len);
	
	    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
	    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
	  }
	}
	
	/* ===========================================================================
	 * Initialize the various 'constant' tables.
	 */
	function tr_static_init() {
	  var n; /* iterates over tree elements */
	  var bits; /* bit counter */
	  var length; /* length value */
	  var code; /* code value */
	  var dist; /* distance index */
	  var bl_count = new Array(MAX_BITS + 1);
	  /* number of codes at each bit length for an optimal tree */
	
	  // do check in _tr_init()
	  //if (static_init_done) return;
	
	  /* For some embedded targets, global variables are not initialized: */
	  /*#ifdef NO_INIT_GLOBAL_POINTERS
	    static_l_desc.static_tree = static_ltree;
	    static_l_desc.extra_bits = extra_lbits;
	    static_d_desc.static_tree = static_dtree;
	    static_d_desc.extra_bits = extra_dbits;
	    static_bl_desc.extra_bits = extra_blbits;
	  #endif*/
	
	  /* Initialize the mapping length (0..255) -> length code (0..28) */
	  length = 0;
	  for (code = 0; code < LENGTH_CODES - 1; code++) {
	    base_length[code] = length;
	    for (n = 0; n < 1 << extra_lbits[code]; n++) {
	      _length_code[length++] = code;
	    }
	  }
	  //Assert (length == 256, "tr_static_init: length != 256");
	  /* Note that the length 255 (match length 258) can be represented
	   * in two different ways: code 284 + 5 bits or code 285, so we
	   * overwrite length_code[255] to use the best encoding:
	   */
	  _length_code[length - 1] = code;
	
	  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
	  dist = 0;
	  for (code = 0; code < 16; code++) {
	    base_dist[code] = dist;
	    for (n = 0; n < 1 << extra_dbits[code]; n++) {
	      _dist_code[dist++] = code;
	    }
	  }
	  //Assert (dist == 256, "tr_static_init: dist != 256");
	  dist >>= 7; /* from now on, all distances are divided by 128 */
	  for (; code < D_CODES; code++) {
	    base_dist[code] = dist << 7;
	    for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
	      _dist_code[256 + dist++] = code;
	    }
	  }
	  //Assert (dist == 256, "tr_static_init: 256+dist != 512");
	
	  /* Construct the codes of the static literal tree */
	  for (bits = 0; bits <= MAX_BITS; bits++) {
	    bl_count[bits] = 0;
	  }
	
	  n = 0;
	  while (n <= 143) {
	    static_ltree[n * 2 + 1] /*.Len*/ = 8;
	    n++;
	    bl_count[8]++;
	  }
	  while (n <= 255) {
	    static_ltree[n * 2 + 1] /*.Len*/ = 9;
	    n++;
	    bl_count[9]++;
	  }
	  while (n <= 279) {
	    static_ltree[n * 2 + 1] /*.Len*/ = 7;
	    n++;
	    bl_count[7]++;
	  }
	  while (n <= 287) {
	    static_ltree[n * 2 + 1] /*.Len*/ = 8;
	    n++;
	    bl_count[8]++;
	  }
	  /* Codes 286 and 287 do not exist, but we must include them in the
	   * tree construction to get a canonical Huffman tree (longest code
	   * all ones)
	   */
	  gen_codes(static_ltree, L_CODES + 1, bl_count);
	
	  /* The static distance tree is trivial: */
	  for (n = 0; n < D_CODES; n++) {
	    static_dtree[n * 2 + 1] /*.Len*/ = 5;
	    static_dtree[n * 2] /*.Code*/ = bi_reverse(n, 5);
	  }
	
	  // Now data ready and we can init static trees
	  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
	  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS);
	  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS);
	
	  //static_init_done = true;
	}
	
	/* ===========================================================================
	 * Initialize a new block.
	 */
	function init_block(s) {
	  var n; /* iterates over tree elements */
	
	  /* Initialize the trees. */
	  for (n = 0; n < L_CODES; n++) {
	    s.dyn_ltree[n * 2] /*.Freq*/ = 0;
	  }
	  for (n = 0; n < D_CODES; n++) {
	    s.dyn_dtree[n * 2] /*.Freq*/ = 0;
	  }
	  for (n = 0; n < BL_CODES; n++) {
	    s.bl_tree[n * 2] /*.Freq*/ = 0;
	  }
	
	  s.dyn_ltree[END_BLOCK * 2] /*.Freq*/ = 1;
	  s.opt_len = s.static_len = 0;
	  s.last_lit = s.matches = 0;
	}
	
	/* ===========================================================================
	 * Flush the bit buffer and align the output on a byte boundary
	 */
	function bi_windup(s) {
	  if (s.bi_valid > 8) {
	    put_short(s, s.bi_buf);
	  } else if (s.bi_valid > 0) {
	    //put_byte(s, (Byte)s->bi_buf);
	    s.pending_buf[s.pending++] = s.bi_buf;
	  }
	  s.bi_buf = 0;
	  s.bi_valid = 0;
	}
	
	/* ===========================================================================
	 * Copy a stored block, storing first the length and its
	 * one's complement if requested.
	 */
	function copy_block(s, buf, len, header)
	//DeflateState *s;
	//charf    *buf;    /* the input data */
	//unsigned len;     /* its length */
	//int      header;  /* true if block header must be written */
	{
	  bi_windup(s); /* align on byte boundary */
	
	  if (header) {
	    put_short(s, len);
	    put_short(s, ~len);
	  }
	  //  while (len--) {
	  //    put_byte(s, *buf++);
	  //  }
	  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
	  s.pending += len;
	}
	
	/* ===========================================================================
	 * Compares to subtrees, using the tree depth as tie breaker when
	 * the subtrees have equal frequency. This minimizes the worst case length.
	 */
	function smaller(tree, n, m, depth) {
	  var _n2 = n * 2;
	  var _m2 = m * 2;
	  return tree[_n2] /*.Freq*/ < tree[_m2] /*.Freq*/ || tree[_n2] /*.Freq*/ === tree[_m2] /*.Freq*/ && depth[n] <= depth[m];
	}
	
	/* ===========================================================================
	 * Restore the heap property by moving down the tree starting at node k,
	 * exchanging a node with the smallest of its two sons if necessary, stopping
	 * when the heap property is re-established (each father smaller than its
	 * two sons).
	 */
	function pqdownheap(s, tree, k)
	//    deflate_state *s;
	//    ct_data *tree;  /* the tree to restore */
	//    int k;               /* node to move down */
	{
	  var v = s.heap[k];
	  var j = k << 1; /* left son of k */
	  while (j <= s.heap_len) {
	    /* Set j to the smallest of the two sons: */
	    if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
	      j++;
	    }
	    /* Exit if v is smaller than both sons */
	    if (smaller(tree, v, s.heap[j], s.depth)) {
	      break;
	    }
	
	    /* Exchange v with the smallest son */
	    s.heap[k] = s.heap[j];
	    k = j;
	
	    /* And continue down the tree, setting j to the left son of k */
	    j <<= 1;
	  }
	  s.heap[k] = v;
	}
	
	// inlined manually
	// var SMALLEST = 1;
	
	/* ===========================================================================
	 * Send the block data compressed using the given Huffman trees
	 */
	function compress_block(s, ltree, dtree)
	//    deflate_state *s;
	//    const ct_data *ltree; /* literal tree */
	//    const ct_data *dtree; /* distance tree */
	{
	  var dist; /* distance of matched string */
	  var lc; /* match length or unmatched char (if dist == 0) */
	  var lx = 0; /* running index in l_buf */
	  var code; /* the code to send */
	  var extra; /* number of extra bits to send */
	
	  if (s.last_lit !== 0) {
	    do {
	      dist = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
	      lc = s.pending_buf[s.l_buf + lx];
	      lx++;
	
	      if (dist === 0) {
	        send_code(s, lc, ltree); /* send a literal byte */
	        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
	      } else {
	        /* Here, lc is the match length - MIN_MATCH */
	        code = _length_code[lc];
	        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
	        extra = extra_lbits[code];
	        if (extra !== 0) {
	          lc -= base_length[code];
	          send_bits(s, lc, extra); /* send the extra length bits */
	        }
	        dist--; /* dist is now the match distance - 1 */
	        code = d_code(dist);
	        //Assert (code < D_CODES, "bad d_code");
	
	        send_code(s, code, dtree); /* send the distance code */
	        extra = extra_dbits[code];
	        if (extra !== 0) {
	          dist -= base_dist[code];
	          send_bits(s, dist, extra); /* send the extra distance bits */
	        }
	      } /* literal or match pair ? */
	
	      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
	      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
	      //       "pendingBuf overflow");
	    } while (lx < s.last_lit);
	  }
	
	  send_code(s, END_BLOCK, ltree);
	}
	
	/* ===========================================================================
	 * Construct one Huffman tree and assigns the code bit strings and lengths.
	 * Update the total bit length for the current block.
	 * IN assertion: the field freq is set for all tree elements.
	 * OUT assertions: the fields len and code are set to the optimal bit length
	 *     and corresponding code. The length opt_len is updated; static_len is
	 *     also updated if stree is not null. The field max_code is set.
	 */
	function build_tree(s, desc)
	//    deflate_state *s;
	//    tree_desc *desc; /* the tree descriptor */
	{
	  var tree = desc.dyn_tree;
	  var stree = desc.stat_desc.static_tree;
	  var has_stree = desc.stat_desc.has_stree;
	  var elems = desc.stat_desc.elems;
	  var n, m; /* iterate over heap elements */
	  var max_code = -1; /* largest code with non zero frequency */
	  var node; /* new node being created */
	
	  /* Construct the initial heap, with least frequent element in
	   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
	   * heap[0] is not used.
	   */
	  s.heap_len = 0;
	  s.heap_max = HEAP_SIZE;
	
	  for (n = 0; n < elems; n++) {
	    if (tree[n * 2] /*.Freq*/ !== 0) {
	      s.heap[++s.heap_len] = max_code = n;
	      s.depth[n] = 0;
	    } else {
	      tree[n * 2 + 1] /*.Len*/ = 0;
	    }
	  }
	
	  /* The pkzip format requires that at least one distance code exists,
	   * and that at least one bit should be sent even if there is only one
	   * possible code. So to avoid special checks later on we force at least
	   * two codes of non zero frequency.
	   */
	  while (s.heap_len < 2) {
	    node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
	    tree[node * 2] /*.Freq*/ = 1;
	    s.depth[node] = 0;
	    s.opt_len--;
	
	    if (has_stree) {
	      s.static_len -= stree[node * 2 + 1] /*.Len*/;
	    }
	    /* node is 0 or 1 so it does not have extra bits */
	  }
	  desc.max_code = max_code;
	
	  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
	   * establish sub-heaps of increasing lengths:
	   */
	  for (n = s.heap_len >> 1 /*int /2*/; n >= 1; n--) {
	    pqdownheap(s, tree, n);
	  }
	
	  /* Construct the Huffman tree by repeatedly combining the least two
	   * frequent nodes.
	   */
	  node = elems; /* next internal node of the tree */
	  do {
	    //pqremove(s, tree, n);  /* n = node of least frequency */
	    /*** pqremove ***/
	    n = s.heap[1 /*SMALLEST*/];
	    s.heap[1 /*SMALLEST*/] = s.heap[s.heap_len--];
	    pqdownheap(s, tree, 1 /*SMALLEST*/);
	    /***/
	
	    m = s.heap[1 /*SMALLEST*/]; /* m = node of next least frequency */
	
	    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
	    s.heap[--s.heap_max] = m;
	
	    /* Create a new node father of n and m */
	    tree[node * 2] /*.Freq*/ = tree[n * 2] /*.Freq*/ + tree[m * 2] /*.Freq*/;
	    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
	    tree[n * 2 + 1] /*.Dad*/ = tree[m * 2 + 1] /*.Dad*/ = node;
	
	    /* and insert the new node in the heap */
	    s.heap[1 /*SMALLEST*/] = node++;
	    pqdownheap(s, tree, 1 /*SMALLEST*/);
	  } while (s.heap_len >= 2);
	
	  s.heap[--s.heap_max] = s.heap[1 /*SMALLEST*/];
	
	  /* At this point, the fields freq and dad are set. We can now
	   * generate the bit lengths.
	   */
	  gen_bitlen(s, desc);
	
	  /* The field len is now set, we can generate the bit codes */
	  gen_codes(tree, max_code, s.bl_count);
	}
	
	/* ===========================================================================
	 * Scan a literal or distance tree to determine the frequencies of the codes
	 * in the bit length tree.
	 */
	function scan_tree(s, tree, max_code)
	//    deflate_state *s;
	//    ct_data *tree;   /* the tree to be scanned */
	//    int max_code;    /* and its largest code of non zero frequency */
	{
	  var n; /* iterates over all tree elements */
	  var prevlen = -1; /* last emitted length */
	  var curlen; /* length of current code */
	
	  var nextlen = tree[0 * 2 + 1] /*.Len*/; /* length of next code */
	
	  var count = 0; /* repeat count of the current code */
	  var max_count = 7; /* max repeat count */
	  var min_count = 4; /* min repeat count */
	
	  if (nextlen === 0) {
	    max_count = 138;
	    min_count = 3;
	  }
	  tree[(max_code + 1) * 2 + 1] /*.Len*/ = 65535; /* guard */
	
	  for (n = 0; n <= max_code; n++) {
	    curlen = nextlen;
	    nextlen = tree[(n + 1) * 2 + 1] /*.Len*/;
	
	    if (++count < max_count && curlen === nextlen) {
	      continue;
	    } else if (count < min_count) {
	      s.bl_tree[curlen * 2] /*.Freq*/ += count;
	    } else if (curlen !== 0) {
	
	      if (curlen !== prevlen) {
	        s.bl_tree[curlen * 2] /*.Freq*/++;
	      }
	      s.bl_tree[REP_3_6 * 2] /*.Freq*/++;
	    } else if (count <= 10) {
	      s.bl_tree[REPZ_3_10 * 2] /*.Freq*/++;
	    } else {
	      s.bl_tree[REPZ_11_138 * 2] /*.Freq*/++;
	    }
	
	    count = 0;
	    prevlen = curlen;
	
	    if (nextlen === 0) {
	      max_count = 138;
	      min_count = 3;
	    } else if (curlen === nextlen) {
	      max_count = 6;
	      min_count = 3;
	    } else {
	      max_count = 7;
	      min_count = 4;
	    }
	  }
	}
	
	/* ===========================================================================
	 * Send a literal or distance tree in compressed form, using the codes in
	 * bl_tree.
	 */
	function send_tree(s, tree, max_code)
	//    deflate_state *s;
	//    ct_data *tree; /* the tree to be scanned */
	//    int max_code;       /* and its largest code of non zero frequency */
	{
	  var n; /* iterates over all tree elements */
	  var prevlen = -1; /* last emitted length */
	  var curlen; /* length of current code */
	
	  var nextlen = tree[0 * 2 + 1] /*.Len*/; /* length of next code */
	
	  var count = 0; /* repeat count of the current code */
	  var max_count = 7; /* max repeat count */
	  var min_count = 4; /* min repeat count */
	
	  /* tree[max_code+1].Len = -1; */ /* guard already set */
	  if (nextlen === 0) {
	    max_count = 138;
	    min_count = 3;
	  }
	
	  for (n = 0; n <= max_code; n++) {
	    curlen = nextlen;
	    nextlen = tree[(n + 1) * 2 + 1] /*.Len*/;
	
	    if (++count < max_count && curlen === nextlen) {
	      continue;
	    } else if (count < min_count) {
	      do {
	        send_code(s, curlen, s.bl_tree);
	      } while (--count !== 0);
	    } else if (curlen !== 0) {
	      if (curlen !== prevlen) {
	        send_code(s, curlen, s.bl_tree);
	        count--;
	      }
	      //Assert(count >= 3 && count <= 6, " 3_6?");
	      send_code(s, REP_3_6, s.bl_tree);
	      send_bits(s, count - 3, 2);
	    } else if (count <= 10) {
	      send_code(s, REPZ_3_10, s.bl_tree);
	      send_bits(s, count - 3, 3);
	    } else {
	      send_code(s, REPZ_11_138, s.bl_tree);
	      send_bits(s, count - 11, 7);
	    }
	
	    count = 0;
	    prevlen = curlen;
	    if (nextlen === 0) {
	      max_count = 138;
	      min_count = 3;
	    } else if (curlen === nextlen) {
	      max_count = 6;
	      min_count = 3;
	    } else {
	      max_count = 7;
	      min_count = 4;
	    }
	  }
	}
	
	/* ===========================================================================
	 * Construct the Huffman tree for the bit lengths and return the index in
	 * bl_order of the last bit length code to send.
	 */
	function build_bl_tree(s) {
	  var max_blindex; /* index of last bit length code of non zero freq */
	
	  /* Determine the bit length frequencies for literal and distance trees */
	  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
	  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
	
	  /* Build the bit length tree: */
	  build_tree(s, s.bl_desc);
	  /* opt_len now includes the length of the tree representations, except
	   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
	   */
	
	  /* Determine the number of bit length codes to send. The pkzip format
	   * requires that at least 4 bit length codes be sent. (appnote.txt says
	   * 3 but the actual value used is 4.)
	   */
	  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
	    if (s.bl_tree[bl_order[max_blindex] * 2 + 1] /*.Len*/ !== 0) {
	      break;
	    }
	  }
	  /* Update opt_len to include the bit length tree and counts */
	  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
	  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
	  //        s->opt_len, s->static_len));
	
	  return max_blindex;
	}
	
	/* ===========================================================================
	 * Send the header for a block using dynamic Huffman trees: the counts, the
	 * lengths of the bit length codes, the literal tree and the distance tree.
	 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
	 */
	function send_all_trees(s, lcodes, dcodes, blcodes)
	//    deflate_state *s;
	//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
	{
	  var rank; /* index in bl_order */
	
	  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
	  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
	  //        "too many codes");
	  //Tracev((stderr, "\nbl counts: "));
	  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
	  send_bits(s, dcodes - 1, 5);
	  send_bits(s, blcodes - 4, 4); /* not -3 as stated in appnote.txt */
	  for (rank = 0; rank < blcodes; rank++) {
	    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
	    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1], /*.Len*/3);
	  }
	  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));
	
	  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
	  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));
	
	  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
	  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
	}
	
	/* ===========================================================================
	 * Check if the data type is TEXT or BINARY, using the following algorithm:
	 * - TEXT if the two conditions below are satisfied:
	 *    a) There are no non-portable control characters belonging to the
	 *       "black list" (0..6, 14..25, 28..31).
	 *    b) There is at least one printable character belonging to the
	 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
	 * - BINARY otherwise.
	 * - The following partially-portable control characters form a
	 *   "gray list" that is ignored in this detection algorithm:
	 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
	 * IN assertion: the fields Freq of dyn_ltree are set.
	 */
	function detect_data_type(s) {
	  /* black_mask is the bit mask of black-listed bytes
	   * set bits 0..6, 14..25, and 28..31
	   * 0xf3ffc07f = binary 11110011111111111100000001111111
	   */
	  var black_mask = 4093624447;
	  var n;
	
	  /* Check for non-textual ("black-listed") bytes. */
	  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
	    if (black_mask & 1 && s.dyn_ltree[n * 2] /*.Freq*/ !== 0) {
	      return Z_BINARY;
	    }
	  }
	
	  /* Check for textual ("white-listed") bytes. */
	  if (s.dyn_ltree[9 * 2] /*.Freq*/ !== 0 || s.dyn_ltree[10 * 2] /*.Freq*/ !== 0 || s.dyn_ltree[13 * 2] /*.Freq*/ !== 0) {
	    return Z_TEXT;
	  }
	  for (n = 32; n < LITERALS; n++) {
	    if (s.dyn_ltree[n * 2] /*.Freq*/ !== 0) {
	      return Z_TEXT;
	    }
	  }
	
	  /* There are no "black-listed" or "white-listed" bytes:
	   * this stream either is empty or has tolerated ("gray-listed") bytes only.
	   */
	  return Z_BINARY;
	}
	
	var static_init_done = false;
	
	/* ===========================================================================
	 * Initialize the tree data structures for a new zlib stream.
	 */
	function _tr_init(s) {
	
	  if (!static_init_done) {
	    tr_static_init();
	    static_init_done = true;
	  }
	
	  s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
	  s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
	  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
	
	  s.bi_buf = 0;
	  s.bi_valid = 0;
	
	  /* Initialize the first block of the first file: */
	  init_block(s);
	}
	
	/* ===========================================================================
	 * Send a stored block
	 */
	function _tr_stored_block(s, buf, stored_len, last)
	//DeflateState *s;
	//charf *buf;       /* input block */
	//ulg stored_len;   /* length of input block */
	//int last;         /* one if this is the last block for a file */
	{
	  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3); /* send block type */
	  copy_block(s, buf, stored_len, true); /* with header */
	}
	
	/* ===========================================================================
	 * Send one empty static block to give enough lookahead for inflate.
	 * This takes 10 bits, of which 7 may remain in the bit buffer.
	 */
	function _tr_align(s) {
	  send_bits(s, STATIC_TREES << 1, 3);
	  send_code(s, END_BLOCK, static_ltree);
	  bi_flush(s);
	}
	
	/* ===========================================================================
	 * Determine the best encoding for the current block: dynamic trees, static
	 * trees or store, and output the encoded block to the zip file.
	 */
	function _tr_flush_block(s, buf, stored_len, last)
	//DeflateState *s;
	//charf *buf;       /* input block, or NULL if too old */
	//ulg stored_len;   /* length of input block */
	//int last;         /* one if this is the last block for a file */
	{
	  var opt_lenb, static_lenb; /* opt_len and static_len in bytes */
	  var max_blindex = 0; /* index of last bit length code of non zero freq */
	
	  /* Build the Huffman trees unless a stored block is forced */
	  if (s.level > 0) {
	
	    /* Check if the file is binary or text */
	    if (s.strm.data_type === Z_UNKNOWN) {
	      s.strm.data_type = detect_data_type(s);
	    }
	
	    /* Construct the literal and distance trees */
	    build_tree(s, s.l_desc);
	    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
	    //        s->static_len));
	
	    build_tree(s, s.d_desc);
	    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
	    //        s->static_len));
	    /* At this point, opt_len and static_len are the total bit lengths of
	     * the compressed block data, excluding the tree representations.
	     */
	
	    /* Build the bit length tree for the above two trees, and get the index
	     * in bl_order of the last bit length code to send.
	     */
	    max_blindex = build_bl_tree(s);
	
	    /* Determine the best encoding. Compute the block lengths in bytes. */
	    opt_lenb = s.opt_len + 3 + 7 >>> 3;
	    static_lenb = s.static_len + 3 + 7 >>> 3;
	
	    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
	    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
	    //        s->last_lit));
	
	    if (static_lenb <= opt_lenb) {
	      opt_lenb = static_lenb;
	    }
	  } else {
	    // Assert(buf != (char*)0, "lost buf");
	    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
	  }
	
	  if (stored_len + 4 <= opt_lenb && buf !== -1) {
	    /* 4: two words for the lengths */
	
	    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
	     * Otherwise we can't have processed more than WSIZE input bytes since
	     * the last block flush, because compression would have been
	     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
	     * transform a block into a stored block.
	     */
	    _tr_stored_block(s, buf, stored_len, last);
	  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {
	
	    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
	    compress_block(s, static_ltree, static_dtree);
	  } else {
	    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
	    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
	    compress_block(s, s.dyn_ltree, s.dyn_dtree);
	  }
	  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
	  /* The above check is made mod 2^32, for files larger than 512 MB
	   * and uLong implemented on 32 bits.
	   */
	  init_block(s);
	
	  if (last) {
	    bi_windup(s);
	  }
	  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
	  //       s->compressed_len-7*last));
	}
	
	/* ===========================================================================
	 * Save the match info and tally the frequency counts. Return true if
	 * the current block must be flushed.
	 */
	function _tr_tally(s, dist, lc)
	//    deflate_state *s;
	//    unsigned dist;  /* distance of matched string */
	//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
	{
	  //var out_length, in_length, dcode;
	
	  s.pending_buf[s.d_buf + s.last_lit * 2] = dist >>> 8 & 255;
	  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 255;
	
	  s.pending_buf[s.l_buf + s.last_lit] = lc & 255;
	  s.last_lit++;
	
	  if (dist === 0) {
	    /* lc is the unmatched char */
	    s.dyn_ltree[lc * 2] /*.Freq*/++;
	  } else {
	    s.matches++;
	    /* Here, lc is the match length - MIN_MATCH */
	    dist--; /* dist = match distance - 1 */
	    //Assert((ush)dist < (ush)MAX_DIST(s) &&
	    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
	    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");
	
	    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2] /*.Freq*/++;
	    s.dyn_dtree[d_code(dist) * 2] /*.Freq*/++;
	  }
	
	  // (!) This block is disabled in zlib defailts,
	  // don't enable it for binary compatibility
	
	  //#ifdef TRUNCATE_BLOCK
	  //  /* Try to guess if it is profitable to stop the current block here */
	  //  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
	  //    /* Compute an upper bound for the compressed length */
	  //    out_length = s.last_lit*8;
	  //    in_length = s.strstart - s.block_start;
	  //
	  //    for (dcode = 0; dcode < D_CODES; dcode++) {
	  //      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
	  //    }
	  //    out_length >>>= 3;
	  //    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
	  //    //       s->last_lit, in_length, out_length,
	  //    //       100L - out_length*100L/in_length));
	  //    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
	  //      return true;
	  //    }
	  //  }
	  //#endif
	
	  return s.last_lit === s.lit_bufsize - 1;
	  /* We avoid equality with lit_bufsize because of wraparound at 64K
	   * on 16 bit machines and because stored blocks are restricted to
	   * 64K-1 bytes.
	   */
	}
	
	exports._tr_init = _tr_init;
	exports._tr_stored_block = _tr_stored_block;
	exports._tr_flush_block = _tr_flush_block;
	exports._tr_tally = _tr_tally;
	exports._tr_align = _tr_align;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
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

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(3);
	
	var _configConfig = __webpack_require__(7);
	
	var _configConfig2 = _interopRequireDefault(_configConfig);
	
	var _connectionsConnectionStatus = __webpack_require__(14);
	
	var _connectionsConnectionStatus2 = _interopRequireDefault(_connectionsConnectionStatus);
	
	__webpack_require__(1);
	
	__webpack_require__(15);
	
	__webpack_require__(25);
	
	var config = new _configConfig2['default']();
	var connectionStatus = new _connectionsConnectionStatus2['default'](config);
	
	riot.mount('app-header', config.user);
	riot.mount('app-footer', connectionStatus);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _riot = __webpack_require__(2);
	
	var _riot2 = _interopRequireDefault(_riot);
	
	_riot2['default'].tag('app-header', '<nav role="navigation" class="navbar navbar-default">\n        <div class="container">\n            <div class="navbar-header">\n                <button type="button" data-target="#menu" data-toggle="collapse" class="navbar-toggle">\n                    <span class="sr-only">Toggle navigation</span>\n                    <span class="icon-bar"></span>\n                    <span class="icon-bar"></span>\n                    <span class="icon-bar"></span>\n                </button>\n                <a href="#" class="navbar-brand">Service Fabric Multi Deployment Demo</a>\n            </div>\n            <div id="menu" class="collapse navbar-collapse">\n                <ul class="nav navbar-nav navbar-right">\n                    <li><a href="#/profile">Signed in as <span class="username"></span></a></li>\n                    <li><a id="logout" href="#">Logout</a></li>\n                </ul>            \n            </div>\n        </div>\n    </nav>', function (user) {
	
	    this.on('mount', function () {
	        $('.username').html(user.profile.name);
	        $('#logout').on('click', function () {
	            user.logout();
	        });
	    });
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = riot;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	exports.push([module.id, "html {\r\n    position: relative;\r\n    min-height: 100%;\r\n}\r\n\r\nbody {\r\n    /* Margin bottom by footer height */\r\n    margin-bottom: 60px;\r\n    background: ghostwhite; \r\n}\r\n\r\n.footer {\r\n  position: absolute;\r\n  bottom: 0;\r\n  width: 100%;\r\n  /* Set the fixed height of the footer here */\r\n  height: 60px;\r\n  background-color: #f5f5f5;\r\n}\r\n", ""]);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	"use strict";
	
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
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
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 6 */
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
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
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
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
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
	
	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
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
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
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
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _jquery = __webpack_require__(8);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _user = __webpack_require__(9);
	
	var _user2 = _interopRequireDefault(_user);
	
	var Config = function Config() {
	    _classCallCheck(this, Config);
	
	    this.apiBaseUrl = (0, _jquery2['default'])('meta[name="env:url:api"]').attr('content');
	    this.agentBaseUrl = (0, _jquery2['default'])('meta[name="env:url:agent"]').attr('content');
	    this.user = new _user2['default']();
	};
	
	exports['default'] = Config;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = jQuery;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _jwtDecode = __webpack_require__(10);
	
	var _jwtDecode2 = _interopRequireDefault(_jwtDecode);
	
	var User = (function () {
	    function User() {
	        _classCallCheck(this, User);
	
	        this.idToken = getIdToken();
	        this.profile = (0, _jwtDecode2['default'])(this.idToken);
	        this.expiryDate = new Date(this.profile.exp * 1000);
	    }
	
	    _createClass(User, [{
	        key: 'logout',
	        value: function logout() {
	            localStorage.removeItem('id_token');
	            window.location = '/logout';
	        }
	    }]);
	
	    return User;
	})();
	
	exports['default'] = User;
	
	function getIdToken() {
	    var idToken = localStorage.getItem('id_token');
	
	    if (!idToken || location.hash !== '') {
	        if (location.hash === '') {
	            $('body').append('<br/>No id_token, please get one.');
	        } else {
	            // Save the JWT token
	            var idToken = location.hash.slice(1);
	            localStorage.setItem('id_token', idToken);
	
	            // Remove ugly JWT token from URL
	            history.pushState('', document.title, window.location.pathname);
	        }
	    }
	
	    return idToken;
	}
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var base64_url_decode = __webpack_require__(11);
	var json_parse = __webpack_require__(13);
	
	module.exports = function (token) {
	  return json_parse(base64_url_decode(token.split('.')[1]));
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Base64 = __webpack_require__(12);
	
	module.exports = function (str) {
	  var output = str.replace(/-/g, "+").replace(/_/g, "/");
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	;(function () {
	
	  var object = true ? exports : this,
	      // #8: web workers
	  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
	      INVALID_CHARACTER_ERR = (function () {
	    // fabricate a suitable error object
	    try {
	      document.createElement('$');
	    } catch (error) {
	      return error;
	    }
	  })();
	
	  // encoder
	  // [https://gist.github.com/999166] by [https://github.com/nignag]
	  object.btoa || (object.btoa = function (input) {
	    for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars, output = '';
	    // if the next input index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    input.charAt(idx | 0) || (map = '=', idx % 1);
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
	    input = input.replace(/=+$/, '');
	    if (input.length % 4 == 1) throw INVALID_CHARACTER_ERR;
	    for (
	    // initialize result and counters
	    var bc = 0, bs, buffer, idx = 0, output = '';
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function (str) {
	  return window.JSON ? window.JSON.parse(str) : eval('(' + str + ')');
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _riot = __webpack_require__(2);
	
	var _riot2 = _interopRequireDefault(_riot);
	
	var ConnectionStatus = function ConnectionStatus(config) {
	    _classCallCheck(this, ConnectionStatus);
	
	    _riot2['default'].observable(this);
	    this.config = config;
	
	    this.apiMessage = 'Pending...';
	    this.apiStatus = 'warning';
	
	    this.agentMessage = 'Pending...';
	    this.agentStatus = 'warning';
	
	    this.CHANGED = 'changed';
	    updateStatus(this);
	};
	
	exports['default'] = ConnectionStatus;
	
	function updateStatus(self) {
	    $.ajax({
	        type: 'GET',
	        url: self.config.apiBaseUrl + '/analyze/ping/'
	    }).done(function (response) {
	        self.apiMessage = response.Name;
	        self.apiStatus = 'success';
	    }).error(function () {
	        self.api = 'Missing valid token, unable to call API';
	        self.apiStatus = 'danger';
	    }).complete(function () {
	        self.trigger(self.CHANGED);
	    });
	
	    $.ajax({
	        type: 'GET',
	        url: self.config.apiBaseUrl + '/analyze/ping/'
	    }).done(function (response) {
	        self.agentMessage = response;
	        self.agentStatus = 'success';
	    }).error(function () {
	        self.agent = 'Unable to call Agent.';
	        self.agentStatus = 'danger';
	    }).complete(function () {
	        self.trigger(self.CHANGED);
	    });
	
	    setTimeout(function () {
	        return updateStatus(self);
	    }, 120000);
	}
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _riot = __webpack_require__(2);
	
	var _riot2 = _interopRequireDefault(_riot);
	
	var _jquery = __webpack_require__(8);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	__webpack_require__(16);
	
	__webpack_require__(18);
	
	__webpack_require__(20);
	
	__webpack_require__(21);
	
	__webpack_require__(22);
	
	_riot2['default'].tag('app-content', '<div class="container">\n        <div class="row">\n            <div class="col-sm-6">\n                <div class="panel panel-default">\n                    <div class="panel-heading">Image processing</div>\n                    <div class="panel-body">\n                        <div class="row">\n                            <file-uploader file_uploader={opts.fileUploader}></file-uploader>\n                            <div style="margin:0 0 10px" class="col-sm-12"></div>\n                            <div style="margin:0 0 10px" class="col-sm-12"></div>\n                            <div class="col-sm-12">\n                                <div id="progress-bar-container" class="progress progress-striped active center-block" style="height:24px">\n                                    <div id="progress-bar" class="progress-bar" style="width: 0%"></div>\n                                </div>\n                            </div>\n                            <div class="col-xs-12">\n                                <div id="files"></div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <!--div class="col-sm-6">\n                <div class="panel panel-default">\n                    <div class="panel-heading">Clinical data</div>\n                    <div class="panel-body">\n                        <div class="alert alert-info" role="alert">\n                            This panel will eventually allow adding clinical data manually or\n                            by selecting a preselected demo subject.\n                        </div>\n                    </div>\n                </div>\n            </div-->\n            <div class="col-sm-6">\n                <div class="panel panel-default">\n                    <div class="panel-heading">Disease State Fingerprint</div>\n                    <div class="panel-body">\n                        <div class="fingeprint-container" style="height: 484px; overflow-y: scroll">\n                            <div id="fingerprint">\n                                <div class="alert alert-info" role="alert">\n                                    Load and analyze an MRI to see DSF visualization.\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>    \n        <div class="row">\n            <div class="col-sm-12">\n                <div class="panel panel-default">\n                    <div class="panel-heading">Disease State Index</div>\n                    <div class="panel-body">\n                        <div class="row">\n                            <div class="col-sm-6">\n                                <div id="distribution">\n                                    <div class="alert alert-info" role="alert">\n                                        Load and analyze an MRI to see DSI distributions.\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="col-sm-6">\n                                <div id="influence">\n                                    <div class="alert alert-info" role="alert">\n                                        Load and analyze an MRI to see DSI influence.\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>        \n    </div>', function (opts) {
	    var uploadButton = (0, _jquery2['default'])('<button/>').addClass('btn btn-primary').text('Begin analysis').on('click', function () {
	        var $this = (0, _jquery2['default'])(this),
	            data = $this.data();
	        $this.off('click').text('Abort').on('click', function () {
	            $this.remove();
	            data.abort();
	        });
	        data.submit();
	    });
	
	    opts.fileUploader.on(opts.fileUploader.FILE_ADDED, function (files) {
	        (0, _jquery2['default'])('#files').append(uploadButton.clone(true).data(files));
	    });
	
	    opts.fileUploader.on(opts.fileUploader.FILE_PROGRESS, function (data) {
	        var progress = parseInt(data.loaded / data.total * 100, 10);
	        (0, _jquery2['default'])('#progress-bar-container .progress-bar').css('width', progress + '%');
	    });
	
	    opts.fileUploader.on(opts.fileUploader.FILE_UPLOADED, function (data) {
	        var $files = (0, _jquery2['default'])('#files');
	        $files.empty();
	        (0, _jquery2['default'])('#progress-bar-container .progress-bar').css('width', '0%');
	
	        // Create fingerprint tree
	        var fingerprint = (0, _jquery2['default'])('#fingerprint').fingerprintTree({
	            id: 14,
	            dataset: 'ADNI',
	            baseUrl: opts.config.apiBaseUrl
	        }).data('fingerprintTree');
	
	        // Create fingerprint distributions
	        (0, _jquery2['default'])('#distribution').fingerprintDistributions({
	            fingerprintTree: fingerprint
	        });
	
	        (0, _jquery2['default'])('#distribution').html('<div class="fingerprint-distributions-flash"><h3>Select a node to see the subject\'s' + ' data in relation to distributions of control and disease cases.</h3><p>In this example,' + ' the background data are mild cognitive impairment (MCI) subjects,some of which' + ' progressed to Alzheimer\'s disease within the next three years. Stable MCIs appear' + ' as blue distributions, progressive MCIs as red distributions.</p></div>');
	
	        (0, _jquery2['default'])('#influence').empty();
	
	        (0, _jquery2['default'])('#influence').fingerprintInfluence({
	            fingerprintTree: fingerprint
	        });
	    });
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./fingerprint.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./fingerprint.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	exports.push([module.id, "\r\n.fingerprint-node {\r\n    display: inline-block;\r\n    border-radius: 2px;\r\n    border: solid 1px #999999;\r\n}\r\n\r\n.fingerprint-distributions-flash {\r\n    color: #a3c4fc;\r\n    vertical-align: central;\r\n}\r\n", ""]);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _jquery = __webpack_require__(8);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _kendo = __webpack_require__(19);
	
	var _kendo2 = _interopRequireDefault(_kendo);
	
	(function ($) {
	    'use strict';
	
	    var fingerprintNodeTemplate = '#         var index = new Number(item.Index);         var value = item.Value;         var relevance = new Number(item.Relevance);         if(isNaN(item.Value)==false)  {             value = new Number(item.Value);             value = value.toFixed(2)         }         #         #             var node = Fingerprint.createNode(item.Index, item.Relevance);         #         #= node # #: item.Name # (#= index.toFixed(2)#)';
	
	    var FingerprintTree = function FingerprintTree(elem, params) {
	        this.$elem = $(elem);
	
	        this.params = params;
	        this.params.urlPath = '/fingerprint/' + this.params.dataset + '/' + this.params.id;
	        this.disabled = [];
	
	        this.treeData = new _kendo2['default'].data.HierarchicalDataSource({
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
	            template: _kendo2['default'].template(fingerprintNodeTemplate),
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
	                this.treeView.expand('.k-first');
	                this.setExpanded(this.expanded);
	                if (this.selectedItem) {
	                    var data = this.treeView.dataSource.data();
	                    var select = this.getByName(data, this.selectedItem.Name);
	                    if (select) {
	                        this.treeView.select(select);
	                        this.treeView.trigger('select', {
	                            node: select
	                        });
	                    }
	                }
	            }
	        },
	
	        updateId: function updateId(id) {
	            this.params.id = id;
	            this.params.urlPath = '/fingerprint/' + this.params.dataset + '/' + this.params.id;
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
	            $('.k-item', this.$elem).each(function () {
	                var item = self.treeView.dataItem(this);
	                result[item.Name] = item.expanded;
	            });
	
	            return result;
	        },
	
	        setExpanded: function setExpanded(expanded) {
	            var self = this;
	            this.expanding = true;
	            if (expanded) {
	                $('.k-item', this.$elem).each(function () {
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
	            return this.disabled.length > 0 ? '?disabled=' + this.disabled.join('&disabled=') : '';
	        },
	
	        nodeChecked: function nodeChecked(e) {
	            if (this.expanding) {
	                return;
	            }
	
	            this.updateDisabled(e.node);
	
	            this.params.urlPath = '/fingerprint/' + this.params.dataset + '/' + this.params.id;
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
	})(_jquery2['default']);
	
	var Fingerprint = (function () {
	    'use strict';
	
	    function getNodeColor(index) {
	        if (index === null) {
	            return 'rgba(192,192,192,1);';
	        }
	
	        if (Math.abs(index - 0.5) < 0.005) {
	            return 'rgba(0,0,0,0);';
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
	
	        return 'rgba(' + r + ',' + g + ',' + b + ',1);';
	    }
	
	    function getNodeSize(relevance) {
	        var height = 7 + relevance * 18;
	        var width = 7 + relevance * 54;
	
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
	    };
	})();
	
	window.Fingerprint = Fingerprint;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = kendo;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _jquery = __webpack_require__(8);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	(function ($) {
	    'use strict';
	
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
	            console.info('Selecting: ' + node.id);
	            $.ajax({
	                url: this.fingerprintTree.params.baseUrl + '/distribution/' + this.fingerprintTree.params.dataset + '/' + this.fingerprintTree.params.id + '/' + node.id + this.fingerprintTree.getDisabledQuery(),
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
	                seriesColors: ['blue', 'red'],
	                seriesDefaults: {
	                    type: 'area'
	                },
	                title: {
	                    text: 'Distributions'
	                },
	                legend: {
	                    position: 'bottom'
	                },
	                series: [{
	                    name: 'Control',
	                    data: data.ControlValues
	                }, {
	                    name: 'Positive',
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
	                                text: 'DSI\n' + node.Index.toFixed(2)
	                            }
	                        }],
	                        line: {
	                            length: 200,
	                            width: 4,
	                            color: '#444444'
	                        },
	                        icon: {
	                            background: '#444444',
	                            border: {
	                                width: 2,
	                                color: '#444444'
	                            }
	                        },
	                        label: {
	                            color: 'white',
	                            font: '10px sans-serif'
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
	            if (!$this.data('fingerprintDistributions')) {
	                $this.data('fingerprintDistributions', new FingerprintDistributions(this, params));
	            }
	        });
	    };
	})(_jquery2['default']);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _jquery = __webpack_require__(8);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	(function ($) {
	    'use strict';
	
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
	            return rgb && rgb.length === 4 ? '#' + ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
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
	                    text: 'Feature influence'
	                },
	                legend: {
	                    visible: false
	                },
	                seriesDefaults: {
	                    labels: {
	                        template: '#= kendo.format(\'{0:P0}\', percentage) # - #= category #',
	                        position: 'outsideEnd',
	                        visible: true,
	                        background: 'transparent',
	                        align: 'column'
	                    }
	                },
	                series: [{
	                    type: 'donut',
	                    data: data
	                }],
	                tooltip: {
	                    visible: true,
	                    template: '#= kendo.format(\'{0:P0}\', percentage) # - #= category #'
	                }
	            });
	        }
	    };
	
	    // jQuery plugin
	    $.fn.fingerprintInfluence = function (params) {
	
	        return this.each(function () {
	
	            var $this = $(this);
	            if (!$this.data('FingerprintInfluence')) {
	                $this.data('FingerprintInfluence', new FingerprintInfluence(this, params));
	            }
	        });
	    };
	})(_jquery2['default']);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(23);
	
	var _riot = __webpack_require__(2);
	
	var _riot2 = _interopRequireDefault(_riot);
	
	_riot2['default'].tag('file-uploader', '<div class="col-sm-12">\n        <span class="btn btn-primary btn-file btn-block">\n            Select a T1 MRI file for processing... <input id="file-upload" type="file" name="files[]" multiple="" accept=".nii.gz">\n        </span>\n    </div>', function (opts) {
	    this.parent.on('mount', function () {
	        var $elem = $('#file-upload');
	        opts.fileUploader.apply($elem);
	    });
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(24);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./dragdrop.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./dragdrop.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	exports.push([module.id, ".btn-file {\r\n    position: relative;\r\n    overflow: hidden;\r\n}\r\n.btn-file input[type=file] {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    min-width: 100%;\r\n    min-height: 100%;\r\n    font-size: 100px;\r\n    text-align: right;\r\n    filter: alpha(opacity=0);\r\n    opacity: 0;\r\n    outline: none;\r\n    background: white;\r\n    cursor: inherit;\r\n    display: block;\r\n}\r\n", ""]);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _riot = __webpack_require__(2);
	
	var _riot2 = _interopRequireDefault(_riot);
	
	_riot2['default'].tag('app-footer', '<div class="container">\n        <div class="row">\n            <div class="col-sm-3">\n                <h5>API access <span class="label label-{ apiStatus }"> { apiMessage } </span></h5>\n            </div>\n            <div class="col-sm-3">\n                <h5>Agent status <span class="label label-{ agentStatus }"> { agentMessage } </span></h5>\n            </div>\n        </div>\n    </div>', function (connectionStatus) {
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
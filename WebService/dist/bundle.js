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
	
	__webpack_require__(16);
	
	var config = new _configConfig2['default']();
	var connectionStatus = new _connectionsConnectionStatus2['default'](config);
	
	riot.mount('app-header', config.user);
	riot.mount('app-content', connectionStatus);
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
	        self.apiMessage = response;
	        self.apiStatus = 'success';
	    }).error(function () {
	        self.api = 'Missing valid token, unable to call API';
	        self.apiStatus = 'danger';
	    }).complete(function () {
	        self.trigger(self.CHANGED);
	    });
	
	    $.ajax({
	        type: 'GET',
	        url: self.config.agentBaseUrl + '/voicemailbox/ping/'
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
	
	_riot2['default'].tag('app-content', '<div class="container">\n          <h3>Submit Report Zone </h3>\n         <div class="row">\n            <button id="sendButton" onclick={sendAnalysisTask}>Send Report For Analysis</button>\n            <br></br>\n            <div id="sendResult"></div>\n        </div>\n        <h3>Report Result Zone </h3>\n        <div class="row2">\n            <div id="sendWord"></div>\n            <div id="count"></div>\n        </div>\n    </div>', function (connectionStatus) {
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
	
	    this.SendWords = function () {
	        $.ajax({
	            url: connectionStatus.config.apiBaseUrl + '/analyze/StartReportAnalysis/' + this.randomWord(),
	            method: 'POST'
	        }).done(function (wordResult) {
	            $('#sendWord').html(wordResult);
	        });
	    };
	
	    this.sendAnalysisTask = function () {
	        this.sendButton.disabled = true;
	        $('#sendResult').html('<span>Report sent for Analysis, waiting result....</span>');
	        this.SendWords();
	    };
	
	    this.getdAnalysisTaskID = function () {
	        this.sendButton.disabled = true;
	    };
	
	    this.count = function () {
	        $.ajax({
	            url: connectionStatus.config.apiBaseUrl + '/analyze/Count?c=' + Math.random(),
	            dataType: 'text',
	            method: 'GET'
	        }).done(function (countResult) {
	            $('#getResult').html(countResult);
	        });
	    };
	
	    this.randomWord = function () {
	        var text = '';
	        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	
	        for (var i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
	
	        return text;
	    };
	
	    this.SetGreeting = function () {
	        $.ajax({
	            url: connectionStatus.conf.agentBaseUrl + '/voicemailbox/SetGreeting/' + NextGreeting(),
	            dataType: 'text',
	            method: 'POST'
	        }).done(function (setGreetingResult) {
	            $('#setGreeting').html(setGreetingResult);
	            GetGreeting();
	        });
	    };
	
	    this.GetMessages = function () {
	        $.ajax({
	            url: connectionStatus.conf.agentBaseUrl + '/voicemailbox/GetMessages?c=' + ++getRequestIteration,
	            dataType: 'text',
	            method: 'GET'
	        }).done(function (getMessagesResult) {
	            $('#getMessages').html(getMessagesResult);
	        });
	    };
	});

/***/ },
/* 16 */
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
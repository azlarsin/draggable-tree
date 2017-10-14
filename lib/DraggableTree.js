var DraggableTree =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by azlar on 05/09/2017.
 */



__webpack_require__(2);

module.exports = __webpack_require__(7).default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./index.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "\n.layers {\n    width: 500px;\n    background-color: rgba(111, 111, 111, .1);\n    opacity: 1;\n    transition: transform .3s;\n    display: flex;\n    flex-direction: column;\n    box-shadow: 1px 0 1px rgba(0,0,0,.2);\n}\n\n.layers .layer {\n    position: relative;\n    clear: both;\n    overflow: hidden;\n    height: 50px;\n    border-top: 1px solid transparent;\n    border-bottom: 1px solid rgba(0,0,0, .12);\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n\n    padding: 0 10px;\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: center;\n}\n\n.layers .child-layers {\n    /*display: none;*/\n    box-sizing: border-box;\n    padding-left: 9px;\n    border-left: 2px solid transparent;\n    clear: both;\n    -webkit-transition: border-left-color .3s ease-out;\n    -o-transition: border-left-color .3s ease-out;\n    transition: border-left-color .3s ease-out;\n}\n\n.layers .layer.selected,\n.layers .layer.selected:hover {\n    background-color: rgba(0,0,255, .4);\n    opacity: 1;\n    text-decoration: none;\n    color: #fff;\n}\n\n.layers .layer:hover {\n    background-color: rgba(0,0,255, .2);\n}\n\n.layers .layer-box.over {\n    background-color: rgba(45,48,52,.3);\n}\n\n.layers .layer.show-top-line {\n    border-top: 1px solid #1E96FD;\n}\n\n.layers > .layer-box.holder > .layer,\n.layers > .layer-box.holder > .layer:hover {\n    background-color: transparent;\n    border-bottom: none;\n}", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
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

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

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

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by azlar on 23/09/2017.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var DraggableTree = function () {
    var layerHeight = 50;

    var moveTypes = {
        in: 1,
        upon: 2
    };

    var trees = new Map();

    /*  removed
        Array.prototype.deleteByValue = function (target) {
            let targetIndex = this.findIndex(v => {
                return v === target;
            });
             if(targetIndex !== -1) {
                this.splice(targetIndex, 1)
            }
             return this;
        };
         Array.prototype.insertBeforeValue = function (target, value) {
            let targetIndex = this.findIndex(v => {
                return v === target;
            });
             this.splice(targetIndex, 0, value);
             return this;
        };
        */

    //utils
    function guid() {
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    }
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000);
    }

    function consoleError(info) {
        console.error(info);
    }

    function deleteByValueFromArray(value, arr) {
        if (Object.prototype.toString.call(arr) !== "[object Array]") {
            return arr;
        }

        var targetIndex = arr.findIndex(function (v) {
            return v === value;
        });

        if (targetIndex !== -1) {
            arr.splice(targetIndex, 1);
        }

        return arr;
    }

    function insertToArrayBeforeValue(target, value, arr) {
        if (Object.prototype.toString.call(arr) !== "[object Array]") {
            return arr;
        }

        var targetIndex = arr.findIndex(function (v) {
            return v === target;
        });

        arr.splice(targetIndex, 0, value);

        return arr;
    }

    // check type
    function is(v, type) {
        var t = Object.prototype.toString.call(v).split(' ')[1].slice(0, -1);
        return !type ? t : t.toLowerCase() === type.toLowerCase();
    }

    function __createLayer(node) {
        var layerBox = document.createElement("div"),
            layerContent = document.createElement("div"),
            childLayers = document.createElement("div");

        layerBox.classList.add("layer-box");

        layerContent.classList.add("layer");
        layerContent.style.height = layerHeight + "px";
        layerContent.setAttribute("draggable", "true");
        layerContent.setAttribute("data-id", node.id);
        layerContent.innerHTML = node.data || node.id;

        childLayers.classList.add("child-layers");

        layerBox.appendChild(layerContent);
        layerBox.appendChild(childLayers);

        return layerBox;
    }

    function __checkOptions(options) {
        var passed = true,
            info = {
            key: null,
            expecting: null,
            received: null
        };

        options.mountDom = options.mountDom instanceof HTMLElement ? options.mountDom : document.querySelector(options.mountDom);

        for (var i in options) {
            if (passed === false) {
                break;
            }
            if (options.hasOwnProperty(i)) {
                if (i === "mountDom") {
                    passed = options[i] instanceof HTMLElement;

                    info.expecting = "HTMLElement or a selector";
                }

                if (["click", "drop", "dragStart", "dragOver", "dragLeave", "dragEnd", "changed"].indexOf(i) !== -1 && options[i] !== undefined) {
                    passed = typeof options[i] === "function";

                    info.expecting = "Function";
                }

                if (i === 'list' || i === 'rootList') {
                    passed = is(options[i], 'array');

                    info.expecting = 'Array';
                }

                if (i === 'map') {
                    passed = is(options[i], 'map');

                    info.expecting = 'Map';
                }

                if (i === 'multiSelect') {
                    passed = is(options[i], 'boolean');

                    info.expecting = 'Boolean';
                }

                if (!passed) {
                    info.key = i;
                    info.received = _typeof(options[i]);
                }
            }
        }

        if (!passed) {
            consoleError("invalid option: " + info.key + ", expecting " + info.expecting + ", received " + info.received);
        }

        return passed;
    }

    // main
    function Tree(options) {
        // initial
        this.init(options);

        // initial check after defined property
        if (!this.__check()) {
            return this;
        }

        this.mountDom.classList.add("layers");
        this.render();

        var self = this;

        // bind events for mountDom
        this.mountDom.addEventListener("mousedown", function (e) {
            var layer = e.target,
                layerNodeId = layer.getAttribute("data-id");

            if (!layerNodeId) {
                return;
            }

            self.__selectNode(layerNodeId);
            if (layer.classList.contains("selected")) {
                // cb
                if (typeof self.click === "function") {
                    self.click(e, layerNodeId);
                }

                return;
            }

            if (!self.multiSelect) {
                e.currentTarget.querySelectorAll("layer");
                e.currentTarget.querySelectorAll(".layer.selected").forEach(function (dom) {
                    dom.classList.remove("selected");
                });
            }

            layer.classList.add("selected");

            // cb
            if (typeof self.click === "function") {
                self.click(layerNodeId);
            }
        });

        this.mountDom.addEventListener("dragstart", function (e) {
            var layer = e.target,
                layerNodeId = layer.getAttribute("data-id");

            e.dataTransfer.effectAllowed = "move";

            self.draggingNode = self.map.get(layerNodeId);

            self.__selectNode(layerNodeId); // set again
            if (self.multiSelect) {
                e.currentTarget.querySelectorAll("layer");
                e.currentTarget.querySelectorAll(".layer.selected").forEach(function (dom) {
                    if (dom !== e.target) {
                        dom.classList.remove("selected");
                    }
                });
            }

            // cb
            if (typeof self.dragStart === "function") {
                self.dragStart(e, layerNodeId);
            }
        });

        this.mountDom.addEventListener("dragleave", function (e) {
            var layer = e.target,
                layerNodeId = layer.getAttribute("data-id");

            layer.parentNode.classList.remove("over");
            layer.classList.remove("show-top-line");

            if (self.dropTarget.id === layerNodeId) {
                self.dropTarget = null;
            }

            // cb
            if (typeof self.dragLeave === "function") {
                self.dragLeave(e, layerNodeId);
            }
        });

        this.mountDom.addEventListener("drop", function (e) {
            var layer = e.target,
                layerNodeId = layer.getAttribute("data-id");

            // node.data maybe html
            if (layerNodeId === null) {
                layer = layer.closest(".layer");

                layerNodeId = layer.getAttribute("data-id");
            }

            if (typeof self.beforeDrop === "function") {
                self.beforeDrop(self.draggingNode.id, self.dropTarget.id, self.dropTarget.type).then(function () {

                    // be ware for multiple trees were created; if target is holder, null === null
                    if (self.dropTarget.id === layerNodeId && self.draggingNode) {
                        self.__modifyTreeLevel(self.draggingNode, self.map.get(self.dropTarget.id), self.dropTarget.type);
                    }

                    // cb
                    if (typeof self.drop === "function") {
                        self.drop(self.draggingNode.id, self.dropTarget.id, self.dropTarget.type);
                    }
                });
            } else {

                // be ware for multiple trees were created; if target is holder, null === null
                if (self.dropTarget.id === layerNodeId && self.draggingNode) {
                    self.__modifyTreeLevel(self.draggingNode, self.map.get(self.dropTarget.id), self.dropTarget.type);
                }

                // cb
                if (typeof self.drop === "function") {
                    self.drop(self.draggingNode.id, self.dropTarget.id, self.dropTarget.type);
                }
            }
        }, false);

        this.mountDom.addEventListener("dragend", function (e) {
            self.mountDom.querySelectorAll(".layer-box.over").forEach(function (dom) {
                dom.classList.remove("over");
            });

            self.mountDom.querySelectorAll(".layer.show-top-line").forEach(function (dom) {
                dom.classList.remove("show-top-line");
            });

            // cb
            if (typeof self.dragEnd === "function") {
                self.dragEnd(e, self.draggingNode.id);
            }
        }, false);

        this.mountDom.addEventListener("dragover", function (e) {
            e.preventDefault();

            var layer = e.target,
                layerNodeId = layer.getAttribute("data-id");

            // node.data maybe html
            if (layerNodeId === null) {
                layer = layer.closest(".layer");

                layerNodeId = layer.getAttribute("data-id");
            }

            var rect = layer.getBoundingClientRect(),
                mouse = e.clientY - rect.top;

            // holder only has top line
            if (layerNodeId && mouse > layerHeight / 3 && mouse <= layerHeight) {
                // layer show over

                layer.parentNode.classList.add("over");
                layer.classList.remove("show-top-line");

                self.dropTarget = {
                    id: layerNodeId,
                    type: moveTypes.in
                };
            } else {
                // layer show top line
                layer.classList.add("show-top-line");
                layer.parentNode.classList.remove("over");

                self.dropTarget = {
                    id: layerNodeId,
                    type: moveTypes.upon
                };
            }

            // cb
            if (typeof self.dragOver === "function") {
                self.dragOver(e, self.draggingNode.id, self.dropTarget.id, self.dropTarget.type);
            }
        }, false);
    }

    Tree.prototype.init = function (options) {
        // options
        this.id = "draggable-tree-" + guid();
        this.mountDom = options.mountDom instanceof HTMLElement ? options.mountDom : document.querySelector(options.mountDom);
        this.rootList = options.list || options.rootList || [];
        this.map = options.map instanceof Map ? new Map(options.map) : new Map();
        this.multiSelect = options.multiSelect || false;

        // events
        this.click = options.click;
        this.dragStart = options.dragStart;
        this.dragOver = options.dragOver;
        this.dragLeave = options.dragLeave;
        this.dragEnd = options.dragEnd;
        this.drop = options.drop;
        this.changed = options.changed;
        this.beforeDrop = options.beforeDrop;

        // private
        this.topParent = "Root";
        this.draggingNode = null;
        this.dropTarget = null;
        this.selectingIdSet = new Set();
        this.hasHolder = false;
    };

    Tree.prototype.__check = function () {
        var passed = true,
            info = {
            key: null,
            expecting: null,
            received: null
        };

        for (var i in this) {
            if (passed === false) {
                break;
            }
            if (this.hasOwnProperty(i)) {
                if (i === "mountDom") {
                    passed = this[i] instanceof HTMLElement;

                    info.expecting = "HTMLElement or a selector";
                }

                if (["click", "drop", "dragStart", "dragOver", "dragLeave", "dragEnd", "changed", "beforeDrop"].indexOf(i) !== -1 && this[i] !== undefined) {
                    passed = typeof this[i] === "function";

                    info.expecting = "function";
                }

                // if(i === "beforeDrop") {
                //     passed = this[i] instanceof Promise;
                //
                //     info.expecting = "promise";
                // }

                if (!passed) {
                    info.key = i;
                    info.received = _typeof(this[i]);
                }
            }
        }

        if (!passed) {

            consoleError("invalid option: " + info.key + ", expecting " + info.expecting + ", received " + info.received);
        }

        return passed;
    };

    Tree.prototype.__getNodeDomById = function (id) {
        var specificTarget = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        switch (specificTarget) {
            case "children":
                return this.mountDom.querySelector("div[data-id=\"" + id + "\"]").nextElementSibling;

            case "box":
                return this.mountDom.querySelector("div[data-id=\"" + id + "\"]").parentNode;

            case "holder-box":
                return this.mountDom.querySelector('.layer-box.holder');

            default:
                return this.mountDom.querySelector("div[data-id=\"" + id + "\"]");
        }
    };

    Tree.prototype.__selectNode = function (id) {
        if (!this.multiSelect) {
            this.selectingIdSet.clear();
        }

        this.selectingIdSet.add(id);
    };

    Tree.prototype.__createDom = function (node, targetNode) {
        var layer = __createLayer(node);

        if (!targetNode) {
            var holder = this.__getNodeDomById(null, 'holder-box');

            this.mountDom.insertBefore(layer, holder);
        } else {
            var targetDom = this.__getNodeDomById(targetNode.id, "children");

            targetDom.appendChild(layer);
        }

        if (!this.hasHolder) {
            this.__renderHolderLayer();
        }
    };

    Tree.prototype.__renderDom = function () {
        var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.rootList;
        var mountDom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.mountDom;

        if (!mountDom) {
            mountDom = this.mountDom;
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Object.entries(list)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = _slicedToArray(_step.value, 2),
                    id = _step$value[1];

                var node = this.map.get(id);

                var layer = __createLayer(node);

                mountDom.appendChild(layer);
                if (node.children.length > 0) {
                    this.__renderDom(node.children, this.__getNodeDomById(node.id, "children"));
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    };

    Tree.prototype.__renderHolderLayer = function () {
        if (this.hasHolder) {
            return;
        }

        var holderLayer = document.createElement('div'),
            layerContent = document.createElement('div');

        holderLayer.classList.add('layer-box', 'holder');

        layerContent.classList.add("layer");
        layerContent.style.height = layerHeight + "px";

        holderLayer.appendChild(layerContent);
        this.mountDom.appendChild(holderLayer);

        this.hasHolder = true;
    };

    Tree.prototype.__getNodeById = function (id) {
        return this.map.get(id);
    };

    Tree.prototype.__modifyTreeLevel = function (moveNode, targetNode, moveType) {
        if (!targetNode) {
            console.log('to-last');

            var moveNodeParentNode = moveNode.parentId === this.topParent ? null : this.map.get(moveNode.parentId),
                moveNodeBoxDom = this.__getNodeDomById(moveNode.id, "box"),
                targetNodeDom = this.__getNodeDomById(null, "holder-box");

            deleteByValueFromArray(moveNode.id, moveNodeParentNode ? moveNodeParentNode.children : this.rootList);

            moveNode.parentId = 'Root';
            this.rootList.push(moveNode.id);

            // dom
            this.mountDom.insertBefore(moveNodeBoxDom, targetNodeDom);
        } else {
            var _moveNodeParentNode = moveNode.parentId === this.topParent ? null : this.map.get(moveNode.parentId),
                targetNodeParentNode = targetNode.parentId === this.topParent ? null : this.map.get(targetNode.parentId);

            var _moveNodeBoxDom = this.__getNodeDomById(moveNode.id, "box"),
                targetDom = this.__getNodeDomById(targetNode.id);

            if (!_moveNodeBoxDom || !targetDom) {
                consoleError("invalid editing dom");
            }

            if (_moveNodeBoxDom.contains(targetDom)) {
                consoleError("you are moving a dom into it's child node");
                return;
            }

            if (moveType === moveTypes.in) {
                // data
                deleteByValueFromArray(moveNode.id, _moveNodeParentNode ? _moveNodeParentNode.children : this.rootList);

                moveNode.parentId = targetNode.id;

                targetNode.children = targetNode.children.concat([moveNode.id]);

                // dom
                targetDom.nextElementSibling.appendChild(_moveNodeBoxDom);
            }

            if (moveType === moveTypes.upon) {
                // data
                if (moveNode.parentId !== targetNode.parentId && _moveNodeParentNode) {
                    // moveNodeParentNode.children.deleteByValue(moveNode.id);

                    deleteByValueFromArray(moveNode.id, _moveNodeParentNode.children);
                } else {
                    // this.rootList.deleteByValue(moveNode.id);

                    deleteByValueFromArray(moveNode.id, this.rootList);
                }

                moveNode.parentId = targetNode.parentId;

                if (targetNodeParentNode) {
                    insertToArrayBeforeValue(targetNode.id, moveNode.id, targetNodeParentNode.children);
                } else {
                    // this.rootList.insertBeforeValue(targetNode.id, moveNode.id);
                    insertToArrayBeforeValue(targetNode.id, moveNode.id, this.rootList);
                }

                // dom
                targetDom.parentNode.parentNode.insertBefore(_moveNodeBoxDom, targetDom.parentNode);
            }
        }

        // cb
        if (typeof this.changed === "function") {
            this.changed("move node", moveNode.id, targetNode ? targetNode.id : 'holder', moveType);
        }
    };

    Tree.prototype.createNode = function () {
        var parentId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.topParent;
        var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var nodeId = node.id || "draggable-tree-node-" + guid(),
            targetNode = void 0;

        if (this.map.has(nodeId)) {
            consoleError(nodeId + "has been set");
        }

        parentId = parentId || this.topParent;

        if (parentId === this.topParent) {
            this.rootList.push(nodeId);

            targetNode = null;
        } else {
            targetNode = this.map.get(parentId);

            if (!targetNode) {
                consoleError("invalid parentId: ", parentId);
                return;
            }

            targetNode.children.push(nodeId);
        }

        node.id = nodeId;
        node.parentId = parentId;
        node.children = node.children || [];

        this.map.set(nodeId, node);

        this.__createDom(node, targetNode);

        // cb
        if (typeof this.changed === "function") {
            this.changed("create node", node.id);
        }
    };

    Tree.prototype.deleteNode = function () {
        var _this = this;

        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


        // deleting selected nodes
        if (!id && this.selectingIdSet.size > 0) {
            // delete all selecting node
            this.selectingIdSet.forEach(function (id) {
                _this.deleteNode(id);
            });

            return;
        }

        var node = this.__getNodeById(id);

        if (node) {
            var parentList = void 0;
            if (node.parentId === this.topParent) {
                parentList = this.rootList;
            } else {
                var parentNode = this.__getNodeById(node.parentId);

                parentList = parentNode ? parentNode.children : null;
            }

            if (node.children.length > 0) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = node.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _id = _step2.value;

                        this.deleteNode(_id);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }

            if (!parentList) {
                consoleError("parent node not found");
            } else {

                deleteByValueFromArray(id, parentList);
                this.map.delete(id);

                //dom
                var nodeDom = this.__getNodeDomById(id, "box");
                nodeDom.parentNode.removeChild(nodeDom);
            }
        }
    };

    Tree.prototype.remove = function () {
        var _this2 = this;

        // if(this.selectingIdSet.size > 0) {
        var promises = [];

        this.selectingIdSet.forEach(function (id) {
            promises.push(new Promise(function (resolve, reject) {
                try {

                    _this2.deleteNode(id);
                    resolve(id);
                } catch (e) {
                    reject(e);
                }
            }).then(function () {
                _this2.selectingIdSet.delete(id);
            }));
        });

        return Promise.all(promises);
        // }
    };

    Tree.prototype.clearSelected = function () {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = this.selectingIdSet[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var id = _step3.value;

                var layerDom = this.__getNodeDomById(id);

                if (layerDom) {
                    layerDom.classList.remove("selected");
                }
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        this.selectingIdSet.clear();
    };

    Tree.prototype.removeAll = function () {
        var _this3 = this;

        this.rootList = [];
        this.map = new Map();
        this.hasHolder = false;

        return new Promise(function (resolve, reject) {
            try {
                while (_this3.mountDom.hasChildNodes()) {
                    _this3.mountDom.removeChild(_this3.mountDom.lastChild);
                }

                resolve();
            } catch (e) {
                consoleError("tree removeAll failed: ", e);

                reject(e);
            }
        });
    };

    Tree.prototype.render = function (list, map) {
        var _this4 = this;

        this.__renderDom();
        setTimeout(function () {
            _this4.__renderHolderLayer();
        }, 1);
    };

    Tree.prototype.updateOptions = function (options) {
        // options
        this.multiSelect = typeof options.multiSelect === 'boolean' ? options.multiSelect : this.multiSelect;

        // events
        this.click = typeof options.click === 'function' ? options.click : this.click;
        this.dragStart = typeof options.dragStart === 'function' ? options.dragStart : this.dragStart;
        this.dragOver = typeof options.dragOver === 'function' ? options.dragOver : this.dragOver;
        this.dragLeave = typeof options.dragLeave === 'function' ? options.dragLeave : this.dragLeave;
        this.dragEnd = typeof options.dragEnd === 'function' ? options.dragEnd : this.dragEnd;
        this.drop = typeof options.drop === 'function' ? options.drop : this.drop;
        this.changed = typeof options.changed === 'function' ? options.changed : this.changed;
        this.beforeDrop = typeof options.beforeDrop === 'function' ? options.beforeDrop : this.beforeDrop;
    };

    return {
        create: function create(options) {
            var tree = void 0;
            tree = new Tree(options);

            var operator = {
                getRootList: function getRootList() {
                    return tree.rootList;
                },

                getMap: function getMap() {
                    return tree.map;
                },

                createNode: function createNode() {
                    var parentId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : tree.topParent;
                    var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                    tree.createNode(parentId, node);

                    return this;
                },
                deleteNode: function deleteNode() {
                    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

                    tree.deleteNode(id);

                    return this;
                },

                removeAll: function removeAll() {
                    tree.removeAll().then(function () {
                        if (typeof tree.changed === "function") {

                            // console.log(tree);

                            tree.changed("empty nodes");
                        }
                    });

                    return this;
                },

                remove: function remove() {
                    var selectedNodeIds = Array.from(tree.selectingIdSet.values());

                    tree.remove().then(function () {
                        // cb
                        if (typeof tree.changed === "function") {
                            tree.changed("delete node", selectedNodeIds);
                        }
                    });
                    // tree.deleteNode();

                    return this;
                },

                clearSelected: function clearSelected() {
                    tree.clearSelected();

                    return this;
                },
                toggleMultiSelect: function toggleMultiSelect() {
                    if (tree.multiSelect) {
                        tree.clearSelected();
                    }

                    tree.multiSelect = !tree.multiSelect;
                    return this;
                },

                render: function render(rootList, map) {
                    tree.removeAll().then(function () {
                        tree.rootList = rootList instanceof Array ? rootList : [];
                        tree.map = map instanceof Map ? new Map(map) : new Map();

                        if (tree.map.size > 0) {
                            tree.render(rootList, map);
                        }
                    });

                    return this;
                },

                setEvents: function setEvents(options) {
                    tree.updateOptions(options);

                    if (!tree.__check()) {
                        return this;
                    }

                    return this;
                }
            };

            trees.set(tree.id, {
                tree: tree,
                operator: operator
            });

            return operator;
        },

        getTrees: function getTrees() {
            return Array.from(trees.values()).map(function (tree) {
                return tree.operator;
            });
        }
    };
}();

exports.default = DraggableTree;

/***/ })
/******/ ]);
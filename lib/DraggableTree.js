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
/******/ 	__webpack_require__.p = "";
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



__webpack_require__(3);

module.exports = __webpack_require__(2).default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by azlar on 23/09/2017.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});
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
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
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

    function __createLayer(node) {
        var layerBox = document.createElement("div"),
            layerContent = document.createElement("div"),
            childLayers = document.createElement("div");

        layerBox.classList.add("layer-box");

        layerContent.classList.add("layer");
        layerContent.setAttribute("draggable", "true");
        layerContent.setAttribute("data-id", node.id);
        layerContent.innerHTML = node.data || node.id;

        childLayers.classList.add("child-layers");

        layerBox.appendChild(layerContent);
        layerBox.appendChild(childLayers);

        return layerBox;
    }

    //main
    function Tree(options) {
        this.id = "draggable-tree-" + guid();
        this.mountDom = document.querySelector(options.mountDom);
        this.rootList = options.list || options.rootList || [];
        this.map = options.map || new Map();

        this.topParent = "Root";
        this.draggingNode = null;
        this.dropTarget = null;
        this.selectedNodeId = null;

        this.__renderDom();

        var self = this;

        this.mountDom.addEventListener('mousedown', function (e) {
            var layer = e.target,
                layerNodeId = layer.getAttribute("data-id");

            if (layer.classList.contains("selected")) {
                return;
            }
            e.currentTarget.querySelectorAll("layer");

            e.currentTarget.querySelectorAll(".layer.selected").forEach(function (dom) {
                dom.classList.remove("selected");
            });

            layer.classList.add("selected");

            self.selectedNodeId = layerNodeId;
        });

        this.mountDom.addEventListener('dragstart', function (e) {
            var layer = e.target;

            e.dataTransfer.effectAllowed = 'move';

            self.draggingNode = self.map.get(layer.getAttribute("data-id"));
        });

        this.mountDom.addEventListener('dragleave', function (e) {
            var layer = e.target,
                layerNodeId = layer.getAttribute("data-id");

            layer.parentNode.classList.remove("over");
            layer.classList.remove("show-top-line");

            if (self.dropTarget.id === layerNodeId) {
                self.dropTarget = null;
            }
        });

        this.mountDom.addEventListener('drop', function (e) {
            var layer = e.target,
                layerNodeId = layer.getAttribute("data-id");

            //be ware for multiple trees were created
            if (self.dropTarget.id === layerNodeId) {
                self.__modifyTreeLevel(self.draggingNode, self.map.get(self.dropTarget.id), self.dropTarget.type);
            }
        }, false);

        this.mountDom.addEventListener("dragend", function (e) {
            console.log("end", self.mountDom.querySelectorAll(".layer-box.over"));

            self.mountDom.querySelectorAll(".layer-box.over").forEach(function (dom) {
                dom.classList.remove("over");
            });

            self.mountDom.querySelectorAll(".layer.show-top-line").forEach(function (dom) {
                dom.classList.remove("show-top-line");
            });
        }, false);

        this.mountDom.addEventListener("dragover", function (e) {
            e.preventDefault();

            var layer = e.target,
                layerNodeId = layer.getAttribute("data-id");

            var rect = layer.getBoundingClientRect(),
                mouse = e.clientY - rect.top;

            if (mouse > layerHeight / 3 && mouse <= layerHeight) {
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
        }, false);
    }

    Tree.prototype.__getNodeDomById = function (id) {
        var specificTarget = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        switch (specificTarget) {
            case 'children':
                return this.mountDom.querySelector('div[data-id="' + id + '"]').nextElementSibling;

            case "box":
                return this.mountDom.querySelector('div[data-id="' + id + '"]').parentNode;

            default:
                return this.mountDom.querySelector('div[data-id="' + id + '"]');
        }
    };

    Tree.prototype.__createDom = function (node, targetNode) {
        var layer = __createLayer(node);

        var targetDom = targetNode ? this.__getNodeDomById(targetNode.id, "children") : this.mountDom;

        targetDom.appendChild(layer);
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
            for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var id = _step.value;

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

    Tree.prototype.__getNodeById = function (id) {
        return this.map.get(id);
    };

    Tree.prototype.__modifyTreeLevel = function (moveNode, targetNode, moveType) {
        var moveNodeParentNode = moveNode.parentId === this.topParent ? null : this.map.get(moveNode.parentId),
            targetNodeParentNode = targetNode.parentId === this.topParent ? null : this.map.get(targetNode.parentId);

        var moveNodeBoxDom = this.__getNodeDomById(moveNode.id, "box"),
            targetDom = this.__getNodeDomById(targetNode.id);

        if (!moveNodeBoxDom || !targetDom) {
            consoleError("invalid editing dom");
        }

        if (moveNodeBoxDom.contains(targetDom)) {
            consoleError("you are moving a dom into it's child node");
            return;
        }

        if (moveType === moveTypes.in) {
            // data
            if (moveNodeParentNode) {
                // moveNodeParentNode.children.deleteByValue(moveNode.id);

                deleteByValueFromArray(moveNode.id, moveNodeParentNode.children);
            } else {
                // this.rootList.deleteByValue(moveNode.id);

                deleteByValueFromArray(moveNode.id, this.rootList);
            }

            moveNode.parentId = targetNode.id;

            targetNode.children = targetNode.children.concat([moveNode.id]);

            // dom
            targetDom.nextElementSibling.appendChild(moveNodeBoxDom);
        }

        if (moveType === moveTypes.upon) {
            // data
            if (moveNode.parentId !== targetNode.parentId && moveNodeParentNode) {
                // moveNodeParentNode.children.deleteByValue(moveNode.id);

                deleteByValueFromArray(moveNode.id, moveNodeParentNode.children);
            } else {
                // this.rootList.deleteByValue(moveNode.id);

                deleteByValueFromArray(moveNode.id, this.rootList);
            }

            moveNode.parentId = targetNode.parentId;

            if (targetNodeParentNode) {
                // targetNodeParentNode.children.insertBeforeValue(targetNode.id, moveNode.id);

                insertToArrayBeforeValue(targetNode.id, moveNode.id, targetNodeParentNode.children);
            } else {
                // this.rootList.insertBeforeValue(targetNode.id, moveNode.id);

                insertToArrayBeforeValue(targetNode.id, moveNode.id, this.rootList);
            }

            // dom
            targetDom.parentNode.parentNode.insertBefore(moveNodeBoxDom, targetDom.parentNode);
        }

        sessionStorage.setItem("draggable-tree-data", JSON.stringify({
            rootList: this.rootList,
            map: Array.from(this.map.entries())
        }));
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
    };

    Tree.prototype.deleteNode = function (id) {
        id = id || this.selectedNodeId;

        var node = this.__getNodeById(id);

        if (node) {
            var parentList = void 0;
            if (node.parentId === this.topParent) {
                parentList = this.rootList;
            } else {
                var parentNode = this.__getNodeById(node.parentId);

                parentList = parentNode ? parentNode.children : null;
            }

            if (!parentList) {
                consoleError("parent node not found");

                return;
            }

            deleteByValueFromArray(id, parentList);
            this.map.delete(id);

            //dom
            var nodeDom = this.__getNodeDomById(id, "box");
            nodeDom.parentNode.removeChild(nodeDom);
        }
    };

    return {
        create: function create(options) {
            var tree = new Tree(options);

            trees.set(tree.id, tree);

            return {
                rootList: tree.rootList,
                map: tree.map,
                createNode: function createNode() {
                    var parentId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : tree.topParent;
                    var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                    tree.createNode(parentId, node);
                },
                deleteNode: function deleteNode() {
                    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

                    tree.deleteNode(id);
                }
            };
        }
    };
}();

exports.default = DraggableTree;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, "\n.layers {\n    width: 500px;\n    background-color: rgba(111, 111, 111, .1);\n    opacity: 1;\n    transition: transform .3s;\n    display: flex;\n    flex-direction: column;\n    box-shadow: 1px 0 1px rgba(0,0,0,.2);\n}\n\n.layers .layer {\n    position: relative;\n    clear: both;\n    overflow: hidden;\n    height: 50px;\n    border-top: 1px solid transparent;\n    border-bottom: 1px solid rgba(0,0,0, .12);\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n\n    padding: 0 10px;\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: center;\n}\n\n.layers .child-layers {\n    /*display: none;*/\n    box-sizing: border-box;\n    padding-left: 9px;\n    border-left: 2px solid transparent;\n    clear: both;\n    -webkit-transition: border-left-color .3s ease-out;\n    -o-transition: border-left-color .3s ease-out;\n    transition: border-left-color .3s ease-out;\n}\n\n.layers .layer.selected,\n.layers .layer.selected:hover {\n    background-color: rgba(0,0,255, .4);\n    opacity: 1;\n    text-decoration: none;\n    color: #fff;\n}\n\n.layers .layer:hover {\n    background-color: rgba(0,0,255, .2);\n}\n\n.layers .layer-box.over {\n    background-color: rgba(45,48,52,.3);\n}\n\n.layers .layer.show-top-line {\n    border-top: 1px solid #1E96FD;\n}", ""]);

// exports


/***/ }),
/* 5 */
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
/* 6 */
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

var	fixUrls = __webpack_require__(7);

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
/* 7 */
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


/***/ })
/******/ ]);
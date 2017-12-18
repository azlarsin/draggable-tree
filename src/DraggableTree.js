/**
 * Created by azlar on 23/09/2017.
 */

"use strict";

const DraggableTree = (function () {
    const layerHeight = 50;

    const moveTypes = {
        in: 1,
        upon: 2
    };

    const trees = new Map();


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
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
            s4() + "-" + s4() + s4() + s4();
    }
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000);
    }

    function consoleError(info) {
        console.error(info);
    }

    function deleteByValueFromArray(value, arr) {
        if(Object.prototype.toString.call(arr) !== "[object Array]") {
            return arr;
        }

        let targetIndex = arr.findIndex((v) => v === value);

        if(targetIndex !== -1) {
            arr.splice(targetIndex, 1);
        }

        return arr;
    }

    function insertToArrayBeforeValue(target, value, arr) {
        if(Object.prototype.toString.call(arr) !== "[object Array]") {
            return arr;
        }

        let targetIndex = arr.findIndex((v) => {
            return v === target;
        });

        arr.splice(targetIndex, 0, value);

        return arr;
    }

    // check type
    function is(v, type) {
        let t = Object.prototype.toString.call(v).split(' ')[1].slice(0, -1);
        return !type ? t : t.toLowerCase() === type.toLowerCase();
    }

    function __createLayer(node) {
        let layerBox = document.createElement("div"),
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

/*
    function __checkOptions(options) {
        let passed = true,
            info = {
                key: null,
                expecting: null,
                received: null
            };

        options.mountDom = options.mountDom instanceof HTMLElement ? options.mountDom : document.querySelector(options.mountDom);

        for(let i in options) {
            if(passed === false) {
                break;
            }
            if(options.hasOwnProperty(i)) {
                if(i === "mountDom") {
                    passed = options[i] instanceof HTMLElement;

                    info.expecting = "HTMLElement or a selector";
                }

                if(["click", "drop", "dragStart", "dragOver", "dragLeave", "dragEnd", "changed"].indexOf(i) !== -1 && options[i] !== undefined) {
                    passed = typeof options[i] === "function";

                    info.expecting = "Function";
                }

                if(i === 'list' || i === 'rootList') {
                    passed = is(options[i], 'array');

                    info.expecting = 'Array';
                }

                if(i === 'map') {
                    passed = is(options[i], 'map');

                    info.expecting = 'Map';
                }

                if(i === 'multiSelect') {
                    passed = is(options[i], 'boolean');

                    info.expecting = 'Boolean';
                }

                if(!passed) {
                    info.key = i;
                    info.received = typeof options[i];
                }
            }
        }

        if(!passed) {
            consoleError(`invalid option: ${info.key}, expecting ${info.expecting}, received ${info.received}`);
        }

        return passed;
    }
*/


    // main
    function Tree(options) {
        // initial
        this.init(options);

        // initial check after defined property
        if(!this.__check()) {
            return this;
        }

        this.mountDom.classList.add("layers");
        this.render();

        let self = this;

        // bind events for mountDom
        this.mountDom.addEventListener("mousedown", function (e) {
            let layer = e.target,
                layerNodeId = layer.getAttribute("data-id");

            if(!layerNodeId) {
                return ;
            }

            self.__selectNode(layerNodeId);
            if(layer.classList.contains("selected")) {
                // cb
                if(typeof self.click === "function") {
                    self.click(e, layerNodeId);
                }

                return ;
            }

            if(!self.multiSelect) {
                e.currentTarget.querySelectorAll("layer");
                e.currentTarget.querySelectorAll(".layer.selected").forEach(dom => {
                    dom.classList.remove("selected");
                });
            }

            layer.classList.add("selected");

            // cb
            if(typeof self.click === "function") {
                self.click(layerNodeId);
            }
        });

        this.mountDom.addEventListener("dragstart", function (e) {
            let layer = e.target,
                layerNodeId = layer.getAttribute("data-id");

            e.dataTransfer.effectAllowed = "move";

            e.dataTransfer.setData('text/html', null); // for firefox dragging issue;when set data to 'text/html', it will prevent jumping to another page

            self.draggingNode = self.map.get(layerNodeId);

            self.__selectNode(layerNodeId);  // set again
            if(self.multiSelect) {
                e.currentTarget.querySelectorAll("layer");
                e.currentTarget.querySelectorAll(".layer.selected").forEach(dom => {
                    if(dom !== e.target) {
                        dom.classList.remove("selected");
                    }
                });
            }

            // cb
            if(typeof self.dragStart === "function") {
                self.dragStart(e, layerNodeId);
            }
        });

        this.mountDom.addEventListener("dragleave", function (e) {
            let layer = e.target,
                layerNodeId = layer.getAttribute("data-id");

            layer.parentNode.classList.remove("over");
            layer.classList.remove("show-top-line");

            if(self.dropTarget.id === layerNodeId) {
                self.dropTarget = null;
            }

            // cb
            if(typeof self.dragLeave === "function") {
                self.dragLeave(e, layerNodeId);
            }
        });

        this.mountDom.addEventListener("drop", function (e) {
            let layer = e.target,
                layerNodeId = layer.getAttribute("data-id");

            // node.data maybe html
            if(layerNodeId === null) {
                layer = layer.closest(".layer");

                layerNodeId = layer.getAttribute("data-id");
            }

            if(typeof self.beforeDrop === "function") {
                self.beforeDrop(self.draggingNode.id, self.dropTarget.id, self.dropTarget.type).then(() => {



                    // be ware for multiple trees were created; if target is holder, null === null
                    if(self.dropTarget.id === layerNodeId && self.draggingNode) {
                        self.__modifyTreeLevel(self.draggingNode, self.map.get(self.dropTarget.id), self.dropTarget.type);
                    }

                    // cb
                    if(typeof self.drop === "function") {
                        self.drop(self.draggingNode.id, self.dropTarget.id, self.dropTarget.type);
                    }
                });

            }else {


                // be ware for multiple trees were created; if target is holder, null === null
                if(self.dropTarget.id === layerNodeId && self.draggingNode) {
                    self.__modifyTreeLevel(self.draggingNode, self.map.get(self.dropTarget.id), self.dropTarget.type);
                }

                // cb
                if(typeof self.drop === "function") {
                    self.drop(self.draggingNode.id, self.dropTarget.id, self.dropTarget.type);
                }
            }
        }, false);


        this.mountDom.addEventListener("dragend", function(e) {
            self.mountDom.querySelectorAll(".layer-box.over").forEach(dom => {
                dom.classList.remove("over");
            });

            self.mountDom.querySelectorAll(".layer.show-top-line").forEach(dom => {
                dom.classList.remove("show-top-line");
            });

            // cb
            if(typeof self.dragEnd === "function") {
                self.dragEnd(e, self.draggingNode.id);
            }
        }, false);

        this.mountDom.addEventListener("dragover", function(e) {
            e.preventDefault();

            let layer = e.target,
                layerNodeId = layer.getAttribute("data-id");

            // node.data maybe html
            if(layerNodeId === null) {
                layer = layer.closest(".layer");

                layerNodeId = layer.getAttribute("data-id");
            }

            let rect = layer.getBoundingClientRect(),
                mouse = e.clientY - rect.top;

            // holder only has top line
            if(layerNodeId && mouse > layerHeight / 3 && mouse <= layerHeight) {
                // layer show over

                layer.parentNode.classList.add("over");
                layer.classList.remove("show-top-line");

                self.dropTarget = {
                    id: layerNodeId,
                    type: moveTypes.in
                }
            }else {
                // layer show top line
                layer.classList.add("show-top-line");
                layer.parentNode.classList.remove("over");

                self.dropTarget = {
                    id: layerNodeId,
                    type: moveTypes.upon
                }
            }

            // cb
            if(typeof self.dragOver === "function") {
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
        let passed = true,
            info = {
                key: null,
                expecting: null,
                received: null
            };

        for(let i in this) {
            if(passed === false) {
                break;
            }
            if(this.hasOwnProperty(i)) {
                if(i === "mountDom") {
                    passed = this[i] instanceof HTMLElement;

                    info.expecting = "HTMLElement or a selector";
                }

                if(["click", "drop", "dragStart", "dragOver", "dragLeave", "dragEnd", "changed", "beforeDrop"].indexOf(i) !== -1 && this[i] !== undefined) {
                    passed = typeof this[i] === "function";

                    info.expecting = "function";
                }

                // if(i === "beforeDrop") {
                //     passed = this[i] instanceof Promise;
                //
                //     info.expecting = "promise";
                // }

                if(!passed) {
                    info.key = i;
                    info.received = typeof this[i];
                }
            }
        }

        if(!passed) {

            consoleError(`invalid option: ${info.key}, expecting ${info.expecting}, received ${info.received}`);
        }

        return passed;
    };

    Tree.prototype.__getNodeDomById = function (id, specificTarget = null) {
        switch (specificTarget) {
            case "children":
                return this.mountDom.querySelector(`div[data-id="${id}"]`).nextElementSibling;

            case "box":
                return this.mountDom.querySelector(`div[data-id="${id}"]`).parentNode;

            case "holder-box":
                return this.mountDom.querySelector('.layer-box.holder');

            default:
                return this.mountDom.querySelector(`div[data-id="${id}"]`);
        }

    };

    Tree.prototype.__selectNode = function (id) {
        if(!this.multiSelect) {
            this.selectingIdSet.clear();
        }

        this.selectingIdSet.add(id);
    };

    Tree.prototype.__createDom = function (node, targetNode) {
        let layer = __createLayer(node);

        if(!targetNode) {
            let holder = this.__getNodeDomById(null, 'holder-box');

            this.mountDom.insertBefore(layer, holder);
        }else {
            let targetDom = this.__getNodeDomById(targetNode.id, "children");

            targetDom.appendChild(layer);
        }

        if(!this.hasHolder) {
            this.__renderHolderLayer();
        }
    };

    Tree.prototype.__renderDom = function (list = this.rootList, mountDom = this.mountDom) {
        if(!mountDom) {
            mountDom = this.mountDom;
        }

        for(let [, id] of Object.entries(list)) {
            let node = this.map.get(id);

            let layer = __createLayer(node);

            mountDom.appendChild(layer);
            if(node.children.length > 0) {
                this.__renderDom(node.children, this.__getNodeDomById(node.id, "children"));
            }
        }
    };

    Tree.prototype.__renderHolderLayer = function () {
        if(this.hasHolder) {
            return ;
        }

        let holderLayer = document.createElement('div'),
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
        if(!targetNode) {
            console.log('to-last');

            let moveNodeParentNode = moveNode.parentId === this.topParent ? null : this.map.get(moveNode.parentId),
                moveNodeBoxDom = this.__getNodeDomById(moveNode.id, "box"),
                targetNodeDom = this.__getNodeDomById(null, "holder-box");

            deleteByValueFromArray(moveNode.id, moveNodeParentNode ? moveNodeParentNode.children : this.rootList);

            moveNode.parentId = 'Root';
            this.rootList.push(moveNode.id);

            // dom
            this.mountDom.insertBefore(moveNodeBoxDom, targetNodeDom);
        }else {
            let moveNodeParentNode = moveNode.parentId === this.topParent ? null : this.map.get(moveNode.parentId),
                targetNodeParentNode = targetNode.parentId === this.topParent ? null : this.map.get(targetNode.parentId);

            let moveNodeBoxDom = this.__getNodeDomById(moveNode.id, "box"),
                targetDom = this.__getNodeDomById(targetNode.id);

            if(!moveNodeBoxDom || !targetDom) {
                consoleError("invalid editing dom");
            }

            if(moveNodeBoxDom.contains(targetDom)) {
                consoleError("you are moving a dom into it's child node");
                return ;
            }

            if(moveType === moveTypes.in) {
                // data
                deleteByValueFromArray(moveNode.id, moveNodeParentNode ? moveNodeParentNode.children : this.rootList);

                moveNode.parentId = targetNode.id;

                targetNode.children = targetNode.children.concat([moveNode.id]);

                // dom
                targetDom.nextElementSibling.appendChild(moveNodeBoxDom);
            }

            if(moveType === moveTypes.upon) {
                // data
                if(moveNode.parentId !== targetNode.parentId && moveNodeParentNode) {
                    // moveNodeParentNode.children.deleteByValue(moveNode.id);

                    deleteByValueFromArray(moveNode.id, moveNodeParentNode.children);
                }else {
                    // this.rootList.deleteByValue(moveNode.id);

                    deleteByValueFromArray(moveNode.id, this.rootList);
                }

                moveNode.parentId = targetNode.parentId;

                if(targetNodeParentNode) {
                    insertToArrayBeforeValue(targetNode.id, moveNode.id, targetNodeParentNode.children);
                }else {
                    // this.rootList.insertBeforeValue(targetNode.id, moveNode.id);
                    insertToArrayBeforeValue(targetNode.id, moveNode.id, this.rootList);
                }

                // dom
                targetDom.parentNode.parentNode.insertBefore(moveNodeBoxDom, targetDom.parentNode);
            }
        }

        // cb
        if(typeof this.changed === "function") {
            this.changed("move node", moveNode.id, targetNode ? targetNode.id : 'holder', moveType);
        }
    };

    Tree.prototype.createNode = function (parentId = this.topParent, node = {}) {
        let nodeId = node.id || ("draggable-tree-node-" + guid()),
            targetNode;

        if(this.map.has(nodeId)) {
            consoleError(nodeId + " has been set");
            return ;
        }

        parentId = parentId || this.topParent;

        if(parentId === this.topParent) {
            this.rootList.push(nodeId);

            targetNode = null;
        }else {
            targetNode = this.map.get(parentId);

            if(!targetNode) {
                consoleError("invalid parentId: ", parentId);
                return ;
            }

            targetNode.children.push(nodeId);
        }

        node.id = nodeId;
        node.parentId = parentId;
        node.children = node.children || [];

        this.map.set(nodeId, node);

        this.__createDom(node, targetNode);

        // cb
        if(typeof this.changed === "function") {
            this.changed("create node", node.id);
        }
    };

    Tree.prototype.deleteNode = function (id = null) {

        // deleting selected nodes
        if(!id && this.selectingIdSet.size > 0) {
            // delete all selecting node
            this.selectingIdSet.forEach(id => {
                this.deleteNode(id);
            });

            return ;
        }

        let node = this.__getNodeById(id);

        if(node) {
            let parentList;
            if(node.parentId === this.topParent){
                parentList = this.rootList;
            }else {
                let parentNode = this.__getNodeById(node.parentId);

                parentList = parentNode ? parentNode.children : null;
            }

            if(node.children.length > 0) {
                for (let id of node.children) {
                    this.deleteNode(id);
                }
            }

            if(!parentList) {
                consoleError("parent node not found");
            }else {

                deleteByValueFromArray(id, parentList);
                this.map.delete(id);

                //dom
                let nodeDom = this.__getNodeDomById(id, "box");
                nodeDom.parentNode.removeChild(nodeDom);
            }
        }
    };

    Tree.prototype.remove = function () {
        // if(this.selectingIdSet.size > 0) {
        let promises = [];

        this.selectingIdSet.forEach(id => {
            promises.push(
                new Promise((resolve, reject) => {
                    try {

                        this.deleteNode(id);
                        resolve(id);
                    }catch (e) {
                        reject(e);
                    }
                }).then(() => {
                    this.selectingIdSet.delete(id);
                })
            );
        });

        return Promise.all(promises);
        // }
    };

    Tree.prototype.clearSelected = function () {
        for(let id of this.selectingIdSet) {
            let layerDom = this.__getNodeDomById(id);

            if(layerDom) {
                layerDom.classList.remove("selected");
            }
        }

        this.selectingIdSet.clear();
    };

    Tree.prototype.removeAll = function () {
        this.rootList = [];
        this.map = new Map();
        this.hasHolder = false;

        return new Promise((resolve, reject) => {
            try {
                while (this.mountDom.hasChildNodes()) {
                    this.mountDom.removeChild(this.mountDom.lastChild);
                }

                resolve();
            }catch (e) {
                consoleError("tree removeAll failed: ", e);

                reject(e)
            }
        });
    };

    Tree.prototype.render = function (list, map) {
        this.__renderDom();
        setTimeout(() => {
            this.__renderHolderLayer();
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
        create: options => {
            let tree;
            tree = new Tree(options);

            let operator = {
                getRootList: function() {
                    return tree.rootList
                },

                getMap: function () {
                    return tree.map
                },

                createNode: function(parentId = tree.topParent, node = {}) {
                    tree.createNode(parentId, node);

                    return this;
                },
                deleteNode: function(id = null) {
                    tree.deleteNode(id);

                    return this;
                },

                removeAll: function() {
                    tree.removeAll().then(() => {
                        if(typeof tree.changed === "function") {

                            // console.log(tree);

                            tree.changed("empty nodes");
                        }
                    });

                    return this;
                },

                remove: function () {
                    let selectedNodeIds = Array.from(tree.selectingIdSet.values());

                    tree.remove().then(() => {
                        // cb
                        if(typeof tree.changed === "function") {
                            tree.changed("delete node", selectedNodeIds);
                        }
                    });
                    // tree.deleteNode();

                    return this;
                },

                clearSelected: function() {
                    tree.clearSelected();

                    return this;
                },
                toggleMultiSelect: function () {
                    if(tree.multiSelect) {
                        tree.clearSelected();
                    }

                    tree.multiSelect = !tree.multiSelect;
                    return this;
                },

                render: function(rootList, map) {
                    tree.removeAll().then(() => {
                        tree.rootList = rootList instanceof Array ? rootList : [];
                        tree.map = map instanceof Map ? new Map(map) : new Map();

                        if(tree.map.size > 0) {
                            tree.render(rootList, map);
                        }
                    });

                    return this;
                },

                setEvents: function (options) {
                    tree.updateOptions(options);

                    if(!tree.__check()) {
                        return this;
                    }

                    return this;
                }
            };

            trees.set(tree.id, {
                tree,
                operator
            });

            return operator;
        },

        getTrees: function () {
            return Array.from(trees.values()).map(tree => {
                return tree.operator;
            });
        }
    }
}());

export default DraggableTree;
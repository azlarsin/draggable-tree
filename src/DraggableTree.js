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
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
    }

    function consoleError(info) {
        console.error(info);
    }

    function deleteByValueFromArray(value, arr) {
        if(Object.prototype.toString.call(arr) !== "[object Array]") {
            return arr;
        }

        let targetIndex = arr.findIndex(v => {
            return v === value;
        });

        if(targetIndex !== -1) {
            arr.splice(targetIndex, 1)
        }

        return arr;
    }

    function insertToArrayBeforeValue(target, value, arr) {
        if(Object.prototype.toString.call(arr) !== "[object Array]") {
            return arr;
        }

        let targetIndex = arr.findIndex(v => {
            return v === target;
        });

        arr.splice(targetIndex, 0, value);

        return arr;
    }


    function __createLayer(node) {
        let layerBox = document.createElement("div"),
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


        let self = this;

        this.mountDom.addEventListener('mousedown', function (e) {
            let layer = e.target,
                layerNodeId = layer.getAttribute("data-id");

            if(layer.classList.contains("selected")) {
                return ;
            }
            e.currentTarget.querySelectorAll("layer");

            e.currentTarget.querySelectorAll(".layer.selected").forEach(dom => {
                dom.classList.remove("selected");
            });

            layer.classList.add("selected");

            self.selectedNodeId = layerNodeId;
        });

        this.mountDom.addEventListener('dragstart', function (e) {
            let layer = e.target;

            e.dataTransfer.effectAllowed = 'move';

            self.draggingNode = self.map.get(layer.getAttribute("data-id"));
        });

        this.mountDom.addEventListener('dragleave', function (e) {
            let layer = e.target,
                layerNodeId = layer.getAttribute("data-id");

            layer.parentNode.classList.remove("over");
            layer.classList.remove("show-top-line");

            if(self.dropTarget.id === layerNodeId) {
                self.dropTarget = null;
            }
        });

        this.mountDom.addEventListener('drop', function (e) {
            let layer = e.target,
                layerNodeId = layer.getAttribute("data-id");

            //be ware for multiple trees were created
            if(self.dropTarget.id === layerNodeId) {
                self.__modifyTreeLevel(self.draggingNode, self.map.get(self.dropTarget.id), self.dropTarget.type);
            }

        }, false);


        this.mountDom.addEventListener("dragend", function(e) {
            console.log("end", self.mountDom.querySelectorAll(".layer-box.over"));

            self.mountDom.querySelectorAll(".layer-box.over").forEach(dom => {
                dom.classList.remove("over");
            });

            self.mountDom.querySelectorAll(".layer.show-top-line").forEach(dom => {
                dom.classList.remove("show-top-line");
            });
        }, false);

        this.mountDom.addEventListener("dragover", function(e) {
            e.preventDefault();

            let layer = e.target,
                layerNodeId = layer.getAttribute("data-id");


            let rect = layer.getBoundingClientRect(),
                mouse = e.clientY - rect.top;


            if(mouse > layerHeight / 3 && mouse <= layerHeight) {
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
        }, false);

    }

    Tree.prototype.__getNodeDomById = function (id, specificTarget = null) {
        switch (specificTarget) {
            case 'children':
                return this.mountDom.querySelector(`div[data-id="${id}"]`).nextElementSibling;

            case "box":
                return this.mountDom.querySelector(`div[data-id="${id}"]`).parentNode;

            default:
                return this.mountDom.querySelector(`div[data-id="${id}"]`);
        }

    };

    Tree.prototype.__createDom = function (node, targetNode) {
        let layer = __createLayer(node);

        let targetDom = targetNode ? this.__getNodeDomById(targetNode.id, "children") : this.mountDom;

        targetDom.appendChild(layer);
    };

    Tree.prototype.__renderDom = function (list = this.rootList, mountDom = this.mountDom) {
        if(!mountDom) {
            mountDom = this.mountDom;
        }

        for(let id of list) {
            let node = this.map.get(id);

            let layer = __createLayer(node);

            mountDom.appendChild(layer);
            if(node.children.length > 0) {
                this.__renderDom(node.children, this.__getNodeDomById(node.id, "children"));
            }
        }
    };

    Tree.prototype.__getNodeById = function (id) {
        return this.map.get(id);
    };

    Tree.prototype.__modifyTreeLevel = function (moveNode, targetNode, moveType) {
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
            if(moveNodeParentNode) {
                // moveNodeParentNode.children.deleteByValue(moveNode.id);

                deleteByValueFromArray(moveNode.id, moveNodeParentNode.children);

            }else {
                // this.rootList.deleteByValue(moveNode.id);

                deleteByValueFromArray(moveNode.id, this.rootList);
            }

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
                // targetNodeParentNode.children.insertBeforeValue(targetNode.id, moveNode.id);

                insertToArrayBeforeValue(targetNode.id, moveNode.id, targetNodeParentNode.children);

            }else {
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

    Tree.prototype.createNode = function (parentId = this.topParent, node = {}) {
        let nodeId = node.id || ("draggable-tree-node-" + guid()),
            targetNode;

        if(this.map.has(nodeId)) {
            consoleError(nodeId + "has been set");
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
    };

    Tree.prototype.deleteNode = function (id) {
        id = id || this.selectedNodeId;

        let node = this.__getNodeById(id);

        if(node) {
            let parentList;
            if(node.parentId === this.topParent){
                parentList = this.rootList;
            }else {
                let parentNode = this.__getNodeById(node.parentId);

                parentList = parentNode ? parentNode.children : null;
            }

            if(!parentList) {
                consoleError("parent node not found");

                return ;
            }

            deleteByValueFromArray(id, parentList);
            this.map.delete(id);

            //dom
            let nodeDom = this.__getNodeDomById(id, "box");
            nodeDom.parentNode.removeChild(nodeDom);

        }
    };

    return {
        create: options => {
            let tree = new Tree(options);

            trees.set(tree.id, tree);

            return {
                rootList: tree.rootList,
                map: tree.map,
                createNode: (parentId = tree.topParent, node = {}) => {
                    tree.createNode(parentId, node);
                },
                deleteNode: (id = null) => {
                    tree.deleteNode(id);
                }
            };
        }
    }
}());

export default DraggableTree;
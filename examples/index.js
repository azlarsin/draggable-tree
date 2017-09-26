/**
 * Created by azlar on 23/09/2017.
 */


(function () {
    let tree = DraggableTree.create({
        map: new Map(),
        list: [],
        mountDom: "#draggable-tree",

        changed: function (actionType) {
            console.log(actionType);
            sessionStorage.setItem("draggable-tree-data", JSON.stringify({
                rootList: tree.rootList,
                map: Array.from(tree.map.entries())
            }));
        },
        multiSelect: true
    });
    tree.createNode();
    tree.createNode();
    tree.createNode();

    tree.createNode(tree.rootList[0]);
    tree.createNode(tree.map.get(tree.rootList[0]).children[0], {
        // data: "<div class='test'>12345</div>"
    });

    document.getElementById("draggable-tree").nextElementSibling.addEventListener("click", () => {
        tree.deleteNode();
    });



    let treeStorageData = JSON.parse(sessionStorage.getItem("draggable-tree-data")) || {};
    let tree1 = DraggableTree.create({
        map: new Map(treeStorageData.map || []),
        list: treeStorageData.rootList,
        mountDom: "#draggable-tree-1",
        // changed: 123,
    });



    let tree2 = DraggableTree.create({
        mountDom: "#draggable-tree-2"
    });
    tree2.createNode().createNode().createNode().createNode().createNode();

    tree2.createNode(tree2.rootList[0]);
    tree2.createNode(tree2.map.get(tree2.rootList[0]).children[0], {
        data: "<div class='test'>12345</div>"
    });

    let timeout = 5,
        tree2Dom = document.getElementById("draggable-tree-2");
    let interval = setInterval(function () {
        timeout--;

        tree2Dom.previousElementSibling.childNodes[0].innerText = timeout;

        if(timeout === 0) {
            clearInterval(interval);

            tree2.render(tree.rootList, new Map(Array.from(tree.map.entries())));

            tree2Dom.previousElementSibling.innerHTML = "synchronizing with tree0";
        }
    }, 1000);


    let classTrees = document.querySelectorAll(".draggable-tree");

    classTrees.forEach(dom => {
        DraggableTree.create({
            map: new Map(),
            list: [],
            mountDom: dom,
        }).createNode().createNode().createNode();
    });


    let trees = DraggableTree.getTrees(),
        containers = document.querySelectorAll("body > div > .actions"),
        actions = {
            "createNode": "add node to rootList",
            "removeAll": "empty tree",
            "clearSelected": "clear selected",
            "remove": "remove selected nodes",
            "toggleMultiSelect": "toggle multi-select option"
        };



    containers.forEach((actionDom, index) => {
        let tree = trees[index];

        for(let functionName of Object.keys(actions)) {
            let button = document.createElement("button");
            button.innerText = actions[functionName];

            tree.setOptions()

            button.addEventListener("click", function () {
                tree[functionName]();
            });
        }
    });

}());
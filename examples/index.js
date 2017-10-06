/**
 * Created by azlar on 23/09/2017.
 */


(function () {
    // tree0
    let tree = DraggableTree.create({
        map: new Map(),
        list: [],
        mountDom: "#draggable-tree",

        changed: function (actionType) {
            console.log(actionType);
            sessionStorage.setItem("draggable-tree-data", JSON.stringify({
                rootList: tree.getRootList(),
                map: Array.from(tree.getMap().entries())
            }));
        },
        multiSelect: true
    });
    tree.createNode();
    tree.createNode();
    tree.createNode();

    tree.createNode(tree.getRootList()[0]);
    tree.createNode(tree.getMap().get(tree.getRootList()[0]).children[0], {
        // data: "<div class='test'>12345</div>"
    });

    // tree1
    let treeStorageData = JSON.parse(sessionStorage.getItem("draggable-tree-data")) || {};
    DraggableTree.create({
        map: new Map(treeStorageData.map || []),
        list: treeStorageData.rootList,
        mountDom: "#draggable-tree-1",
        // changed: 123,
    });


    // tree2
    let tree2 = DraggableTree.create({
        mountDom: "#draggable-tree-2"
    });
    tree2.createNode().createNode().createNode().createNode().createNode();

    tree2.createNode(tree2.getRootList()[0]);
    tree2.createNode(tree2.getMap().get(tree2.getRootList()[0]).children[0], {
        data: "<div class='test'>12345</div>"
    });

    let timeout = 5,
        tree2Dom = document.getElementById("draggable-tree-2");
    let interval = setInterval(function () {
        timeout--;

        tree2Dom.previousElementSibling.childNodes[0].innerText = timeout;

        if(timeout === 0) {
            clearInterval(interval);

            tree2.render(tree.getRootList(), new Map(Array.from(tree.getMap().entries())));

            tree2Dom.previousElementSibling.innerHTML = "synchronizing with tree0";
        }
    }, 1000);


    // tree3-5
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

    trees[0].setOptions({
        changed: function (actionType) {
            console.log(actionType);
            sessionStorage.setItem("draggable-tree-data", JSON.stringify({
                rootList: tree.getRootList(),
                map: Array.from(tree.getMap().entries())
            }));

            console.log(tree, tree.getRootList(), new Map(Array.from(tree.getMap().entries())));

            // sync tree2
            tree2.render(tree.getRootList(), new Map(Array.from(tree.getMap().entries())));
        },
        click: function () {
            // console.log(arguments);
        }
    });

    containers.forEach((actionDom, index) => {
        let tree = trees[index];

        for(let functionName of Object.keys(actions)) {

            let button = document.createElement("button");
            button.innerText = actions[functionName];

            button.addEventListener("click", function () {
                tree[functionName]();
            });

            actionDom.appendChild(button);
        }
    });

}());
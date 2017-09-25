/**
 * Created by azlar on 23/09/2017.
 */


(function () {
    let tree = DraggableTree.create({
        map: new Map(),
        list: [],
        mountDom: "#draggable-tree"
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



    let treeStorageData = JSON.parse(sessionStorage.getItem("draggable-tree-data"));
    let tree2 = DraggableTree.create({
        map: new Map(treeStorageData.map),
        list: treeStorageData.rootList,
        mountDom: "#draggable-tree-2"
    });


    // tree2.createNode();


    // tree2.createNode();
    // tree2.createNode();
    // tree2.createNode();
    // tree2.createNode(tree2.rootList[0]);
    // tree2.createNode(tree2.map.get(tree2.rootList[0]).children[0], {
    //     data: "<div class='test'>12345</div>"
    // });

}());
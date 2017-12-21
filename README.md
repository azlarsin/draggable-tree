# draggable-tree
A draggable tree by pure javascript.

## How to use
### use npm 
#### 1. install
```js
npm install --save bezier-picker
```

#### 2. import & use
```js
// demo using React

import DraggableTree from 'draggable-tree';

class App extends React.Component {
    constructor() {
        super();

        this.tree = null;

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        let tree = DraggableTree.create({
            map: new Map(),
            list: [],
            mountDom: ".layers",
            multiSelect: true
        });
        tree.createNode(null, {
            data: "<div>item 1</div>"
        });
        tree.createNode(tree.getRootList()[0], {
            data: "<div>item 2</div>"
        });
        tree.createNode(tree.getRootList()[0], {
            data: "<div>item 3</div>"
        });
        tree.createNode(tree.getRootList()[0], {
            data: "<div>item 4</div>"
        });
        tree.createNode(tree.getRootList()[0], {
            data: "<div>item 5</div>"
        });
        tree.createNode(null, {
            data: "<div>item 6</div>"
        });
        tree.createNode(null, {
            data: "<div>item 7</div>"
        });

        this.tree = tree;
    }

    handleClick(e) {
        if(e.target === e.currentTarget) {
            this.tree.clearSelected();
        }
    }

    render() {
		let { location } = this.props;

		return (
			<div style={{padding: '100px', backgroundColor: '#fff'}} onClick={ this.handleClick }>
				<div className={ "layers" } onMouseDown={ e => { e.stopPropagation() }} />
			</div>	
        )
    }
}   
```

### directly using script tag
```js
<script src="../lib/DraggableTree.js"></script>
<script>
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
        data: "<div class='test'>12345</div>"
    });

    // tree1
    let treeStorageData = JSON.parse(sessionStorage.getItem("draggable-tree-data")) || {};
    DraggableTree.create({
        map: new Map(treeStorageData.map || []),
        list: treeStorageData.rootList,
        mountDom: "#draggable-tree-1",
        // changed: 123,
    });
}());
</script>
```



## Api
### init
use with:

```js
let options = {
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
};

let tree = DraggableTree.create(options);
tree.createNode();
tree.createNode();
tree.createNode();
```

<hr>

all options: 

Prop                      | Type           | <div style="width: 400px;">Description</div>	|	Default
:-------------------------|:--------------:|:----------------------------------------:|:-----------------
map		|		[Map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)	|	`key`: unique id <br>`value`: Node	|	`new Map()`
list / rootList	| Array		|	**id list** of top parents of the tree(those node has no `parentId`)		|	`[]`
mountDom	|	[`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) <br>or<br>query(selecting by [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector))	|	mounting dom	| -
multiSelect	|	Boolean	|	enable multiple selecting	| false
&events	| -		|	set event like: { ...options, click: function {} }	| -

#### node (tree node)
```js
// node data struct
{
	// 
	id: ${a unique id},
	parentId: ${parentId},
	children: ${children id list(Array)},
	data: ${will render with innderHTML}

	// ...
	// you can set your own properties with createNode(parentId, nodeData)
}
```

### functions
#### DraggableTree(Trees)
use with:

```js
// create a tree
let options = {
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
};
let tree = DraggableTree.create(options);

// getTrees
let trees = DraggableTree.getTrees();
trees[0].rempoveAll();		// a Tree
trees[1].createNode();

```

<hr>

all events:

Function		|	Arguments	| <div style="width: 300px;">Description</div>
:-------------------------|:--------------:|:----------------------------------------
create		| options		|	create a tree, return a Tree (Object)
getTrees	| -				|	return


#### Tree(created by DraggableTree.create())
use with:

```js
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
tree.createNode().createNode();
```

<hr>

**all events return the Tree itself(except `getRootList()` & `getMap()` specifying the return value)**, events list:

Function		|	Arguments	| <div style="width: 300px;">Description</div>
:-------------------------|:--------------:|:----------------------------------------
getRootList	| -		| get **id list** of top parents of the tree(those node has no `parentId`); **return `Array`**
getMap			| -		| get all nodes map; **return `Map`**
createNode	| parentId = tree.topParent, <br>node = {}	|	create a new Node, use parentId to create a child node; use node(`Object`) to define custom properties
clearSelected	| -					| clear selected
remove			| -					| remove **selected** node
removeAll		| -					| remove all nodes(like clearing the tree)
toggleMultiSelect	| -			| toggle multi-select option
render			| list = [], map = new Map()	| re-render the tree by new **list & map**
setEvents	| options = {}	|	an object contains events like: `{ click: function () {}, dragStart: function () {}, //... }`


### events
use with:

```js
// init
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

// set event
tree[0].setEvents({
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
```

Event		|	arguments	| <div style="width: 300px;">Description</div>
:-------------------------|:--------------:|:----------------------------------------
click	|	`nodeId` |	
dragStart	|	|	
dragOver	|	|	
dragLeave	|	|	
dragEnd	|	|	
beforeDrop	|	|	
drop	|	|	
changed	|	|	

## Demo
[https://blog.azlar.cc/demos/draggable-tree/](https://blog.azlar.cc/demos/draggable-tree/).

or

```javascript
git clone git@github.com:azlarsin/draggable-tree.git
cd draggable-tree
npm install
npm start
```

## todo
- [x] 主逻辑、打包
- [x] 事件逻辑，目前在考虑要不要支持多事件绑定(暂不支持)
- [x] last holder 逻辑，会增添一些判断
- [x] demo
- [x] 发布到 npm
- [ ] api (区分开 npm 与 script 引用)
- [ ] readme
- [ ] 逻辑优化，给同事用后感觉有些 api 不完善；例如：drop 前没有 before drop 用于阻止 drop 操作带来的数据变化（有时候需要与后台交互，获得成功答复后才可继续操作）
- [ ] 将 node 的必要属性切换为私有命名：`id => __id`, `data => __data`

## bug fixes
- [x] firefox 不可拖拽
- [x] npm 引用失败
- [x] 当传入的 data 为 html 时，dragOver、drop 事件失败（e.target 为传入的 dom）而造成的逻辑问题

# draggable-tree
A draggable tree by pure javascript.

## How to use


## Api



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
- [x] demo(80%)
- [x] 发布到 npm
- [ ] collapse 功能
- [ ] readme - api (区分开 npm 与 script 引用)
- [ ] 逻辑优化，给同事用后感觉有些 api 不完善；例如：drop 前没有 before drop 用于阻止 drop 操作带来的数据变化（有时候需要与后台交互，获得成功答复后才可继续操作）

## bug fixes
- [x] firefox 不可拖拽
- [x] npm 引用失败
- [x] 当传入的 data 为 html 时，dragOver、drop 事件失败（e.target 为传入的 dom）而造成的逻辑问题

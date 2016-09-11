# 使用 electron + react 开发的桌面应用

一款使用 markdown 记录笔记，并根据[艾宾浩斯记忆法](http://baike.baidu.com/link?url=cp0rotPV0Mh3IhBMdA-dSwj8ekZyo6l8T2iIm5C7hlXcosx911LUJ2kM60IfHP5G)自动将当天应复习笔记以Todo 形式列出来，方便复习。

## 开发环境
使用[electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)作为种子文件进行开发。
提供了很多功能，不过只用到一部分
- electron
- react
- hot-reload

## 运行
需要全局安装`electron`
```bash
npm install -g electron
```
安装依赖并运行
```bash
npm install
npm run dev
```

需要等待比较长的时间后，会自动弹出应用。

## 生成可执行文件
```bash
npm run package
```
将会在根目录生成`releases`文件夹


## 时间线

- 2016/9/2   开始
- 2016/9/4   实现了必备功能的第一版完成（笔记的创建、修改，复习功能）
- 2016/9/10  使用 redux 进行优化。完成笔记的创建、修改、删除功能
- 2016/9/11  使用 redux 对上一版进行了重构，完成了应用必备功能。


## todo

- 优化代码，分出 container 和 component 

- 增加单词查询功能
- 界面的优化
- 编辑器的优化
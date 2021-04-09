# Vue + Node 博客系统

​    为什么突然想写个博客呢，是因为之前上网搜问题时发现别人的博客挺好看的，于是就这个想法了，然后其实也想用node.js写下接口，这样就不用靠后端了，哈哈哈！言归正传，该项目总体结构为，前台Vue，ui用的是element，后台Node，数据库mysql，还做了响应式。

[项目预览地址](http://blog.heartless.top/article)


### 一、显示部分

页面的主要模块有文章列表，相册，demo，登录，个人页面，留言板，还做了个夜间模式，其他部分就看图吧~，其他模块就不放图了，希望你能去探索一下~

![image.png](http://blog.heartless.top:3000/public/images/article/1617422691316.png)

![image.png](http://blog.heartless.top:3000/public/images/article/1617422990491.png)

![image.png](http://blog.heartless.top:3000/public/images/article/1617423224158.png)

### 二、后台管理

一个博客系统，肯定要有管理页面的嘛，不然直接操作数据库多麻烦~

可以发表文章，修改文章，删除文章，管理用户，上传相册和视频，删除相册和视频就没做了，主要是懒。。。发表文章支持markdown，在前台显示时也支持。

![image.png](http://blog.heartless.top:3000/public/images/article/1617422809138.png)

#### 1、安装依赖

```
npm install
```

#### 2、项目启动
```
npm run serve
```

#### 3、项目打包

```
npm run build
```

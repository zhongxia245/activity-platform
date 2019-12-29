# 活动运营平台

可以通过一些可视化配置，完成配置除常规的运营活动需求，不需要前端的呃介入。

## 运行安装

需要一个 mysql 数据库方可运行。 `server/config/config.default.js` 内可配置数据库信息。

## 如何启动

```bash
cnpm install

npm run dev

# open http://localhost:8000/client/web/index.html
```

## 存在的问题

### 1. 组件模块如果多的话，在 shou 里面，如何按需加载使用到的组件？

webpack 有一个 bundle-loader 可以试一下。

## 平台效果

![](http://ww4.sinaimg.cn/large/006tNc79ly1g51ougcdfcj31je0u0tem.jpg)

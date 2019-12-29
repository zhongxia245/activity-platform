// {app_root}/app.js
module.exports = app => {
  // 第一次启动项目，需要把表模型同步到数据库中。
  // if (app.config.env === 'local' || app.config.env === 'unittest') {
  //   console.log('同步表模型到数据库')
  //   app.beforeStart(async () => {
  //     await app.model.sync({ force: true })
  //   })
  // }
};

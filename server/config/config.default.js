"use strict";
const path = require("path");

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1539760253736_3171";

  // add your config here
  config.middleware = [];

  config.static = {
    prefix: "/",
    dir: path.join(appInfo.baseDir, "../dist")
  };

  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH"
  };

  config.security = {
    csrf: {
      enable: false
    }
  };

  exports.sequelize = {
    dialect: "mysql", // support: mysql, mariadb, postgres, mssql
    database: "activity_config",
    host: "localhost",
    port: "3306",
    username: "root",
    password: ""
    // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
    // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
    // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
    // more sequelize options
  };

  return config;
};

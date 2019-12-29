"use strict";

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN, TEXT } = app.Sequelize;

  const Config = app.model.define("tb_config", {
    name: {
      type: STRING(30),
      allowNull: false
    }, // 活动名称
    path: {
      type: STRING(30),
      allowNull: false,
      unique: true
    }, // 活动地址
    desc: STRING(64), // 活动描述
    category: STRING(20), // 活动类型
    status: BOOLEAN, // 活动状态 true 上线状态  false 下线状态
    config: {
      type: TEXT,
      defaultValue: "{}"
    }, // 配置信息
    disabled: {
      type: BOOLEAN,
      defaultValue: false
    } // 是否禁用
  });

  return Config;
};

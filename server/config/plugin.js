'use strict'

// had enabled by egg
// exports.static = true;

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}

exports.routerPlus = {
  enable: true,
  package: 'egg-router-plus'
}

exports.redis = {
  enable: false,
  package: 'egg-redis'
}

exports.cors = {
  enable: true,
  package: 'egg-cors'
}

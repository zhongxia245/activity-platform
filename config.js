const path = require('path')

const isLocal = process.env.NODE_ENV === 'localhost'
const isProd = process.env.NODE_ENV === 'production'

const defaultConfig = {
  // 是否为本地环境
  isLocal: isLocal,
  // 是否为生产环境
  isProd: isProd,
  // 运行端口
  port: 8000,
  // 代理配置
  proxy: {
    '/api/v1': {
      target: 'http://0.0.0.0:7001',
      changeOrigin: true
    }
  },
  // 入口目录
  inputPath: 'web',
  // 输出目录
  outputPath: 'dist',
  // 文件引用路径别名
  alias: {
    modules: path.resolve(__dirname, `client/modules`),
    common: path.resolve(__dirname, `client/common`)
  },
  // rem 转换基准
  basePixel: 100,
  // 公共模块
  chunks: {
    'web/chunks/base': path.resolve(__dirname, './client/web/chunks/base.js')
  },
  // 编译地图开关
  sourceMap: false,
  // 选择性打包开关
  useOnly: false,
  // 选择性打包入口
  only: {},
  // js 选择性注入判断函数
  injectCheck: (html, js) => {
    return html === js
  }
}

const CONFIG = defaultConfig
const tools = {
  [`${CONFIG.inputPath}/common/tools/common`]: path.resolve(__dirname, './client/common/tools/common.js')
}
CONFIG.chunks = { ...tools, ...CONFIG.chunks }

module.exports = CONFIG

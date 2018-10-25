// 页面设置
export const PAGE_SETTING = [
  { name: '页面标题', key: 'title', controlType: 'input' },
  { name: '页面样式', key: 'style', controlType: 'textarea' },
  { name: '分享信息', key: 'hasShare', controlType: 'checkbox' },
  { name: '分享标题', key: 'shareInfo.title', controlType: 'input', hasVisible: 'hasShare' },
  { name: '分享描述', key: 'shareInfo.desc', controlType: 'input', hasVisible: 'hasShare' },
  // 微信分享的链接参数是 link, 由于分装分享函数的时候，使用 url，因此这里用 url
  { name: '分享地址', key: 'shareInfo.url', controlType: 'input', hasVisible: 'hasShare' },
  { name: '分享图标', key: 'shareInfo.imgUrl', controlType: 'input', hasVisible: 'hasShare' }
]

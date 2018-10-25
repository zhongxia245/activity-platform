/**
 * 模块相关配置
 */

// 模块类型
export const CATEGORYS = [
  {
    name: 'ALL',
    key: ''
  },
  {
    name: '展示组件', // 不包含业务逻辑，单纯的前端组件
    key: 'pure'
  },
  {
    name: '功能组件', // 包含业务逻辑，对接后端的接口
    key: 'logic'
  }
]

// 模块配置
export const COMPONENTS = [
  {
    category: 'pure',
    name: '悬浮按钮',
    img: 'https://i.loli.net/2018/10/15/5bc42bf5a15fd.png',
    component: 'Button',
    desc: '悬浮在页面底部的按钮,有防止多次点击效果，禁用状态',
    props: [
      { name: '文案', key: 'text', controlType: 'input' },
      { name: '跳转链接', key: 'url', controlType: 'input' },
      { name: '背景色', key: 'bgcolor', controlType: 'input' }
    ],
    data: { text: '立即加入' }
  },
  {
    category: 'pure',
    name: '头图',
    img: 'https://i.loli.net/2018/10/15/5bc42bf5a15fd.png',
    component: 'HeaderImg',
    props: [{ name: '图片地址', key: 'src', controlType: 'input' }]
  },
  {
    category: 'pure',
    name: '规则组件',
    img: 'https://i.loli.net/2018/10/15/5bc40dfb05a4c.png',
    component: 'RuleList',
    props: [{ name: '规则', key: 'list', controlType: 'textarea' }],
    data: {
      list: '1. 活动开始时间2018年-2019年; \n 2. 活动解释权归好规划所有; \n 3. 这个是测试内容'
    }
  },
  {
    category: 'logic',
    name: '逻辑组件测试',
    img: 'https://i.loli.net/2018/10/15/5bc40dfb05a4c.png',
    component: 'Login'
  }
]

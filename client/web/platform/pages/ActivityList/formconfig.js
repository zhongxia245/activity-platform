const ACTIVITY_CATEGORY = [
  { key: '常规活动', value: 'normal' },
  { key: '投资送好礼', value: 'invest' },
  { key: '加息活动', value: 'addrate' },
  { key: '分享砍价', value: 'share' },
  { key: '邀请活动', value: 'invite' },
  { key: '其他', value: 'other' }
]

// 页面设置
export const PAGE_INFO_CONFIG = [
  {
    name: '活动名称',
    key: 'name',
    controlType: 'input',
    rules: [{ required: true, message: '活动名称不能为空' }]
  },
  {
    name: '活动路径',
    key: 'path',
    controlType: 'input',
    rules: [{ required: true, message: '活动路径不能为空' }]
  },
  { name: '活动描述', key: 'desc', controlType: 'textarea' },
  {
    name: '活动类型',
    key: 'category',
    controlType: 'select',
    defaultValue: 'normal',
    values: ACTIVITY_CATEGORY
  },
  {
    name: '活动状态',
    key: 'status',
    controlType: 'select',
    defaultValue: true,
    values: [{ key: '正常状态', value: true }, { key: '下线', value: false }]
  }
]

export const getActivityCategoryName = value => {
  for (let i = 0; i < ACTIVITY_CATEGORY.length; i++) {
    if (ACTIVITY_CATEGORY[i]['value'] === value) return ACTIVITY_CATEGORY[i]['key']
  }
}

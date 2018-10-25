import {
  ACTION_REQUEST,
  ACTION_RECEIVE,
  ACTION_ADD_COMPONENT,
  ACTION_DELETE_COMPEONT,
  ACTION_UPDATE_COMPEONT,
  ACTION_UPDATE_GLOBAL_SETTING,
  ACTION_MOVEDOWN_COMPONENT,
  ACTION_MOVEUP_COMPONENT
} from './action_type'

// 默认状态
const INITIAL_STATE = {
  // 当前活动配置
  current_activity_config: {
    title: '',
    hasShare: false,
    shareInfo: {},
    modules: []
  },
  activity_list: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_REQUEST:
      return state

    case ACTION_RECEIVE:
      return { ...state, [action.path]: action['data'] }

    // 添加组件
    case ACTION_ADD_COMPONENT:
      let oldModules = state['current_activity_config']['modules'] || []
      return {
        ...state,
        current_activity_config: {
          ...state['current_activity_config'],
          modules: [...oldModules, action['data']]
        }
      }

    // 删除组件
    case ACTION_DELETE_COMPEONT:
      let newModules = JSON.parse(JSON.stringify(state['current_activity_config']['modules']))
      newModules.splice(action['data'], 1)
      return {
        ...state,
        current_activity_config: { ...state.current_activity_config, modules: newModules }
      }

    // 更新组件
    case ACTION_UPDATE_COMPEONT:
      // 只改变对象中的某个值，对象地址不变，react 会认为属性未变化，因此用深复制
      return {
        ...state,
        current_activity_config: JSON.parse(JSON.stringify(action['data']))
      }

    // 更新活动全局配置
    case ACTION_UPDATE_GLOBAL_SETTING:
      return {
        ...state,
        current_activity_config: { ...state.current_activity_config, ...action['data'] }
      }

    case ACTION_MOVEDOWN_COMPONENT:
      return {
        ...state,
        current_activity_config: action['data']
      }

    case ACTION_MOVEUP_COMPONENT:
      return {
        ...state,
        current_activity_config: action['data']
      }

    default:
      return state
  }
}

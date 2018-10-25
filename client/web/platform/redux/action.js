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

export const actionRequest = (path, data, callback) => ({
  type: ACTION_REQUEST,
  path,
  data,
  callback
})

export const actionReceive = (path, data) => ({
  type: ACTION_RECEIVE,
  path,
  data
})

export const actionAddComponent = data => ({
  type: ACTION_ADD_COMPONENT,
  data
})

export const actionDeleteComponent = data => ({
  type: ACTION_DELETE_COMPEONT,
  data
})

export const actionUpdateComponent = data => ({
  type: ACTION_UPDATE_COMPEONT,
  data
})

export const actionUpdateGlobalSetting = data => ({
  type: ACTION_UPDATE_GLOBAL_SETTING,
  data
})

export const actionMoveUpComponent = data => ({
  type: ACTION_MOVEUP_COMPONENT,
  data
})

export const actionMoveDownComponent = data => ({
  type: ACTION_MOVEDOWN_COMPONENT,
  data
})

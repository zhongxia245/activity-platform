import { put, call, takeEvery, all } from 'redux-saga/effects'
import { actionRequest, actionReceive } from './action'
import { getConfig, addConfig, updateConfig, deleteConfig } from '../api'
import { ACTION_REQUEST } from './action_type'

// 根据action的path参数来决定调用获取数据的函数
const chooseReq = action => {
  switch (action.path) {
    case 'activity_list':
      return () => getConfig(action.data)
    case 'add_config':
      return () => addConfig(action.data)
    case 'update_config':
      return () => updateConfig(action.data)
    case 'delete_config':
      return () => deleteConfig(action.data)
  }
}

function * getData(action) {
  try {
    const data = yield call(chooseReq(action)) || {}
    yield put(actionReceive(action.path, data))

    // 增删改活动配置，都需要重新获取活动列表
    if (['add_config', 'update_config', 'delete_config'].indexOf(action.path) !== -1) {
      yield put(actionRequest('activity_list'))
    }

    // 接口执行结束后，跳转页面
    action.callback && action.callback(data)
  } catch (e) {
    console.log('saga异常', e)
  }
}

function * watchGetDataAsync() {
  yield takeEvery(ACTION_REQUEST, getData)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function * rootSaga() {
  yield all([watchGetDataAsync()])
}

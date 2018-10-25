import Axios from 'axios'
import message from 'antd/lib/message'

const axiosInstance = Axios.create()

axiosInstance.interceptors.response.use(
  resp => {
    if (resp.data.success) {
      return resp.data.data
    } else {
      message.error(resp.data.msg)
      return Promise.reject(resp)
    }
  },
  e => {
    let errorMsg = `${e.response.status}:${e.response.data.message}` || `${e.response.status}:服务端请求错误`
    message.error(errorMsg)
    return Promise.reject(e && e.response)
  }
)

const URLS = {
  config: '/api/v1/config'
}

const handleActivityConfig = initData => {
  let data = JSON.parse(JSON.stringify(initData))
  data['config'] = data['config'] || {}
  if (typeof data['config'] === 'object') {
    data['config'] = JSON.stringify(data['config'])
  }
  return data
}

export const getConfig = () => {
  return axiosInstance.get(`${URLS['config']}/list`)
}

export const addConfig = data => {
  return axiosInstance.post(URLS['config'], handleActivityConfig(data))
}

export const updateConfig = ({ created_at, updated_at, ...otherData }) => {
  return axiosInstance.post(`${URLS['config']}/${otherData.id}`, handleActivityConfig(otherData))
}

export const deleteConfig = id => {
  return axiosInstance.delete(`${URLS['config']}/${id}`)
}

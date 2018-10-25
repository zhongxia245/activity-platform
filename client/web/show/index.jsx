import './index.less'
import React, { Component } from 'react'
import Axios from 'axios'
import ModuleParse from 'modules/ModuleParse'
import { queryString, isDev } from 'common/utils'
import { Toast } from 'antd-mobile'

const injectInlineStyle = str => {
  let nodeId = '_inject_style'
  let node = document.getElementById(nodeId)
  if (!node) {
    node = document.createElement('style')
    node.id = nodeId
    document
      .getElementsByTagName('head')
      .item(0)
      .appendChild(node)
  }
  node.innerHTML = str
}

class Show extends Component {
  render() {
    const { data } = this.props
    return <ModuleParse modules={data['modules']} />
  }
}

let id = queryString('id') || 5
let baseUrl = isDev() ? 'http://192.168.10.8:7001' : ''

Axios.get(`${baseUrl}/api/v1/config/${id}`).then(resp => {
  let data = resp.data.data[0]
  if (!data) {
    Toast.info('不存在该活动配置，请检查活动 id 是否已被删除', 100)
    return
  }
  let configData = JSON.parse(data['config'] || '{}')

  document.title = configData['title'] || data['name']

  if (configData['style']) {
    injectInlineStyle(configData['style'])
  }
  ReactDOM.render(<Show data={configData} />, document.getElementById('app'))
})

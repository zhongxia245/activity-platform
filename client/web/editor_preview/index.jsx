import './index.less'
import React, { Component } from 'react'
import ModuleParse from 'modules/ModuleParse'

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

class Preview extends Component {
  constructor(props) {
    super(props)
    this.state = { data: {}, current: null }
  }

  componentDidMount() {
    window.addEventListener('message', this.handleSyncStore, false)
    // 告诉配置页面，可以接收 message
    console.log('postMessage can_receive_data')
    window.parent.postMessage({ type: 'can_receive_data', flag: true }, '*')
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleSyncStore)
  }

  handleSyncStore = event => {
    let data = event.data.data
    switch (event.data.type) {
      case 'get-activity-config':
        if (data && data.style) {
          injectInlineStyle(data.style)
        }
        this.setState({ data: data })
        break
      case 'select-module':
        this.setState({ current: data })
        break
    }
  }

  render() {
    const { data, current } = this.state
    return <ModuleParse modules={data['modules']} current={current} />
  }
}

ReactDOM.render(<Preview />, document.getElementById('app'))

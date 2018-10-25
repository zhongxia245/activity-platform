import './index.less'
import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import Button from 'antd/lib/button'
import message from 'antd/lib/message'
import Tabs from 'antd/lib/tabs'
import Popover from 'antd/lib/popover'
import { SideBar, Nav } from './components'
import { IFrame, FormGenerator } from '../../components'
import { PAGE_SETTING } from './config'
import QRCode from 'qrcode'
import {
  actionAddComponent,
  actionDeleteComponent,
  actionUpdateComponent,
  actionUpdateGlobalSetting,
  actionRequest,
  actionMoveUpComponent,
  actionMoveDownComponent
} from '../../redux/action'

const TabPane = Tabs.TabPane

const PREVIEW_URL = `${window.location.origin}/client/web/editor_preview/index.html`
const SHOW_URL = `${window.location.origin}/client/web/show/index.html?id=`

let tempActivityConfig = null
class ActivityEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentModuleIndex: 0,
      qrcodeData: null
    }
    this.$iframe = null
  }

  /**
   * 活动配置发生变化，则通知预览页面发生改变
   */
  postIframeMessage = () => {
    const { data } = this.props
    // 数据一样，则不重新发送消息
    if (data && tempActivityConfig !== JSON.stringify(data)) {
      tempActivityConfig = JSON.stringify(data)
      // FIXED:第二次进入编辑页面， this.$iframe 存在，但是 this.$iframe.contentWindow 变为 null ,莫名其妙
      // 因此采用DOM 获取来发送 message
      let $iframe = document.getElementById('preview')
      $iframe.contentWindow && $iframe.contentWindow.postMessage({ type: 'get-activity-config', data: data }, '*')
    }
  }

  componentDidMount() {
    // 如果没有 id,则返回首页
    // 避免刷新页面停留在编辑页，导致存在脏数据
    if (!this.props.id) {
      this.props.history.push('/')
    }
    // preview 页面加载完成，来加载配置
    window.addEventListener('message', event => {
      if (event.data.type === 'can_receive_data') {
        console.log('postIframeMessage can_receive_data')
        this.postIframeMessage()
      }
    })
  }

  componentDidUpdate() {
    this.postIframeMessage()
  }

  componentWillMount() {
    tempActivityConfig = null
  }

  handlePreview = () => {
    window.open(SHOW_URL + this.props.id)
  }

  handleGeneratorQrcode = () => {
    QRCode.toDataURL(SHOW_URL + this.props.id).then(url => {
      this.setState({ qrcodeData: url })
    })
  }

  handleSave = () => {
    const { updateConfig, data, id } = this.props
    updateConfig({ id, config: data }, () => {
      message.success('保存活动配置成功!')
    })
  }

  handlePublish = () => {
    message.success('部署成功!')
  }

  handleAddComponent = data => {
    this.props.addComponent(data)
  }

  handleDelete = () => {
    this.props.deleteComponent(this.state.currentModuleIndex)
  }

  handleSelectModule = index => {
    this.setState({ currentModuleIndex: index })

    // 发出消息，告知预览页面，选中当前组件
    this.$iframe.contentWindow.postMessage({ type: 'select-module', data: index }, '*')
  }

  handleSaveModuleData = moduleData => {
    const { currentModuleIndex } = this.state
    const { data } = this.props
    data['modules'][currentModuleIndex]['data'] = moduleData
    this.props.updateComponent(data)
  }

  handleMoveUp = (index, e) => {
    e.stopPropagation()
    let newData = JSON.parse(JSON.stringify(this.props.data))
    let temp = newData['modules'][index]
    newData['modules'][index] = newData['modules'][index - 1]
    newData['modules'][index - 1] = temp
    this.props.moveUpComponent(newData)
  }

  handleMoveDown = (index, e) => {
    e.stopPropagation()
    let newData = JSON.parse(JSON.stringify(this.props.data))
    let temp = newData['modules'][index]
    newData['modules'][index] = newData['modules'][index + 1]
    newData['modules'][index + 1] = temp
    this.props.moveUpComponent(newData)
  }

  render() {
    const { currentModuleIndex } = this.state
    const { data, updateGlobalSetting } = this.props
    const currentModuleConfig = (data['modules'] && data['modules'][currentModuleIndex]) || {}

    return (
      <div className="activity-editor">
        <SideBar onClick={this.handleAddComponent} />
        <div className="activity-editor__content">
          <div className="content__tools">
            <Button onClick={this.handleSave}>保存</Button>

            <Popover
              placement="leftBottom"
              title="请先保存，后扫码预览"
              onClick={this.handleGeneratorQrcode}
              content={
                <div>
                  <img src={this.state.qrcodeData} />
                  <p>
                    <Button onClick={this.handlePreview}>浏览器打开</Button>
                  </p>
                </div>
              }
              trigger="click"
            >
              <Button>预览</Button>
            </Popover>

            {/* <Button onClick={this.handlePublish}>发布</Button> */}
          </div>
          <div className="content____main">
            <IFrame
              ref={ifr => {
                if (ifr) {
                  this.$iframe = ifr.$iframe
                }
              }}
              data={data}
              src={PREVIEW_URL}
            />
            <div className="content__setting">
              <Tabs defaultActiveKey="1">
                <TabPane tab="模块设置" key="1">
                  <FormGenerator
                    config={currentModuleConfig['props'] || []}
                    data={currentModuleConfig['data'] || {}}
                    onSubmit={this.handleSaveModuleData}
                    otherBtns={() => (
                      <Button type="danger" onClick={this.handleDelete}>
                        删除模块
                      </Button>
                    )}
                  />
                </TabPane>
                <TabPane tab="页面设置" key="2">
                  <FormGenerator config={PAGE_SETTING} data={data} onSubmit={updateGlobalSetting} />
                </TabPane>
              </Tabs>
            </div>
            <div className="content__nav">
              <Nav
                modules={data['modules']}
                current={currentModuleIndex}
                onSelect={this.handleSelectModule}
                onUp={this.handleMoveUp}
                onDown={this.handleMoveDown}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  id: state.current_activity_id,
  data: _.isEmpty(state.current_activity_config) ? { modules: [] } : state.current_activity_config
})

// TODO:这里的 action 可以优化，优化成一个
const mapDispatchToProp = dispatch => ({
  addComponent: data => dispatch(actionAddComponent(data)),
  deleteComponent: data => dispatch(actionDeleteComponent(data)),
  updateComponent: data => dispatch(actionUpdateComponent(data)),
  moveUpComponent: data => dispatch(actionMoveUpComponent(data)),
  moveDownComponent: data => dispatch(actionMoveDownComponent(data)),
  updateGlobalSetting: data => dispatch(actionUpdateGlobalSetting(data)),
  addConfig: (data, cb) => dispatch(actionRequest('add_config', data, cb)),
  updateConfig: (data, cb) => dispatch(actionRequest('update_config', data, cb))
})

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(ActivityEditor)

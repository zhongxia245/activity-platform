/**
 * 2018-10-18 10:16:28
 * TODO:活动列表，后续可以改成表格模式
 */
import './index.less'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'antd/lib/card'
import Skeleton from 'antd/lib/skeleton'
import Icon from 'antd/lib/icon'
import Modal from 'antd/lib/modal'
import Avatar from 'antd/lib/avatar'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import message from 'antd/lib/message'

import { FormGenerator } from '../../components'
import { PAGE_INFO_CONFIG, getActivityCategoryName } from './formconfig'

import { actionRequest, actionReceive } from '../../redux/action'

const { Meta } = Card

class ActivityList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      isUpdate: false,
      formData: {}
    }
  }

  componentDidMount() {
    this.props.getData()
  }

  handleOk = () => {
    const { isUpdate, formData } = this.state
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (isUpdate) {
          this.props.updateConfig({ ...formData, ...values }, () => {
            message.success('更新活动数据成功!')
            this.handleCancel()
          })
        } else {
          this.props.addConfig(values, () => {
            message.success('添加活动成功!')
            this.handleCancel()
          })
        }
      }
    })
  }

  handleCancel = () => {
    this.setState({ visible: false, isUpdate: false, formData: {} })
  }

  handleAdd = () => {
    this.setState({ visible: true, formData: {} })
  }

  // 编辑活动
  handleEdit = item => {
    item['config'] = JSON.parse(item['config'] || '{}')
    this.props.setCurrentActivityId(item['id'])
    this.props.setCurrentActivityConfig(item['config'])
    this.props.history.push('/editor')
  }

  handleModalEdit = item => {
    this.setState({ formData: item, visible: true, isUpdate: true })
  }

  // 删除活动，本质是禁用
  handleDelete = item => {
    this.props.deleteConfig(item.id, () => {
      message.success('禁用活动成功!')
    })
  }

  render() {
    const { isUpdate, formData, visible } = this.state
    const { data } = this.props
    const isLoading = data.length === 0
    return (
      <div className="activity-list">
        <Row gutter={16} align="middle" type="flex">
          {data.map((item, index) => {
            return (
              <Col key={index} span={6}>
                <Card
                  hoverable={true}
                  actions={[
                    <label onClick={this.handleModalEdit.bind(this, item)}>
                      <Icon type="edit" />
                      编辑
                    </label>,
                    <label onClick={this.handleDelete.bind(this, item)}>
                      <Icon type="delete" theme="twoTone" twoToneColor="red" />
                      禁用
                    </label>
                  ]}
                >
                  <Skeleton loading={isLoading} avatar active>
                    <Meta
                      avatar={<Avatar src="https://i.loli.net/2018/10/17/5bc71f42283e8.png" />}
                      title={`${getActivityCategoryName(item['category'])}：${item['name']}`}
                      description={item['desc']}
                      onClick={this.handleEdit.bind(this, item)}
                    />
                  </Skeleton>
                </Card>
              </Col>
            )
          })}
          <Col span={6}>
            <Card className="al__btn-add" hoverable={true} onClick={this.handleAdd}>
              <Icon type="plus-circle" theme="outlined" />
              <p>新增活动</p>
            </Card>
          </Col>
        </Row>

        <Modal
          title={isUpdate ? '编辑活动' : '添加活动'}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {visible ? (
            // FIXED：如果只是修改组件的 props，由于组件内部没有做属性边个的处理，因此会展示上次的数据
            // 因此显示弹窗的时候，在渲染组件
            // 可优化组件解决该问题，但是不太必要
            <FormGenerator
              ref={form => {
                this.form = form
              }}
              showBtn={false}
              config={PAGE_INFO_CONFIG}
              data={formData}
            />
          ) : (
            ''
          )}
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.activity_list
})

// TODO:这里的 action 可以优化，优化成一个
const mapDispatchToProp = dispatch => ({
  getData: () => dispatch(actionRequest('activity_list')),
  setCurrentActivityConfig: data => dispatch(actionReceive('current_activity_config', data)),
  setCurrentActivityId: data => dispatch(actionReceive('current_activity_id', data)),
  addConfig: (data, cb) => dispatch(actionRequest('add_config', data, cb)),
  updateConfig: (data, cb) => dispatch(actionRequest('update_config', data, cb)),
  deleteConfig: (id, cb) => dispatch(actionRequest('delete_config', id, cb))
})

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(ActivityList)

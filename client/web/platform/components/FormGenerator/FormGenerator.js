import './FormGenerator.less'
import React, { Component } from 'react'
import Checkbox from 'antd/lib/checkbox'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Select from 'antd/lib/select'

const { TextArea } = Input
const Option = Select.Option
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
}

class FormGenerator extends Component {
  handleSubmit = () => {
    const { onSubmit, form } = this.props
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit && onSubmit(values)
      }
    })
  }

  renderFormItem(item) {
    switch (item['controlType']) {
      case 'input':
        return <Input placeholder={item['placeholder'] || `请输入${item['name']}`} />
      case 'textarea':
        return <TextArea rows={5} placeholder={item['placeholder'] || `请输入${item['name']}`} />
      case 'select':
        return (
          <Select placeholder={item['placeholder'] || `请选择${item['name']}`}>
            {item['values'] &&
              item['values'].map((selectItem, index) => {
                return (
                  <Option key={index} value={selectItem['value']}>
                    {selectItem['key']}
                  </Option>
                )
              })}
          </Select>
        )
      case 'checkbox':
        return <Checkbox />
      default:
        return <Input placeholder={item['placeholder'] || `请输入${item['name']}`} />
    }
  }

  render() {
    const { form, config = [], data = {}, showBtn = true, otherBtns = () => {} } = this.props
    const { getFieldDecorator, getFieldValue, getFieldsValue } = form

    return (
      <div className="ae-form-generator">
        <Form onSubmit={this.handleSubmit}>
          {config.map((item, index) => {
            // 字段有展示条件，则先判断条件在展示
            let hasVisible = true
            if (item['hasVisible'] && typeof item['hasVisible'] === 'string') {
              hasVisible = getFieldValue(item['hasVisible'])
            } else if (typeof item['hasVisible'] === 'function') {
              hasVisible = item['hasVisible'](getFieldsValue())
            }
            if (!hasVisible) {
              return ''
            }

            return (
              <FormItem key={index} {...formItemLayout} label={item['name']}>
                {getFieldDecorator(item['key'], {
                  initialValue: data[item['key']] || item['defaultValue'],
                  rules: item['rules']
                })(this.renderFormItem(item))}
              </FormItem>
            )
          })}
          {showBtn ? (
            <FormItem wrapperCol={{ offset: 8 }}>
              {otherBtns()}
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </FormItem>
          ) : (
            ''
          )}
        </Form>
      </div>
    )
  }
}

export default Form.create()(FormGenerator)

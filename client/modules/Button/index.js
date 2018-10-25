import './index.less'
import React, { Component } from 'react'
import classnames from 'classnames'

class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false
    }
  }

  handleClick = () => {
    this.setState({ disabled: true })

    setTimeout(() => {
      this.setState({ disabled: false })
    }, 1000)
  }

  render() {
    const { className, text, bgcolor } = this.props
    const { disabled } = this.state
    return (
      <div
        style={{ backgroundColor: bgcolor || '' }}
        className={classnames('lcgc-button', className, { 'lcgc-button--disabled': disabled })}
      >
        {text || '立即参与'}
      </div>
    )
  }
}

export default Button

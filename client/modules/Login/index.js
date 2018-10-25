import React, { Component } from 'react'

class Login extends Component {
  handleSubmit = () => {
    alert('登录')
  }
  render() {
    return (
      <div className={`lcgc-login ${this.props.className || ''}`}>
        <label>
          <span>用户名：</span>
          <input type="text" />
        </label>
        <label>
          <span>密码：</span>
          <input type="password" />
        </label>
        <button onClick={this.handleSubmit}>登录</button>
      </div>
    )
  }
}

export default Login

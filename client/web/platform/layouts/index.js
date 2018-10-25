import './index.less'

import React, { Component } from 'react'
import Layout, { Header, Content } from 'antd/lib/layout'
import Menu, { SubMenu } from 'antd/lib/menu'
import BackTop from 'antd/lib/back-top'
import Icon from 'antd/lib/icon'
import { Link } from 'react-router-dom'

class MyLayout extends Component {
  render() {
    return (
      <Layout className="lcgc-layout">
        <BackTop target={() => document.getElementById('app')} />
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to="/">活动列表</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/template">页面模板</Link>
            </Menu.Item>
          </Menu>
          <div>
            <Menu theme="dark" mode="horizontal">
              <SubMenu
                style={{
                  float: 'right'
                }}
                title={
                  <span>
                    <Icon type="user" />
                    zhongxia
                  </span>
                }
              >
                <Menu.Item key="logout">注销</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </Header>
        <Content>{this.props.children}</Content>
      </Layout>
    )
  }
}

export default MyLayout

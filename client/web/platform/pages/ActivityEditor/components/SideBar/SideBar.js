import './SideBar.less'

import React, { Component } from 'react'
import { CATEGORYS, COMPONENTS } from 'modules/config'

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCategory: '',
      compeonts: COMPONENTS
    }
  }

  getComponent = key => {
    return COMPONENTS.filter(item => {
      if (!key) return true
      return item['category'] === key
    })
  }

  handleCategory = key => {
    let newComponents = this.getComponent(key)
    this.setState({
      currentCategory: key,
      compeonts: newComponents
    })
  }

  renderComponent(item, key) {
    const { onClick = () => {} } = this.props
    return (
      <li key={key}>
        <div>
          <img src={item['img']} alt="组件外观" />
          <p>{item['name']}</p>
        </div>
        <div className="category__btn" onClick={onClick.bind(this, item)}>
          使用该组件
        </div>
      </li>
    )
  }

  render() {
    const { currentCategory, compeonts } = this.state
    return (
      <div className="ae-sidebar">
        <div className="ae-sidebar__list">
          <div className="ae-sidebar__categorys">
            {CATEGORYS &&
              CATEGORYS.map((item, index) => (
                <span
                  key={index}
                  className={currentCategory === item['key'] ? 'category--active' : ''}
                  onClick={this.handleCategory.bind(this, item['key'])}
                >
                  {item['name']}
                </span>
              ))}
          </div>
          <ul>
            {compeonts &&
              compeonts.map((item, index) => {
                return this.renderComponent(item, index)
              })}
          </ul>
        </div>
      </div>
    )
  }
}

export default SideBar

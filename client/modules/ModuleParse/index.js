/**
 * 配置解析器
 * 该配置解析器是开发环境使用的，会把组件包一层，添加一个选中的效果
 */
import "./index.less"
import React, { Component } from "react"
import HocBorder from "./HocBorder"

class ModuleParse extends Component {
  render() {
    const { current, modules = [] } = this.props
    return (
      <div className="module-parse">
        {modules &&
          modules.map((item, index) => {
            try {
              const Component = require(`../${item["component"]}`).default
              if (!Component) return <p>null</p>
              // 选中当前模块，则出现高亮边框标识下
              if (current === index) {
                let HocComponent = HocBorder(Component)
                return <HocComponent key={index} {...item["data"]} />
              }
              return <Component key={index} {...item["data"]} />
            } catch (error) {
              console.log("parse modules error:", error)
              return ""
            }
          })}
      </div>
    )
  }
}

export default ModuleParse

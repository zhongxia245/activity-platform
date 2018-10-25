import './IFrame.less'
import React, { Component } from 'react'

class IFrame extends Component {
  render() {
    const { src, data = {} } = this.props
    return (
      <div className="iframe__warrper">
        <div className="iframe__header">
          <span>返回</span>
          <p>{data['title'] || '标题'}</p>
          <span>{data['hasShare'] ? '分享' : ''}</span>
        </div>
        <iframe
          ref={dom => {
            this.$iframe = dom
          }}
          id="preview"
          className="iframe"
          src={src}
        />
      </div>
    )
  }
}

export default IFrame

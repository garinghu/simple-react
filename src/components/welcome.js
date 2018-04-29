import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Rate } from 'antd';

@observer
class Welcome extends Component {
  render () {
    let { store } = this.props

    return (
      <div>
        <span>{ store.data }</span>
        <Rate />
      </div>
    )
  }
}

export default Welcome

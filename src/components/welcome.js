import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Rate } from 'antd';
import './welcome.less'

class Welcome extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }
  render () {
    let { mobxstore } = this.props

    return (
      <div>
        <span>{mobxstore.data}</span>
        <Rate />
      </div>
    )
  }
}

export default Welcome

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Icon, Form, Input, Button, Checkbox } from 'antd'
import {withRouter} from 'react-router-dom'
import './index.less'

const FormItem = Form.Item

class Login extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log(this.props.history)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.history.push('/search')
      }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="dba-login-container">
        <div className="logo">
          <Icon type="dot-chart" style={{color: '#409EFF', fontSize: '300px'}}/>
          <p className="title" style={{color: '#409EFF', fontSize: '30px', marginTop:'20px'}}>软件工程专业工作管理系统</p>
        </div>

        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登陆
            </Button>
        </Form>

        <div className="footer">
            <p>技术支持：API@谷田  前端@胡家麟</p>
        </div>
      </div>
    )
  }
}

const WrappedNormalLogin = Form.create()(Login)
export default withRouter(WrappedNormalLogin)

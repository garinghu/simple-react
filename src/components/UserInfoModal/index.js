import { Button, Modal, Form, Input, Radio } from 'antd'
const FormItem = Form.Item

Axios.defaults.withCredentials = true

const UserInfoItem = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        }
      }
      return (
        <Modal
          visible={visible}
          title="修改个人信息"
          okText="确定"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="手机号" {...formItemLayout}>
              {getFieldDecorator('phone', {
                initialValue: this.props.data,
                rules: [{ required: false, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
)

export default UserInfoItem
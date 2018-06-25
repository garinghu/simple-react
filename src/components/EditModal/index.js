import { Button, Modal, Form, Input, Select } from 'antd'
const FormItem = Form.Item
const Option = Select.Option; 

const EditModal = Form.create()(
    class extends React.Component {

        componentDidMount() {
            console.log(this.props.data)
        }
        render() {
            const { visible, onCancel, onCreate, form, data } = this.props
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
                        {data.map((item, index) => {
                            return <FormItem label={item.title} {...formItemLayout}>
                                {getFieldDecorator(item.key, {
                                    initialValue: item.value,
                                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                                })(
                                    item.type == 'select' ? <Select>
                                        {
                                            item.data.map((item, index) => {
                                                return <Option value={item.value}>{item.title}</Option>
                                            })
                                        }
                                    </Select>
                                    : <Input/>
                                )
                            }
                            </FormItem>
                        })}
                    </Form>
                </Modal>
            )
        }
    }
)

export default EditModal
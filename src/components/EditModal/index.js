import { Button, Modal, Form, Input, Select, DatePicker } from 'antd'
import moment from 'moment'
const FormItem = Form.Item
const Option = Select.Option; 
const { RangePicker } = DatePicker;

const EditModal = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                teacherData: [],
                multiData: this.props.data.map((item) => {
                    if(item.key == 'teacher') {
                        return item.value
                    }
                }),
            }
        }

        componentDidMount() {
            console.log(this.props.data)
            Axios.get('http://dba.nefuer.net/api/multselect/teacher')
                .then((res) => {
                    this.setState({
                        teacherData: res.data.data
                    })
                })
        }
        handleChange = (value) => {
            this.setState({
                multiData: value
            })
        }


        componentWillReceiveProps(props) {
            console.log('asdasdasdasd', this.props.data)
        }

        renderOptions() {
            return this.state.teacherData
        }

        renderInput(item) {
            if(item.type == 'select') {
                return <Select>
                    <Option value="0">否</Option>
                    <Option value="1">是</Option>
                </Select>
            } else if(item.type == 'time') {
                return <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                        />
            } else if(item.type == 'input') {
                return <Input/>
            } else if(item.type == 'multselect'){
                return <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        onChange={this.handleChange}
                        tokenSeparators={[',']}
                        value={this.state.multiData}
                    >
                    {this.state.teacherData.map((item, index) => {
                        return <Option value={`${item.id}`} key={`${item.id}`}>{item.name}</Option>
                    })}
                </Select>
            }
        }

        getRules(item) {
            if(item.type == 'time') {
                return {
                    initialValue: moment(item.value),
                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                } 
            } else if(item.type == 'multselect') {
                console.log(item.value)
                return {
                    initialValue: item.value,
                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                }
            }else {
                return  {
                    initialValue: item.value,
                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                }
            }
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
                    title="编辑"
                    okText="确定"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                    {data.map((item, index) => {
                        return <FormItem label={item.title} {...formItemLayout} key={item.title}>
                        {getFieldDecorator(item.key, this.getRules(item))(
                            this.renderInput(item)
                        )
                    }
                        </FormItem>
                    })}
                    <div className="error" style={{color: '#f00'}}>{this.props.errMsg}</div>
                    </Form>
                </Modal>
            )
        }
    }
)

export default EditModal
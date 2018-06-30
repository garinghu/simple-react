import { Button, Modal, Form, Input, Select, DatePicker } from 'antd'
const FormItem = Form.Item
const Option = Select.Option; 
const { RangePicker } = DatePicker;

const AddModal = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                teacherData: [],
                multiData: [],
            }
        }

        componentDidMount() {
            Axios.get('http://dba.nefuer.net/api/multselect/teacher')
                .then((res) => {
                    this.setState({
                        teacherData: res.data.data
                    })
                })
        }

        renderOptions() {
            return this.state.teacherData
        }
        handleChange = (value) => {
            this.setState({
                multiData: value
            })
        }

        renderInput(item) {
            if(item.type == 'select') {
                return <Select>
                    {
                        Object.keys(item.selections).map((inneritem, index) => {
                            return <Option value={inneritem}>{item.selections[inneritem]}</Option>
                        })
                    }
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
                        tokenSeparators={[',']}
                        onChange={this.handleChange}
                        value={this.state.multiData}
                    >
                    {this.state.teacherData.map((item, index) => {
                        return <Option value={`${item.id}`} key={`${item.id}`}>{item.name}</Option>
                    })}
                </Select>
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
                    title="添加"
                    okText="确定"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                    {data.map((item, index) => {
                        return <FormItem label={item.title} {...formItemLayout}>
                        {getFieldDecorator(item.key,
                            {initialValue: item.type == 'multselect' ? [] :item.value,
                        })(
                            this.renderInput(item)
                        )
                    }
                        </FormItem>
                    })}
                    </Form>
                    <div className="error" style={{color: '#f00'}}>{this.props.errMsg}</div>
                </Modal>
            )
        }
    }
)

export default AddModal
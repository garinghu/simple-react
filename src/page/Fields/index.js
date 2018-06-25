import { Form, Row, Col, Input, Button, Icon, Select, Table, Divider, Modal } from 'antd';

import EditModal from '../../components/EditModal'
import './index.less'
const FormItem = Form.Item;
const Option = Select.Option; 

function translate(str) {
    switch (str)
    {
        case 'subject':
            return '课程名'
            break;
        case 'time':
            return '时间'
            break;
        case 'teacher':
            return '监考教师'
            break;
        case 'address':
            return '地点'
            break;
    }
}

class AdvancedSearchForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            actionModalShow: false,
            actionModalType: '',
            tableSearch: [],
            colums: [],
            tableData: [],
            curRowData: {},
        }
    }

    componentWillReceiveProps(props) {
        console.log(props.curMenuKey)
    }

    componentDidMount() {
        Axios.get('/api/tablesearch')
            .then((res) => {
                const {tableSearch, colums, tableData, actions} = res.data.data
                colums.push(
                    {
                        title: '操作',
                        key: 'action',
                        render: (text, record) => (
                            <span>
                                {
                                    actions.map((item, index) => {
                                        return (
                                            <span>
                                                <a href="javascript:;" onClick={() => this.actionHandle(item.value, record)}>{item.title}</a>
                                                <Divider type="vertical" />
                                            </span>
                                        )
                                    })
                                }
                            </span>
                        ),
                    }
                )
                this.setState({ tableSearch, colums, tableData })
            })
    }

    actionHandle(type, record, text) {
        console.log(record)
        this.setState({
            actionModalShow: true,
            actionModalType: type,
            curRowData: record,
        })
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
        if (err) {
            return;
        }
    
        console.log('Received values of form: ', values);
        form.resetFields();
        this.setState({ actionModalShow: false });
        });
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    renderModal(type, data) {

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
        delete data.id
        delete data.key
        if(type == 'watch') { 
            return    <Modal
                    title="查看页"
                    visible={this.state.actionModalShow}
                    onOk={() => this.setState({actionModalShow: false})}
                    onCancel={() => this.setState({actionModalShow: false})}
                >
                    <Form layout="vertical">
                        {Object.keys(data).map((item) => {
                            return <FormItem label={translate(item)} {...formItemLayout}>
                                <Input value={data[item]} disabled/>
                            </FormItem>
                        })}
                    </Form>
                </Modal>
        }else if(type == 'edit') {
            return  <EditModal 
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.actionModalShow}
                        onCancel={() => this.setState({actionModalShow: false})}
                        onCreate={this.handleCreate}
                        data={this.getEditFields(this.state.tableSearch, this.state.curRowData)}
                    />
        }
    }

    getFields() {
        const { getFieldDecorator } = this.props.form;
        return this.state.tableSearch.map((item, index) => {
            return <Col span={8} key={index}>
                <FormItem label={item.title}>
                    {getFieldDecorator(item.key, {
                        rules: [{
                        required: false,
                        message: 'Input something!',
                        }],
                    })(
                        item.type == 'select' ? <Select>
                            {
                                item.data.map((item, index) => {
                                    return <Option value={item.value}>{item.title}</Option>
                                })
                            }
                        </Select>
                        : <Input />
                    )}
                </FormItem>
            </Col>
        })
    }

    getEditFields(search, curData) {
        let x = []
        search.map((item, index) => {
            if(curData[item.key]) {
                item.value = curData[item.key]
                x.push(item)
            }
        })
        return x
    }

    render() {
        return (
            <div>
                <Form
                    className="ant-advanced-search-form"
                    onSubmit={this.handleSearch}
                >
                    <Row gutter={24}>{this.getFields()}</Row>
                    <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" icon="plus">添加</Button>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                        清空
                        </Button>
                    </Col>
                    </Row>
                </Form>
                <Table bordered columns={this.state.colums} dataSource={this.state.tableData} className="ant-advanced-search-table" style={{
                    margin: '20px 10px 0 10px',
                    border: '1px solid #d9d9d9',
                    paddingBottom: '10px'
                }}/>
                {this.renderModal(this.state.actionModalType, this.state.curRowData)}
            </div>
        );
    }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

export default WrappedAdvancedSearchForm
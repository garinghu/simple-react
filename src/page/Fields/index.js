import { Form, Row, Col, Input, Button, Icon, Select, Table, Divider, Modal, DatePicker, Alert} from 'antd';

import EditModal from '../../components/EditModal'
import AddModal from '../../components/AddModal'
import './index.less'
const FormItem = Form.Item;
const Option = Select.Option; 
const { RangePicker } = DatePicker;

let addConfirmdata = ''

Axios.defaults.withCredentials = true

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
        case 'start':
            return '起始时间'
            break;
        case 'end':
            return '结束时间'
            break;
        case 'name':
            return '姓名'
            break;
        case 'account':
            return '账号'
            break;
        case 'phone':
            return '手机号'
            break;
        case 'admin':
            return '管理员'
            break;
    }
}

class AdvancedSearchForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            actionModalShow: false,
            addModalShow: false,
            actionModalType: '',
            tableSearch: [],
            colums: [],
            tableData: [],
            curRowData: {},
            addColums: [],
            editUri: '',
            deleteUri: '',
            addUri: '',
            searchUri: '',
            remindUri: '',
            teacherData: [],
            addErrorMsg: '',
            editConfirm: false,
            addConfirm: false,
            buttons: [],
        }
    }


    changeBaseData = (data) => {
        console.log(data)
        let {tableSearch, colums, tableData, actions, buttons} = data
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

        actions.map((item, index) => {
            if(item.value == 'edit') {
                this.setState({
                    editUri: item.uri
                })
            } else if(item.value == 'delete') {
                this.setState({
                    deleteUri: item.uri
                })
            } else if(item.value == 'remind') {
                this.setState({
                    remindUri: item.uri
                })
            }
        })
        let addColums = [];
        buttons.map((item) => {
            if(item.type == 'modal') {
                this.setState({
                    addUri: item.uri
                })
                addColums = item.colums
            }
        })
        this.setState({ tableSearch, colums, tableData, addColums, buttons })
    }

    componentWillReceiveProps(props) {
        if(this.props.curMenuKey != props.curMenuKey) {
            Axios.get('http://dba.nefuer.net' + props.curMenuKey)
            .then((res) => {
                this.changeBaseData(res.data.data)
            })
        }
    }

    componentDidMount() {
        Axios.get('http://dba.nefuer.net/api/table/exam')
            .then((res) => {
                this.changeBaseData(res.data.data)
            })

        Axios.get('http://dba.nefuer.net/api/multselect/teacher')
        .then((res) => {
            this.setState({
                teacherData: res.data.data
            })
        })
    }

    actionHandle(type, record) {
        if(type == 'delete') {
            let x = {
                id: record.id
            }
            Axios.post('http://dba.nefuer.net' + this.state.deleteUri + `?status=${this.props.curMenuKey}`, x)
            .then((res) => {
                this.changeBaseData(res.data.data)
            })
       
        }
        this.setState({
            actionModalShow: true,
            actionModalType: type,
            curRowData: record,
        })
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let postData = []
            Object.keys(values).map((item, index) => {
                if(values[item]) {
                    postData.push(`${item}=${values[item]}`)
                }
            })
            postData = postData.join('&')
            if(this.props.curMenuKey.indexOf('?') != -1) {
                Axios.get('http://dba.nefuer.net' + this.props.curMenuKey + '&' + postData)
                    .then((res) => {
                        this.changeBaseData(res.data.data)
                    })
            }else {
                Axios.get('http://dba.nefuer.net' + this.props.curMenuKey + '?' + postData)
                    .then((res) => {
                        this.changeBaseData(res.data.data)
                    })
            }

        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    addHandleCreate = () => {
        const form = this.formRef.props.form;
        console.log('asdasdasdasd')
        form.validateFields((err, values) => {
            if (err) {
                console.log('asdasdasdasd', err)
                return;
            }
            // let x = Object.assign({}, values)
            // Object.keys(x).map((item, index) => {
            //     if(item == 'teacher') {
            //         x[item].map((inneritem, index) => {
            //             x[item][index] = inneritem.split('-')[1]
            //         })
            //     }
            // })
            console.log(values)
            if(this.state.addConfirm) {
                values.confirm = true
                Axios.post('http://dba.nefuer.net' + this.state.addUri, values)
                    .then((res) => {
                        // console.log(res.data)
                        if(res.data.errmsg != 'OK') {
                            this.setState({
                                addErrorMsg: res.data.errmsg
                            })
                        } else {
                            this.changeBaseData(res.data.data)
                            form.resetFields();
                            this.setState({ addModalShow: false, addConfirm: false});
                        }
                        
                    }) 
            }else {
                Axios.post('http://dba.nefuer.net' + this.state.addUri, values)
                    .then((res) => {
                        // console.log(res.data)
                        if(res.data.errmsg != 'OK') {
                            this.setState({
                                addErrorMsg: res.data.errmsg,
                                addConfirm: true,
                            })
                        } else {
                            this.changeBaseData(res.data.data)
                            form.resetFields();
                            this.setState({ addModalShow: false });
                        }
                        
                    }) 
            }
        });
    }

    editHandleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.id = this.state.curRowData.id
            if(this.state.editConfirm) {
                values.confirm = true
                Axios.post('http://dba.nefuer.net' + this.state.editUri, values)
                    .then((res) => {
                        if(res.data.errmsg != 'OK') {
                            this.setState({
                                addErrorMsg: res.data.errmsg
                            })
                        } else {
                            this.changeBaseData(res.data.data)
                            form.resetFields();
                            this.setState({ actionModalShow: false, editConfirm: false});
                        }
                        
                    }) 
            }else {
                Axios.post('http://dba.nefuer.net' + this.state.editUri, values)
                    .then((res) => {
                        // console.log(res.data)
                        if(res.data.errmsg != 'OK') {
                            this.setState({
                                editErrorMsg: res.data.errmsg,
                                editConfirm: true,
                            })
                        } else {
                            this.changeBaseData(res.data.data)
                            form.resetFields();
                            this.setState({ actionModalShow: false });
                        }
                        
                    }) 
            }
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
        // delete data.id
        // delete data.key
        if(type == 'watch') { 
            return    <Modal
                    title="查看页"
                    visible={this.state.actionModalShow}
                    onOk={() => this.setState({actionModalShow: false})}
                    onCancel={() => this.setState({actionModalShow: false})}
                >
                    <Form layout="vertical">
                        {Object.keys(data).map((item) => {
                            if(item != 'id' && item != 'key') {
                                return <FormItem label={translate(item)} {...formItemLayout}>
                                <Input value={data[item]} disabled/>
                            </FormItem>
                            }
                        })}
                    </Form>
                </Modal>
        }else if(type == 'edit') {
            return  <EditModal 
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.actionModalShow}
                    onCancel={() => this.setState({actionModalShow: false})}
                    onCreate={this.editHandleCreate}
                    data={this.getEditFields(this.state.tableSearch, this.state.curRowData)}
                    errMsg={this.state.editErrorMsg}
                />
        }
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
                    mode="multiple"
                    style={{ width: '100%' }}
                    onChange={this.handleChange}
                    tokenSeparators={[',']}
                >
                {this.state.teacherData.map((item, index) => {
                    return <Option value={`${item.id}`} key={`${item.id}`} >{item.name}</Option>
                })}
            </Select>
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
                        this.renderInput(item)
                    )}
                </FormItem>
            </Col>
        })
    }
    // 去除教师的-
    deleteSmallinArray(data) {
        data.map((item, index) => {
            if(data[index].indexOf('-') != -1) {
                data[index] = item.split('-')[1]
            }
        })
        return data
    }

    getEditFields(search, curData) {
        
        let x = []
        this.state.colums.map((item, index) => {
            if(item.type) {
                let y = {}
                y.type = item.type
                y.key = item.key
                y.title = item.title
                y.value = curData[item.key] instanceof Array ? this.deleteSmallinArray(curData[item.key]):curData[item.key]
                x.push(y)
            }
        })
        return x
    }

    renderAddModal = () => {
        return  <AddModal 
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.addModalShow}
            onCancel={() => this.setState({addModalShow: false})}
            onCreate={this.addHandleCreate}
            data={this.state.addColums}
            errMsg={this.state.addErrorMsg}
        />
    }

    renderButton = () => {

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
                        {
                            this.state.buttons.length > 1 ? 
                            <Button type="primary" icon="plus" onClick={() => this.setState({ addModalShow: true })}>添加</Button>
                            : 
                            <span></span>
                        }
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                        清空
                        </Button>
                    </Col>
                    </Row>
                </Form>
                {this.renderAddModal()}
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
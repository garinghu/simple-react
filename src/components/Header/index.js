import { Menu, Icon, Button } from 'antd'
import UserInfoMenu from '../UserInfoModal'
import './index.less'
Axios.defaults.withCredentials = true
class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            visible: false,
            phone: '',
        }
    }

    componentDidMount() {
        Axios.get('http://dba.nefuer.net/api/table/teacher/self')
                .then((res) => {
                    this.setState({
                        userName: res.data.data.name,
                        phone: res.data.data.phone
                    })
                    console.log(res)
                })
    }

    showModal = () => {
        this.setState({ visible: true });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
        if (err) {
            return;
        }

        Axios.post('http://dba.nefuer.net/api/table/teacher/edit/self', values)
                    .then((res) => {
                        // console.log(res.data)
                    }) 
    
        console.log('Received values of form: ', values);
        form.resetFields();
        this.setState({ visible: false });
        });
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    changeCurMenu = (key) => {
        this.setState({
            curMenuKey: key
        })
    }
    render() {
        return (
            <div className="dba-header-container">
                <div className="user" onClick={this.showModal}>
                    <Icon type="user" className="user"/>
                </div> 
                <p className="userName">{this.state.userName}</p>

                <UserInfoMenu
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    data={this.state.phone}
                />
            </div>
        )
    }
}

export default Header

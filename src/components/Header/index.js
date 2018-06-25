import { Menu, Icon, Button } from 'antd'
import UserInfoMenu from '../UserInfoModal'
import './index.less'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: 'GaringHu',
            visible: false,
        }
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
                />
            </div>
        )
    }
}

export default Header

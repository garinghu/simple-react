import { Menu, Icon, Button } from 'antd'
import './index.less'

const SubMenu = Menu.SubMenu

class dbaMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            menuData: [],
        }
    }

    componentDidMount() {
        Axios.get('/api/menudata')
            .then((res) => {
                const menuData = res.data.data
                this.setState({ menuData })
            })
    }

    menuItemClickHandle = (key) => {
        this.props.changeCurMenu(key)
    }

    renderMenu() {
        return this.state.menuData.map((item, index) => {
            return (
                <SubMenu key={item.title} title={<span><Icon type="mail" /><span>{item.title}</span></span>}>
                    {(item.children || []).map((chItem, chIndex) => {
                        return  <Menu.Item key={chItem.key} onClick={() => {this.menuItemClickHandle(chItem.key)}}>{chItem.title}</Menu.Item>
                    })}
                </SubMenu>
            )
        })
    }
    render() {
        return (
            <div className="dba-menu-container">
                <div style={{ width: '100%' }}>
                    <div className="logo" >
                        <Icon type="dot-chart" style={{color: '#409EFF', fontSize: '30px', marginTop:'5px'}}/>
                        <span className="title">软件工程专业工作管理系统</span>
                    </div>
                    <Menu
                        defaultSelectedKeys={['invigilate-unassigned']}
                        defaultOpenKeys={['监考信息']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={this.state.collapsed}
                        style={{minHeight:'100vh'}}
                    >
                        {this.renderMenu()}
                    </Menu>
                </div>
            </div>
        )
    }
}

export default dbaMenu

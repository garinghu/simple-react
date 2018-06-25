import { Menu, Icon, Button } from 'antd'

import Fields from '../Fields'
import DbaMenu from '../../components/Menu'
import Header from '../../components/Header'
import './index.less'

class Invigilate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            curMenuKey: ''
        }
    }

    changeCurMenu = (key) => {
        this.setState({
            curMenuKey: key
        })
    }
    render() {
        return (
            <div className="dba-invigilate-container">
                <div className="menu">
                    <DbaMenu changeCurMenu={this.changeCurMenu}/>
                </div>
                <div className="item">
                    <Header />
                    <Fields curMenuKey={this.state.curMenuKey}/>
                </div>
            </div>
        )
    }
}

export default Invigilate

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './HeaderBar.css';
import { Button , Layout} from 'antd';
import { withRouter } from "react-router-dom";
const { Header } = Layout;


class HeaderBar extends Component{

    logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("userInfor");
        window.location.reload();

    }

    render(){

        return(
            <Header className="header-logo">
                    <div >
                        <img />
                        <h1>Kakuro</h1>
                    </div>
                    <Button onClick={this.logout}>Log out</Button>
            </Header>
         
        )
    }
}

export default withRouter(HeaderBar)


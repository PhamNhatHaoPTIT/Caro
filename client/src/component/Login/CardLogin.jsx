import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Login.css';
import Api from '../../api/Api'
import { Form, Icon, Input, Button, Card } from 'antd';
import * as indexAction from '../../action/index'
import {connect} from "react-redux"
import { withRouter } from "react-router-dom";


class CardLogin extends Component{

    login(username, password){
        const api = new Api();
        const user ={
            username: username,
            password: password,
        }

        return new Promise((resolve,reject) =>{
            api.post('login',user).then((response)=>{
                console.log(response.data)
                localStorage.setItem('userInfor',JSON.stringify(response.data.user))
                localStorage.setItem('token',JSON.stringify(response.data.token))

                this.props.addUserInfor(response.data.user);

                if(response.status===200)
                    this.props.history.push({
                    pathname: '/',
                  })
                    
            }).catch((err)=>{
                console.log("login err",err);
            })
        })

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.login(values.username,values.password);

          }
        });
      };
    
    render(){
        const { getFieldDecorator } = this.props.form;

        return(
            
            <Card title="Login" className="login-card">
                
                <Form onSubmit={this.handleSubmit} className="login-form">
                    
                    <Form.Item>
                        Or <a href="">Create an account!</a>
                    </Form.Item>
                    
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                    </Form.Item>
                    <Form.Item>

                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>

                    </Form.Item>

                </Form>
          </Card>
         
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        userInfor: state.userInfor,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        addUserInfor: userInfor => dispatch(indexAction.addUserInfor(userInfor))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(CardLogin)))


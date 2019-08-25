import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Signup.css';
import { Form, Icon, Input, Button, Card } from 'antd';
import Api from '../../api/Api'
import * as indexAction from '../../action/index'
import {connect} from "react-redux"
import { withRouter } from "react-router-dom";

class CardSignup extends Component{
    constructor(props){
        super(props);

        this.state = {
            signupErr : ''
        }
    }

    signup(values){
        const api = new Api();
        const user ={
            username: values.username,
            password: values.password,
        }

        return new Promise((resolve,reject) =>{
            api.post('register',user).then((response)=>{
                localStorage.setItem('userInfor',JSON.stringify(response.data.user))
                localStorage.setItem('token',JSON.stringify(response.data.token))

                this.props.addUserInfor(response.data.user);

                if(response.status===200)
                    this.props.history.push({
                    pathname: '/',
                  })
                  
            }).catch((err)=>{
                this.setState({
                    signupErr : "Username is existing, choose another one"
                })
                console.log("login err",err);
            })
        })

    }

    componentWillMount(){

    }

    handleSubmit = e => {


        e.preventDefault();
        this.props.form.validateFields((err, values) => {

          if (!err) {
                this.signup(values);
                
          }

        });
      };

    validateUsername = (rule, value, callback) => {
      
        const { form } = this.props;

        if ( form.getFieldValue('username').length <4 || form.getFieldValue('username').length >14) {
          callback('Username must length between 4 to 14');
        } else {
          callback();
        }
      };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };
    
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if ( form.getFieldValue('password').length <4 || form.getFieldValue('password').length >14) {
            callback('Password must length between 4 to 14');
          } else {
            if (value && this.state.confirmDirty) {
                form.validateFields(['confirm'], { force: true });
              }
            callback();
          }
       
      };
    
    render(){
        const { getFieldDecorator } = this.props.form;

        return(
            
            <Card title="Signup" className="Signup-card">
                <Form onSubmit={this.handleSubmit} className="Signup-form">
                    
                    <Form.Item>
                        <a href="/login">Having an account?</a>
                    </Form.Item>
                    
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [
                                { 
                                    required: true, message: 'Please input your username!' 
                                },
                                {
                                    validator: this.validateUsername,
                                }
                            ],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                            ],
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    
                    <Form.Item>
                        {getFieldDecorator('confirm', {
                            rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                            ],
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            />,
                        )}
                    </Form.Item>

                   <div className="signup_err">{this.state.signupErr}</div>
                    <Form.Item>

                    <Button type="primary" htmlType="submit" className="Signup-form-button">
                        Sign up 
                    </Button>

                    </Form.Item>

                </Form>
          </Card>
         
        )
    }
}


const mapDispatchToProps = (dispatch) =>{
    return{
        addUserInfor: userInfor => dispatch(indexAction.addUserInfor(userInfor))
    }
}


export default withRouter(connect(null, mapDispatchToProps)(Form.create()(CardSignup)))


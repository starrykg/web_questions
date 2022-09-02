import React, { Component } from "react";
import { Input } from 'antd';
import { Breadcrumb } from 'antd';
import { Button } from 'antd';
import { HashRouter as Router, Link, Route } from 'react-router-dom';

class Login extends Component{
  constructor(props){
    super(props);
    this.state={}
  }
  render(){
    return (
        <div className="login">
          <Breadcrumb className="bread">
            <Breadcrumb.Item>
              <Link to="/login">登录</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Input placeholder="用户名" />
          <Input type="password" placeholder="密码" />
          <Button className="login_btn" type="danger">登录</Button>
        </div>
    );
  }
}

export default Login;
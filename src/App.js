import React, { Component } from "react";
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css'; 
//公用组件
import Nav from './components/Nav.js'
//页面组件
import List from './components/pages/list.js'
import TestList from './components/pages/TestList.js'

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  componentWillMount(){
  }
  render(){
    return (
      <Router>
      <div className="App">
        <Nav/>
{/*
        <Route path="/" component={List} exact></Route>
*/}
        <Route path="/" component={TestList}></Route>
      </div>
      </Router>
    );
  }
};

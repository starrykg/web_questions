import React, { Component } from "react";
class Nav extends Component{
  constructor(props){
    super(props);
    this.state={}
  }
  render(){
    return (
      <div>
        <header className="App-header">
          <h3>题目</h3><h4>游客</h4>
        </header>
      </div>  
    );
  }
}

export default Nav;
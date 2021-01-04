import React,{ Component } from "react"
import ReactDOM from 'react-dom';
import "./Button.css"


export default class Button extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      button: true
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.setState({
      button:!this.state.button
    })
  }
  render(){
    return (
    <div className="container">
      <button className={this.state.button ? "buttonTrue": "buttonFalse"} onClick={this.handleClick}/>  
    </div>
    )
  }
  
}



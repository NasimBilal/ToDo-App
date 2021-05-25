import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      textContent : "",
      textArray : []
    }
  }
  textInput=(e)=>this.setState({textContent:e.target.value})
  
  addText=(e)=>{
    this.state.textArray.push(this.state.textContent)
    this.setState({textArray:this.state.textArray})
  }
  textRemove=(i)=>{
    if(!window.confirm("Are you sure you want to delete this?")){
      return;
    }
    this.state.textArray.splice(i,1);
    this.setState({textArray:this.state.textArray})
  }
  render(){
    return(
      <div className="app">
        <div className="mainHeading">
          <h1>ToDo List</h1>
        </div>
        <div className="subHeading">
          <br />
          <h2>  First Get Things Done 🌝 ☕ </h2>
        </div>
        <div className="input">
          <input onChange={this.textInput} type="text" placeholder="🖊️ Add item..." />
          <i onClick={this.addText} className="fas fa-plus"></i>
        </div>
        <div className="todos">
          {this.state.textArray.map((obj,index)=>{
            return (
            <div className="todo">
              <div className="left">
                <p>{obj}</p>
              </div>
              <div className="right">
                <i onClick={()=>{this.textRemove(index)}} className="fas fa-times" aria-hidden="true"></i>
              </div>
            </div>)
          })}
        </div>
      </div>
    )    
  }
}


export default App;
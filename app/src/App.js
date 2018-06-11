import React, { Component } from 'react';
import './App.css';
import BottomNav from './BottomNav';
import Home from './Home';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <div className="App" style={{position:"absolute",bottom:0,top:0,left:0,right:0}}>
        {/* <Home/>
        <BottomNav/> */}
        <Login/>
      </div>
    );
  }
}

export default App;

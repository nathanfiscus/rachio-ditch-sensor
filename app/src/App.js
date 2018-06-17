import React, { Component } from "react";
import "./App.css";
import BottomNav from "./BottomNav";
import Home from "./Home";
import Config from "./Config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panel: 0
    };
  }

  handlePanelChange = value => {
    this.setState({
      panel: value
    });
  };

  render() {
    return (
      <div
        className="App"
        style={{ position: "absolute", bottom: 0, top: 0, left: 0, right: 0 }}
      >
        {this.state.panel === 0 && <Home />}
        {this.state.panel === 1 && <Config />}
        <BottomNav onChange={this.handlePanelChange} />
      </div>
    );
  }
}

export default App;

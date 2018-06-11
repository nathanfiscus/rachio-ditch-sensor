import React, { Component } from "react";
import { Typography, TextField, Button } from "@material-ui/core";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleChange(key) {
    return e => {
      this.setState({ [key]: e.target.value });
    };
  }
  render() {
    return (
      <div
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      >
        <div style={{ width: "300px", margin: "auto" }}>
          <form action="/api/login" method="post">
            <Typography variant="title">Rachio Ditch Sensor</Typography>
            <TextField
              name="username"
              value={this.state.username}
              onChange={this.handleChange("username")}
              fullWidth
            />
            <TextField
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange("password")}
              fullWidth
            />
            <br />
            <br />
            <Button color="primary" fullWidth type="submit" variant="raised">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;

import React, { Component } from "react";
import { CircularProgress, Typography } from "@material-ui/core";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      threshold: 175,
      adcValue: 0
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ adcValue: 150, loading: false });
      setTimeout(() => {
        this.setState({ adcValue: 450 });
      }, 2000);
    }, 2000);
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}
      >
        <div style={{ flex: "0 0" }}>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              width: "300px",
              height: "300px"
            }}
          >
            <div
              style={{
                position: "absolute",
                height: "300px",
                width: "100%",
                zIndex: "3",
                display: "flex",
                alignItems: "center"
              }}
            >
              <div style={{ flex: "1 1 100%" }}>
                <Typography variant="display3">
                  {this.state.loading
                    ? "--"
                    : Math.round((this.state.adcValue / 450) * 100) + "%"}
                </Typography>
                <Typography variant="subheading">Ditch Level</Typography>
              </div>
            </div>
            <div style={{ position: "absolute" }}>
              <CircularProgress
                size={300}
                thickness={5}
                value={Math.round((this.state.adcValue / 450) * 100)}
                variant={this.state.loading ? "indeterminate" : "static"}
                style={{
                  position: "absolute",
                  zIndex: "2",
                  color: this.state.loading
                    ? "#1565C0"
                    : this.state.adcValue >= this.state.threshold
                      ? "#4CAF50"
                      : "#e53935"
                }}
              />
              <CircularProgress
                size={300}
                thickness={5}
                value={100}
                variant={"static"}
                style={{ position: "absolute", zIndex: "1", color: "#eeeeee" }}
              />
            </div>
          </div>
        </div>
        {/* <div style={{flex:"0 0"}}>
        <Typography variant="headline">Rachio is {"ON"}</Typography>
        </div> */}
      </div>
    );
  }
}

export default Home;

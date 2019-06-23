import React from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from "@material-ui/core";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: window.location.protocol + "//" + window.location.hostname + ":9001"
});

class Config extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: "",
      deviceID: "",
      threshold: "",
      devices: [],
      dialogOpen: false
    };
  }

  componentDidMount() {
    axiosClient.get("/rachio/api-key").then(response => {
      this.setState({
        apiKey: response.data.apiKey
      });
    });
    axiosClient.get("/rachio/controller").then(response => {
      this.setState({
        deviceID: response.data.controller
      });
    });
    axiosClient.get("/sensor/threshold").then(response => {
      this.setState({
        threshold: response.data.threshold
      });
    });
  }

  lookupDevices = () => {
    this.setState({ dialogOpen: true });
    axiosClient.get("rachio/devices").then(response => {
      this.setState({
        devices: response.data
      });
    });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleListItemClick = deviceID => {
    this.setState({ deviceID });
    this.handleClose();
  };

  save = () => {
    axiosClient
      .patch("rachio/api-key", {
        apiKey: this.state.apiKey
      })
      .then(() => {
        axiosClient
          .patch("/rachio/controller", {
            controller: this.state.deviceID
          })
          .then(() => {
            axiosClient.patch("/sensor/threshold", {
              threshold: this.state.threshold
            });
          });
      });
  };

  onAPIKeyChange = e => {
    this.setState({ apiKey: e.target.value });
  };

  onThresholdChange = e => {
    this.setState({ threshold: e.target.value });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          height: "100%"
        }}
      >
        <div style={{ width: "100%", maxWidth: "300px" }}>
          <TextField
            value={this.state.apiKey}
            onChange={this.onAPIKeyChange}
            label="Rachio API Key"
            fullWidth
          />
        </div>
        <div style={{ width: "100%", maxWidth: "300px" }}>
          <TextField
            value={this.state.deviceID}
            label="Rachio Device ID"
            fullWidth
          />
          <Button fullWidth onClick={this.lookupDevices}>
            Look-Up Devices
          </Button>
        </div>
        <div style={{ width: "100%", maxWidth: "300px" }}>
          <Button fullWidth onClick={this.save}>
            Save
          </Button>
        </div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          open={this.state.dialogOpen}
        >
          <DialogTitle id="simple-dialog-title">Select A Device</DialogTitle>
          <div>
            <List>
              {this.state.devices.map(device => (
                <ListItem
                  button
                  onClick={() => this.handleListItemClick(device.id)}
                  key={device.id}
                >
                  <ListItemText primary={device.name} secondary={device.id} />
                </ListItem>
              ))}
            </List>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Config;

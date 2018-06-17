import Settings from "./settings";
import axios from "axios";
import RachioClient from "rachio";
let lastCheck = "";

setInterval(() => {
  console.log("Taking Water Sample!");
  const settings = new Settings();
  const apiKey = settings.get("rachioAPIKey");
  const controller = settings.get("rachioController");
  const threshold = settings.get("sensorThreshold");

  if (apiKey !== "" && controller !== "") {
    axios
      .get("http://localhost:8080/")
      .then(response => {
        const rachio = new RachioClient(apiKey);
        const device = rachio.getDevice(controller).then(device => {
          if (response.data.adcValue > threshold) {
            // Ditch is Full
            console.log(device.status);
            //console.log(device);
            if (!device.on) {
              device.standbyOff();
              console.log("Bringing Rachio out of Stand-By");
            }
          } else {
            //Ditch is Empty
            if (device.isWatering()) {
              device.stopWater();
              console.log("Stopping Water");
            }
            if (device.on) {
              device.standbyOn();
              console.log("Putting Rachio in Stand-By");
            }
          }
        });
      })
      .catch(ex => {
        console.log(ex);
        try {
        } catch (ex) {
          console.log(ex);
        }
      });
  }
}, 240000);

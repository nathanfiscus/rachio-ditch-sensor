import fs from "fs";
const settingFolder = process.env.HOME + "/.rachio-ditch-sensor";
const settingLocation =
  process.env.HOME + "/.rachio-ditch-sensor/settings.json";

class Settings {
  constructor() {
    this.settings = {};
    if (!fs.existsSync(settingLocation)) {
      if (!fs.existsSync(settingFolder)) {
        fs.mkdirSync(settingFolder);
      }
      if (fs.existsSync(__dirname + "/settings.json")) {
        fs.copyFileSync(__dirname + "/settings.json", settingLocation);
      }
    }
    this.settings = JSON.parse(fs.readFileSync(settingLocation, "utf8"));
  }

  write(key, value) {
    this.settings[key] = value;
  }

  get(key) {
    return this.settings[key];
  }

  commit() {
    fs.writeFileSync(settingLocation, JSON.stringify(this.settings));
  }
}

export default Settings;

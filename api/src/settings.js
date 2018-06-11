import fs from 'fs';
const settingLocation = '~/.rachio-ditch-sensor/settings.json';

class Settings{
    constructor(){
        this.settings = {};
        if(!fs.exists(settingLocation)){
            fs.copyFileSync('./settings.json',settingLocation);
        }
        this.settings = JSON.parse(fs.readFileSync(settingLocation, 'utf8'));
    }

    set = (key,value) => {
        this.settings[key] = value;
    }

    get = (key) => {
        return this.settings[key]
    }

    commit = () => {
        fs.writeFile(settingLocation,JSON.stringify(this.settings));
    }
    
}


export default Settings;
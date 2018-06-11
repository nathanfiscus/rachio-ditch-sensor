import Settings from './settings';
import axios from './axios';
import RachioClient from 'rachio';
let lastCheck = '';

setTimeout(()=>{
    const settings = new Settings();
    const apiKey = settings.get('rachioAPIKey');
    const controller = settings.get('rachioController');
    const threshold = settings.get('sensorThreshold');

    if(apiKey !== '' && controller !== ''){
        axios.get('http://localhost:8080/').then((response)=>{
            const rachio = new RachioClient(apiKey);
            const device = rachio.getDevice(controller);
            if(response.data.adcValue > threshold){
                // Ditch is Full
                if(device.status !== 'ONLINE'){
                    device.standbyOff();
                }
            }else{
                //Ditch is Empty
                if(device.isWatering()){
                    device.stopWater();
                }
                if(device.status === 'ONLINE'){
                    device.standbyOn();
                }
            }
        }).catch(ex => {
            console.log(ex);
            try{
                
            }catch(ex){
                console.log(ex);
            }
        });
    }

  },120000);
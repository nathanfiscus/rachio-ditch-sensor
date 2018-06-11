import axios from 'axios';
import setting from '../../settings';

const settings = new setting();

export async function index(req,res){
    try{
        let response = axios.get("http://localhost:8080/");
        res.status(200).json(response).end();
    }catch(ex){
        console.log(ex);
        res.status(500).json().end();
    }
}

export async function getThreshold(req,res){
    try{
        const threshold = settings.get('sensorThreshold');
        res.status(200).json({threshold}).end();
    }catch(ex){
        console.log(ex);
        res.status(500).json().end();
    }
}

export async function patchThreshold(req,res){
    const {threshold} = req.body;
    if(!threshold){
        res.status(400).json().end();
        return;
    }
    try{
        settings.write('sensorThreshold',threshold);
        settings.commit();
        res.status(200).json({threshold}).end();
    }catch(ex){
        console.log(ex);
        res.status(500).json().end();
    }
}

export async function resetThreshold(req,res){
    try{
        const threshold = settings.write('sensorThreshold',100);
        settings.commit();
        res.status(200).json({threshold}).end();
    }catch(ex){
        console.log(ex);
        res.status(500).json().end();
    }
}
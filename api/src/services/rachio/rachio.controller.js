import axios from 'axios';
import RachioClient from 'rachio';
import setting from '../../settings';



export async function getAPIKey(req,res){
    try{
        const settings = new setting();
        const apiKey = settings.get('rachioAPIKey');
        res.status(200).json({apiKey}).end();
    }catch(ex){
        console.log(ex);
        res.status(500).json().end();
    }
}

export async function patchAPIKey(req,res){
    const {apiKey} = req.body;
    if(!apiKey){
        res.status(400).json().end();
        return;
    }
    try{
        const settings = new setting();
        settings.write('rachioAPIKey',apiKey);
        settings.commit();
        res.status(200).json({apiKey}).end();
    }catch(ex){
        console.log(ex);
        res.status(500).json().end();
    }
}

export async function getDevices(req,res){
    const apiKey = settings.get('apiKey');
    const rachio = RachioClient(apiKey);
    try{
        const response = await rachio.getDevices();
        res.status(200).json(response).end();
    }catch(ex){
        console.log(ex);
        res.status(500).json().end();
    }
}

export async function getController(req,res){
    try{
        const settings = new setting();
        const controller = settings.get('rachioController');
        res.status(200).json({controller}).end();
    }catch(ex){
        console.log(ex);
        res.status(500).json().end();
    }
}

export async function patchController(req,res){
    const {controller} = req.body;
    if(!controller){
        res.status(400).json().end();
        return;
    }
    try{
        const settings = new setting();
        settings.write('rachioController',controller);
        settings.commit();
        res.status(200).json({controller}).end();
    }catch(ex){
        console.log(ex);
        res.status(500).json().end();
    }
}

export async function getStatus(req,res){
    const {status} = req.body;
    if(!status || (status !== 'off' && status !== 'on')){
        res.status(400).json().end();
        return;
    }
    const settings = new setting();
    const apiKey = settings.get('apiKey');
    const controller = settings.get('rachioController');
    const rachio = RachioClient(apiKey);
    try{
        const response = await rachio.getDevice(controller);
        res.status(200).json({status: response.status}).end();
    }catch(ex){
        console.log(ex);
        res.status(500).json().end();
    }
}

export async function patchStatus(req,res){
    const settings = new setting();
    const apiKey = settings.get('apiKey');
    const controller = settings.get('rachioController');
    const rachio = RachioClient(apiKey);
    try{
        const response = await rachio.getDevice(controller);
        res.status(200).json({status: response.status}).end();
    }catch(ex){
        console.log(ex);
        res.status(500).json().end();
    }
}
import axios from 'axios';
import { rejects } from 'assert';

axios.defaults.timeout = 10000;

axios.defaults.baseURL='';


//拦截request
axios.interceptors.request.use(
    config =>{
        if(config.headers.contentType===undefined || config.headers.contentType===null){
            config.headers = {'Content-Type':'application/json'}
            config.data = JSON.stringify(config.data);
        }else{
            config.headers ={'Content-Type':config.headers.contentType}

        }

        for(let key in config.info){
            config.headers[key] = config, info[key];
        }

        //token

        return config;

    },
    error=>{
        return Promise.reject(error);
    }
    
);

//拦截response


//get method
export function get(url,params={}){
    return new Promise((resolve,rejects)=>{
        axios.get(url,{params:params}).then(response=>{
            resolve(response.data);
        }).catch(error=>{
            rejects(error);
        })
    });
}

//post method
export function post(url,data={},info={},contentType=null) {
    if(contentType){
        axios.defaults.headers.contentType = contentType;
    }
    axios.defaults.info = info;

    return new Promise((resolve,rejects)=>{
        axios.post(url,data,axios.defaults).then(response=>{
            if(contentType){
                axios.defaults.headers.contentType = 'application/json';
            }
            resolve(response.data);
        }
            
        ).catch(error=>{
            if(contentType) axios.defaults.headers.contentType = 'application/json';
            rejects(error);
            
        })
    });
}


export function put(url, data = {}, info = {}, contentType = null) {
    if (contentType) {
        axios.defaults.headers.contentType = contentType;
    }
    return new Promise((resolve, reject) => {
        axios.put(url, data, {
            info: info
        })
            .then(response => {
                if (contentType) axios.defaults.headers.contentType = 'application/json';
                resolve(response.data);
            })
            .catch(error => {
                if (contentType) axios.defaults.headers.contentType = 'application/json';
                reject(error)
            })
    })
}
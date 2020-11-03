import Axios from "axios";
import userService from '../../config/session'
import config from "../../config/config";
import {NOT_CONNECTED} from "../../config/urls";


Axios.defaults.baseURL = config.api;

Axios.interceptors.response.use(function (response) {

    if(response.data.data!==null){

        return response.data;
    } else {

        return  response;
    }
}, function (error) {


    if (!error.status && !error.response) {
        console.log('Sin conexión');
        window.location.href = `${NOT_CONNECTED}`;
        return;
    }

    const { response: { status }} = error;
    if(status === 401) {
        if(userService.getToken()) {
            userService.clearSession();
        }
    }
    return Promise.reject(error);
});

Axios.interceptors.request.use(function(config) {
    const token = userService.getToken();
    if ( token !== null ) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function(err) {
    return Promise.reject(err);
});

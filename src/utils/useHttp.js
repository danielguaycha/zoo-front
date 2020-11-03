import {useState} from 'react';
import axios from "axios";
import config from "../config/config";
import {processErrors} from "./utils";
const useHttp = (method='post', formData=false) => {

    const [loader, setLoader] = useState(false);


    const request = (url, data={}) => {
        return new Promise  ((resolve, reject) => {
            setLoader(true);
            let options = {
                method: method,
                baseURL: config.api,
                url,
                data,
            };

            if (formData) {
                options.headers = {
                    'content-type': 'multipart/form-data'
                }
            }

            axios(options).then(res => {
                setLoader(false);
                resolve(res);
            }).catch(err => {
                setLoader(false);
                reject(processErrors(err));
            })
        });
    };

    return {
        loader, request
    }
};
export default useHttp;

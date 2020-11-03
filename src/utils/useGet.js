import { useState, useEffect } from 'react';
import axios from "axios";
import config from "../config/config";
const useGet = (url) => {

    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);

    const get = (url) =>{
        setLoader(true);
        axios.get(url)
            .then(res => {
                if(res.ok) {
                    setData(res.data);
                }
                setLoader(false);
            }).catch(err => {
            if(err.response && err.response.data){
                setError(err.response.data);
            } else setError(err);
            setLoader(false);
            console.log("URL PATH ",config.api+url);
        });
    };


    useEffect(() => {

        get(url);

    }, [url]);

    return {
        loader, error, data, setData, get
    }
};
export default useGet;

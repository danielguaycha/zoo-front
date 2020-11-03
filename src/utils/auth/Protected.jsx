import React from 'react'
import {Route, Redirect} from 'react-router-dom';

import userService from '../../config/session';

const Protected = ({component: Component,...rest}) => {

    if (userService.getToken()) {
        return <Route component={Component}  {...rest}/>
    }
    //return <Route component={Component}  {...rest}/>
    return <Redirect to="/login"/>

};

export {Protected};

import React from 'react';
import {PropTypes} from "prop-types";
import {Info} from "@material-ui/icons";

const Alert = ({message, type, children, show }) => {

    if(show)
        return (
            <div className={"alert outline "+type.toLowerCase()}>
                <Info style={{marginRight: 5}}/>
                <div>
                    {message}
                </div>
            </div>);
    else return (<></>);
};

Alert.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
    show: PropTypes.bool
};

Alert.defaultProps = {
    type: 'err',
    show: false
};

export default Alert;

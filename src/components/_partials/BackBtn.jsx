import React from 'react';
import { useHistory } from "react-router-dom";
import {IconButton} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";

const BackBtn = () => {
    let history = useHistory();
    return (
            <div><IconButton onClick={() => history.goBack()}><ArrowBack /></IconButton></div>
    );
};

export default BackBtn;

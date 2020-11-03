import React from 'react';
import {CircularProgress, Paper} from "@material-ui/core";
import PropTypes from 'prop-types';
const WithLoader = ({ children, loader, text, elevation }) => {
    return (
        <>
            {
                loader === true
                    ? <Paper elevation={elevation} className="loader-container"> <CircularProgress color="secondary"/> <p>{text}</p> </Paper>
                    : children
            }
        </>
    );
};

WithLoader.propTypes = {
    text: PropTypes.string,
    loader: PropTypes.bool.isRequired
};

WithLoader.defaultProps = {
    text: 'Cargando...',
    loader: false,
    elevation: 2
};

export default WithLoader;

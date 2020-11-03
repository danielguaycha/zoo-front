import React from 'react';
import {Container, IconButton, Menu, MenuItem} from "@material-ui/core";
import {Menu as Men} from '@material-ui/icons'
import {Link, NavLink} from "react-router-dom";
import { withRouter } from "react-router";
import {ANIMAL_ADD, ANIMAL_LIST, HOME} from "../config/urls";
import userService from '../config/session';


const Admin = ({ children, history }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const logout = () => {
        userService.clearSession();
        history.push(HOME);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <div className={'home-nav'}>
                <Link to={HOME} className={'logo'}>
                    <img src="/img/logo.png" alt="Logo ZooApp"/>
                    ZooApp
                </Link>
                <div>
                    <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
                        <Men />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        <MenuItem component={NavLink} to={HOME} exact>Inicio</MenuItem>
                        <MenuItem component={NavLink} to={ANIMAL_LIST} exact>Listar Animales</MenuItem>
                        <MenuItem component={NavLink} to={ANIMAL_ADD} exact>Crear Animal</MenuItem>
                        <MenuItem onClick={() => logout()}>Cerrar sesión</MenuItem>
                    </Menu>
                </div>
            </div>
            <Container maxWidth="md">
                <div  className={'container'}>
                    {children}
                </div>
            </Container>
        </>
    );
};

export default withRouter(Admin);

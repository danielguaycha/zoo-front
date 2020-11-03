import React, {useEffect, useState} from 'react';
import {Container, TextField, Typography, Button, CssBaseline, Avatar, Paper, LinearProgress} from "@material-ui/core";
import useHttp from "../utils/useHttp";
import Alert from "../components/_partials/Alert";
import userService from '../config/session';
import {toast} from "react-toastify";
import {LOGIN_REDIRECT} from "../config/urls";

const Login = ({ history, setUser }) => {
    const [data, setData] = useState({username: '', password: ''});
    const login = useHttp();
    const user = useHttp('get');


    const [err, setErr] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        setErr(null);
        login.request('/login', data).then(res => {

            if(res.access_token) {
                userService.setSession({token: res.access_token});

                user.request('/user').then(res => {
                    login.loader = user.loader;
                    if(res){
                        history.push(LOGIN_REDIRECT);
                    } else {
                        toast.error('Algo ha salido mal, comuníquese con soporte');
                        localStorage.removeItem('token');
                    }
                }).finally(() => login.loader = user.loader);


            } else setErr('No se ha podido iniciar, consulte con soporte');

        }).catch(err => {
            if(err)
                setErr(err);
            else
                setErr('Error desconocido, comuniquese con soporte!');
        })
    };

    const onChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setData({
            ...data,
            [name]: value})
    };

    useEffect(() => {
        if(userService.getToken()) {
            history.push(LOGIN_REDIRECT);
        }
    }, [history]);

    return (
        <>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Paper className="form-login-content">
                    <Typography component="h1" variant="h5">
                        Iniciar sesión
                    </Typography>
                    <Avatar src="/img/logo.png" sizes="100"/>
                    <form onSubmit={ e => onSubmit(e)} className="form-login">

                        {/*Username*/}
                        <TextField variant="outlined" margin="normal"
                                   value={data.username}
                                   onChange={e => onChange(e)}
                                   required fullWidth type="text" label="Nombre de usuario"
                                   id="username"
                                   name="username"
                                   autoComplete="username"
                                   autoFocus/>

                        {/*Password*/}
                        <TextField variant="outlined" margin="normal"
                                   value={data.password}
                                   onChange={e => onChange(e)}
                                   required fullWidth label="Contraseña"
                                   name="password" type="password"
                                   id="password"
                                   autoComplete="current-password"/>

                        {/*Submit form*/}
                        <Alert message={err} show={err!==null}/>
                        { login.loader && <LinearProgress color="secondary" />}
                        <p><b>Usuario: </b> admin | <b>Contraseña:</b> admin</p>
                        <Button
                            disabled={login.loader}
                            type="submit"
                            variant="contained"
                            color="primary">
                            Iniciar
                        </Button>
                    </form>
                </Paper>
            </Container>
        </>
    );
};


export default Login;

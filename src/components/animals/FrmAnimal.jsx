import React, {useState} from 'react';
import useHttp from "../../utils/useHttp";
import {Grid, TextField, Button, LinearProgress} from "@material-ui/core";
import {Photo} from '@material-ui/icons'
import {toast} from "react-toastify";
import {asset} from "../../config/config";

const FrmAnimal = ({method, url, initialData, history}) => {

    const http = useHttp(method);
    const photo = useHttp('post');
    const [data, setData] = useState(initialData);

    const onChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setData({
            ...data,
            [name]: value});
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        let body;
        if (method === 'post') {
            body = new FormData();
            body.append('name', data.name);
            body.append('science_name', data.science_name);
            body.append('description', data.description);
            body.append('img',data.localImg);
        } else {
            body = data;
        }

        http.request(url, body).then(res => {
            if(res.ok) {
                toast.success('Animal guardado con éxito');
                if (method === 'post') {
                    setData({
                        name: '',
                        science_name:'',
                        description: '',
                        img: null
                    })
                }
            }
        }).catch(err =>{
            toast.error(err);
        })
    };

    const validate = () => {
        if (!data.name || !data.science_name) {
            toast.error('El nombre y nombre científico son requeridos');
            return false;
        }

        if (!data.description) {
            toast.error('La descripción es requerida')
            return false;
        }

        return true;
    }

    // process img
    const changeImg = (file) => {
        if (method==='put') {
            let body = new FormData();
            body.append('img',file);
            photo.request(`/animals/img/${data.id}`, body).then(res => {
                if (res.ok) {
                    toast.success('Imagen cambiada con éxito');
                }
            }).catch(err=>toast.error(err));
        }
    }

    const onChangeFile = e => {
        if(e.target.files.length > 0) {

            setData({
                ...data,
                localImg: e.target.files[0],
                showImage: URL.createObjectURL(e.target.files[0])
            })
            changeImg(e.target.files[0])
        }
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    {/*Nombre*/}
                    <TextField type='text' label='Nombre'
                               name='name' variant={'outlined'}
                               onChange={e => onChange(e)}
                               value={data.name.toUpperCase()}
                               inputProps={{ maxLength: 75 }}
                               required fullWidth autoFocus/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {/*Nombre científico*/}
                    <TextField type='text' label='Nombre cientifico'
                               name='science_name' variant={'outlined'}
                               onChange={e => onChange(e)}
                               inputProps={{ maxLength: 50 }}
                               required
                               value={data.science_name}
                               fullWidth />
                </Grid>
                {/*Descripción*/}
                <Grid item xs={12}>
                    <TextField
                        id="description"
                        label="Detalle | Descripción"
                        multiline
                        variant={'outlined'}
                        rows="3"
                        required
                        fullWidth
                        inputProps={{ maxLength: 200 }}
                        name='description'
                        onChange={e => onChange(e)}
                        value={data.description}
                    />
                </Grid>

                {/*Imagen*/}
                <Grid item xs={12} sm={12} style={{justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
                    {
                        data.showImage &&
                        <>
                            <div style={{padding: 10, display: 'flex', justifyContent: 'center'}}>
                                <img src={data.showImage} alt="Preview" height="200px"/>
                            </div>
                            <Button variant={'outlined'}
                                    onClick={() => setData({...data, showImage: null, localImg: null})}
                                    color={'secondary'}>Quitar Imagen</Button>
                        </>
                    }
                    {
                        method === 'put' && data.img && !data.showImage &&
                        <div style={{padding: 10, display: 'flex', justifyContent: 'center'}}>
                            <img src={asset(data.img)} alt="Preview" height="200px"/>
                        </div>
                    }

                    {!data.showImage &&
                    <Button
                        variant="outlined"
                        component="label"
                        color={'primary'}>
                        <Photo/>&nbsp;
                        { method==='post' ? 'Agregar' : 'Cambiar'} Imagen
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => onChangeFile(e)}
                        />
                    </Button> }
                </Grid>

                {/*Submit form*/}
                <Grid item xs={12} className='center'>
                    { http.loader && <LinearProgress color="secondary" />}
                    <br/>
                    <Button type='submit' color='primary'
                            disabled={http.loader}
                            variant='contained'>
                        { method === 'post' ? 'Guardar' : 'Actualizar'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};


FrmAnimal.defaultProps = {
    method: 'post',
    url: 'animals',
    initialData: {
        name: '',
        science_name: '',
        description: '',
        img: ''
    }
};


export default FrmAnimal;

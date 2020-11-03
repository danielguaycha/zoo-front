import React, {useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {ANIMAL_ADD} from "../../../config/urls";
import {Link} from "react-router-dom";
import {Add, Search} from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";

const HeadTable = ({onSearch}) => {
    const [search, setSearch] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        onSearch(search);
    }

    const onChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value.trim() === '') {
            onSearch('');
        }
    }

    return (
        <div className={'header-table'}>
            <div className={'title'}>
                <h3>ANIMALES</h3>
                <IconButton component={Link} to={ANIMAL_ADD} color={'primary'}>
                    <Add />
                </IconButton>
            </div>
            <form onSubmit={(e) => onSubmit(e)} >
                <TextField placeholder={'Buscar por: Nombre'} variant={'outlined'} margin={'dense'}
                           InputProps={{
                               endAdornment: (
                                   <InputAdornment position="end">
                                       <Search />
                                   </InputAdornment>
                               ),
                           }}
                           onChange={e => onChange(e)} />
            </form>
        </div>
    );
};

export default HeadTable;

import React, {useState} from 'react';
import {Search, Close} from "@material-ui/icons";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {SupervisedUserCircle} from '@material-ui/icons';
import {ANIMAL_LIST, HOME} from "../../config/urls";
const Nav = ({onSearch}) => {

    const [search, setSearch] = useState('');
    
    const onChange = (e) => {
        const target = e.target;
        const value = target.value;
        setSearch(value);
        if (value.trim() === '') {
            onSearch('');
        }
    };

    const onSubmitSearch = (e) => {
        e.preventDefault();
        onSearch(search);
        openSearch();
    }

    const openSearch = () => {
        document.getElementById('formSearch').classList.toggle('active');
        document.getElementById('txtSearch').focus();
    }

    return (
        <nav className={'home-nav'}>
            <Link to={HOME} className={'logo'}>
                <img src="/img/logo.png" alt="Logo ZooApp"/>
                ZooApp
            </Link>
            <div className={'left-nav'}>
                <form onSubmit={(e) => onSubmitSearch(e)} id={'formSearch'}>
                    <input type="search" autoFocus id={'txtSearch'}
                           placeholder={'Buscar'}
                           onChange={e => onChange(e)}/>
                    <button type={'submit'}>
                        <Search />
                    </button>
                    <button type={'button'} className={'color-red'} id={'closeSearch'} onClick={() => openSearch()}>
                        <Close />
                    </button>
                </form>
                <button type={'submit'} className={'open-search'} onClick={() => openSearch()}>
                    <Search />
                </button>
                <Link className={'btnAdmin'} to={ANIMAL_LIST}><SupervisedUserCircle />Administrar</Link>
            </div>
        </nav>
    );
};

Nav.propTypes = {
    onSearch: PropTypes.func,
};

export default Nav;

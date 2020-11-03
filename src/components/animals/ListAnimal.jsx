import React, {useEffect, useState} from 'react';
import Admin from "../../pages/Admin";
import useHttp from "../../utils/useHttp";
import {List} from "@material-ui/core";
import WithLoader from "../_partials/hoc/WithLoader";
import {Pagination} from "@material-ui/lab";

import HeadTable from "./_partials/HeadTable";
import DlgConfirm from "../_partials/dialogs/DlgConfirm";
import {toast} from "react-toastify";
import ItemAnimal from "./_partials/ItemAnimal";
import Axios from "axios";
import {processErrors} from "../../utils/utils";

const ListAnimal = () => {
    //const animals = useGet('/animals');
    const [animals, setAnimals] = useState({
        data: [],
        count: 0
    });
    const search = useHttp('get');
    const remove = useHttp('delete');

    const [selectAnimal, setSelectAnimal] = useState(null);
    const [confirm, setConfirm] = useState(false);


    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(true);

    // http methods
    useEffect(() => {
        const getAnimals = () => {
            let url = `/animals?limit=${15}&page=${page}`;
            setLoader(true);
            Axios.get(url).then(res => {
                if(res.ok) {
                    setAnimals({data: res.data, count: res.total});
                }
            })
                .catch(err => toast.error(processErrors(err)))
                .finally(() => setLoader(false));
        };
        getAnimals();
    }, [page]);

    const onSearch = (searchText) => {
        const url = `/animals?search=${searchText}&limit=15`;
        search.request(url).then(res => {
            if (res.ok) {
                setAnimals({...animals, data: res.data})
            }
        });
    };

    const deleteAnimal = () => {
        remove.request(`/animals/${selectAnimal}`).then(res => {
            console.log(res);
            if(res.ok){
                toast.success(res.data);
                let index = animals.data.findIndex(d => d.id === selectAnimal);
                animals.data.splice(index, 1);
            }
        }).catch(err => toast.error(err)).finally(() => {
            setConfirm(false);
            setSelectAnimal(null);
        });
    };

    // others
    const addSelectAnimal = (animalId) => {
        setSelectAnimal(animalId);
        setConfirm(true);
    };


    return (
        <Admin>
            <HeadTable onSearch={q => onSearch(q)} />
            <WithLoader loader={loader || search.loader} elevation={0}>
                <List>
                    { animals.data.map(a => {
                       return <ItemAnimal animal={a} key={a.id} onDelete={(e) => addSelectAnimal(a.id)}/>
                    })}
                </List>
            </WithLoader>

            { animals.data.length>0 && <Pagination
                className="my-3"
                count={Math.ceil(animals.count / 15)}
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={(e, val) => setPage(val)}
            />}

            {
                !loader && animals.data.length <= 0 && <div className={'text-mutted p-1'}>No existen animales</div>
            }

            <DlgConfirm onConfirm={ () => deleteAnimal()}
                        open={confirm}
                        loader={remove.loader}
                        onClose={() => setConfirm(false)}
                        desc={'¿Estas seguro que desea eliminar este animal?'}
                        title={`Marcar al animal ${selectAnimal} como eliminado`} />
        </Admin>
    );
};


export default ListAnimal;

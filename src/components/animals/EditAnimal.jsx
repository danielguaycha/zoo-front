import React from 'react';
import Admin from "../../pages/Admin";
import useGet from "../../utils/useGet";
import WithLoader from "../_partials/hoc/WithLoader";
import {Paper} from "@material-ui/core";
import FrmAnimal from "./FrmAnimal";
import BackBtn from "../_partials/BackBtn";


const EditAnimal = ({match}) => {
    const id = match.params.id;

    const animals = useGet(`/animals/${id}`);
    return (
        <Admin>
            <WithLoader loader={animals.loader} text={'Cargando datos del animal...'}>
                <Paper className='paper-content'>
                    <div className='paper-header'>
                        <BackBtn />
                        <h4> EDITAR ANIMAL</h4>
                    </div>
                    {
                        animals.data.name !== undefined &&
                        <FrmAnimal method={'put'} url={`/animals/${id}`}
                                   initialData={animals.data}/>
                    }
                </Paper>
            </WithLoader>
        </Admin>
    );
};

export default EditAnimal;

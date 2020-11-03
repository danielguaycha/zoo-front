import React from 'react';
import {Paper} from "@material-ui/core";
import Admin from "../../pages/Admin";
import FrmAnimal from "./FrmAnimal";
import BackBtn from "../_partials/BackBtn";

const CreateAnimal = () => {
    return (
        <>
            <Admin>
                <Paper className='paper-content'>
                    <div className='paper-header'>
                        <BackBtn />
                        <h4>NUEVO ANIMAL</h4>
                    </div>

                    <FrmAnimal method={'post'} />
                </Paper>
            </Admin>
        </>
    );
};

export default CreateAnimal;

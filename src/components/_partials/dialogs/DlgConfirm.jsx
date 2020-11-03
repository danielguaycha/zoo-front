import React from 'react';
import {Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button} from "@material-ui/core";
import PropTypes from 'prop-types';

const DlgConfirm = ({onClose, onConfirm, open, title, desc, loader}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {desc}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button color="secondary" onClick={onConfirm} disabled={loader}>
                    {loader ? 'Espere...': 'Aceptar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
DlgConfirm.propTypes = {
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    desc: PropTypes.string,
    loader: PropTypes.bool
};
DlgConfirm.defaultProps = {
    title: 'Confirmar',
    desc: '¿Esta seguro que desea realizar esta acción?',
    loader: false
};
export default DlgConfirm;

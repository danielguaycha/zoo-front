import moment from "moment";
export const processErrors = (err) => {
    if(err.response && err.response.data){
        let msg = '';
        let response = err.response.data;

        if (response.errors) {
            for (let i = 0; i<response.errors.length; i++){
                msg +=(response.errors[i][0])+',';
            }
            msg+='**';
            msg = msg.replace(',**', '');
        }

        else if(response.message) {
            msg = response.message;
        }

        else if(response.error) {
            msg = response.error;
        }

        else {
            msg = 'Error desconocido, contacte a soporte';
        }
        return(msg);
    }
    else if(err.message) {
        return(err.message);
    }
    else return 'Upps! el servidor no ha respondido como se esperaba, contacte a soporte!';
};

export const toDate = (date) => {
    if (!date) return '--/--/----';
    return moment(date).format('DD/MMMM/Y')
};

export const toDateHour = (date) => {
    if (!date) return '--/--/----';
    return moment(date).format('DD/MMMM/Y - H:mm')
};

export const HOME = '/';
export const LOGIN = '/login';
export const LOGIN_REDIRECT = '/zoo';
export const NOT_CONNECTED = '/not_connected';


// ZOO ANIMAL
export const ANIMAL_EDIT = '/zoo/:id/edit';
export const ANIMAL_ADD = '/zoo/add';
export const ANIMAL_LIST = '/zoo';


export const toName = (route, params) => {
    const keys = Object.keys(params);
    for(let i = 0; i<keys.length; i++) {
        route = route.replace(`:${keys[i]}`, params[keys[i]]);
    }
    return route;
};


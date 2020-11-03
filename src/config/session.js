// eslint-disable-next-line import/no-anonymous-default-export
export default {

    setSession({ token }) {
        localStorage.setItem('token',token);
    },

    clearSession() {
        if(localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
    },

    getToken() {
        return (localStorage.getItem('token') === undefined ? null : localStorage.getItem('token'));
    },

}

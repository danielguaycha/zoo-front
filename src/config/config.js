import {createMuiTheme} from "@material-ui/core"

// configs server
const ip = '192.168.1.60';

//* Functions

// get Url for deploy or dev
const getUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return '';
    } else {
        return `http://${ip}:80`;
    }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    api: `${getUrl()}/api`,
}

export const asset = (asset) => {
    return `${getUrl()}/api/image/${asset}`;
};

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#a2cf6e',
            main: '#8bc34a',
            dark: '#618833',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ffa733',
            main: '#ff9100',
            dark: '#b26500',
            contrastText: '#fff',
        },
        success: {
            main : "#bac778",
        },
        info: {
            main : "#75c7b9",
        },
        warning: {
            main : "#c7925d",
        },

        error: {
            main : "#e36570",
        },
    },
    status: {
        danger: 'orange',
    },
});

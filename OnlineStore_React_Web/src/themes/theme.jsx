import { red } from '@mui/material/colors';

// A custom theme for this app
const themeSettings = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                background: {
                    default: "#f3f3f3"
                },
                primary: {
                    main: '#5ea9f7',
                    contrastText: '#fff'
                },
                secondary: {
                    main: '#19857b',
                },
                error: {
                    main: red.A400,
                },
            }
            : {
                // palette values for light mode
                background: {
                    default: "#343434"
                },
                primary: {
                    main: '#5ea9f7',
                },
                secondary: {
                    main: '#19857b',
                },
                error: {
                    main: red.A400,
                },
            }),
    },
});


export default themeSettings;
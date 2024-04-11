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
                    main: '#556cd6',
                },
                secondary: {
                    main: '#19857b',
                },
                error: {
                    main: red.A400,
                },
            }
            : {
                // palette values for dark mode

            }),
    },
});


export default themeSettings;
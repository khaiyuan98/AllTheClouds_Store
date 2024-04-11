import { AppBar, Box, Toolbar, Typography } from "@mui/material";
export const MyAppBar = () => {
    return (
        <AppBar
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            elevation={1}
        >
            <Toolbar>
                <Typography>
                    All The Clouds Store
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
        </AppBar>
    )
};
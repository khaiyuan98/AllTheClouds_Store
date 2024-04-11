import { useContext } from 'react';
import { AppBar, Box, Toolbar, Typography, Select, MenuItem } from "@mui/material";
import UserPreferenceContext from '../Contexts/UserPreferenceContext';
export const MyAppBar = () => {
    const { currency, setCurrency } = useContext(UserPreferenceContext);

    const handleChangeCurrency = (e) => {
        setCurrency(e.target.value);
    };

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
                <Select
                    onChange={handleChangeCurrency}
                    label="Currency"
                    value={currency}
                >
                    <MenuItem value="AUD">AUD</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                </Select>
            </Toolbar>
        </AppBar>
    )
};
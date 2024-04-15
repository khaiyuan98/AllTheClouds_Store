import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Select, MenuItem, Stack, Switch } from "@mui/material";
import UserPreferenceContext from '../Contexts/UserPreferenceContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export const MyAppBar = () => {
    const { currency, setCurrency, isDarkMode, setIsDarkMode } = useContext(UserPreferenceContext);
    const navigate = useNavigate();

    const handleChangeCurrency = (e) => {
        setCurrency(e.target.value);
    };

    const handleToggleIsDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <AppBar
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            elevation={1}
        >
            <Toolbar>
                <Typography onClick={() => navigate('/')} >
                    All The Clouds Store
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Stack direction="row" alignItems="center" gap={5} >
                    <Stack direction="row" alignItems="center">
                        <DarkModeIcon />
                        <Switch color="primary" checked={isDarkMode} onChange={handleToggleIsDarkMode} />
                    </Stack>
                    <Select
                        onChange={handleChangeCurrency}
                        label="Currency"
                        value={currency}
                        sx={{
                            color: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'transparent'
                            },
                            '& .MuiSvgIcon-root': {
                                color: 'white'
                            }
                        }}
                    >
                        <MenuItem value="AUD">AUD</MenuItem>
                        <MenuItem value="GBP">GBP</MenuItem>
                        <MenuItem value="USD">USD</MenuItem>
                    </Select>
                </Stack>
            </Toolbar>
        </AppBar>
    )
};
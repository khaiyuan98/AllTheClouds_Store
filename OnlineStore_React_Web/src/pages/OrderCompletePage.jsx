import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Button } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const OrderCompletePage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Box className="page-container">
                <Typography variant="h4" noWrap component="div">
                    Order Complete
                </Typography>
                <Paper sx={{ height: '500px' }}>
                    <Box sx={{ height: '500px' }} >
                        <CheckCircleIcon color="success" fontSize="large" className="center" />
                    </Box>
                </Paper>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/')}
                    sx={{ mt: '10px' }}
                >
                    Back to Products List
                </Button>
            </Box>
        </>
    )
};
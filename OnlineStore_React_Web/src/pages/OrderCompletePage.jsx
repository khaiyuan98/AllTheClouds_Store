import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import orderCompleteImage from '../assets/images/order_complete_image.png';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const OrderCompletePage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Box className="page-container">
                <Typography variant="h4" noWrap component="div">
                    Order Submitted
                </Typography>
                <Box className="center">
                    <Paper sx={{ width: '50%', padding: '15px' }} >
                        <Stack alignItems="center" gap={2}>
                            <img src={orderCompleteImage} style={{ width: '400px', height: 'auto' }} />
                            <Typography variant="h5">
                                Your order has been submitted!
                            </Typography>
                            <Button
                                startIcon={<ArrowBackIosNewIcon />}
                                variant="contained"
                                onClick={() => navigate('/')}
                            >
                                Back to Product List
                            </Button>
                        </Stack>
                    </Paper>
                </Box>
            </Box>
        </>
    )
};
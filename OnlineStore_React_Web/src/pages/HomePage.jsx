import { useContext } from 'react';
import ShoppingCartContext from "../components/Contexts/ShoppingCartContext";
import { ProductList } from "../components/ProductList";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const { cart, clearCart } = useContext(ShoppingCartContext);
    const navigate = useNavigate();

    return (
        <Box className="page-container">
            <Typography variant="h6" noWrap component="div">
                Cloud Products
            </Typography>
            <Paper>
                <Box>
                    <ProductList />
                </Box>
            </Paper>
            <Box sx={{ mt: '10px', display: 'flex', justifyContent: 'end', paddingRight: '10px' }}>
                <Button
                    color='error'
                    variant="contained"
                    disabled={cart.length <= 0}
                    onClick={ clearCart }
                >
                    CLEAR CART
                </Button>
                <Button sx={{ ml: '10px'}}
                    variant="contained"
                    disabled={cart.length <= 0}
                    onClick={() => navigate('/placeorder')}
                >
                    PROCEED TO CHECKOUT
                </Button>
            </Box>
        </Box>
    )
};
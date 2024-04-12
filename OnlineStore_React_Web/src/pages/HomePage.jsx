import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartContext from "../components/Contexts/ShoppingCartContext";
import { ProductList } from "../components/ProductList";
import { Box, Paper, Typography, Button, IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { OrderListDialog } from "../components/OrderListDialog";


export const HomePage = () => {
    const { cart, clearCart } = useContext(ShoppingCartContext);
    const navigate = useNavigate();

    const [isDialogOpen, setIsDialogOpen] = useState(false);


    return (

        <Box className="page-container">
            <Typography variant="h4" noWrap component="div">
                Product List
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'end', pb: '10px' }} >
                <IconButton color="primary" onClick={() => setIsDialogOpen(true)} >
                    <ShoppingCartIcon />
                </IconButton>
            </Box>
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
                    onClick={clearCart}
                >
                    CLEAR CART
                </Button>
                <Button sx={{ ml: '10px' }}
                    variant="contained"
                    disabled={cart.length <= 0}
                    onClick={() => navigate('/placeorder')}
                >
                    PROCEED TO CHECKOUT
                </Button>
            </Box>
            <OrderListDialog open={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        </Box>
    )
};
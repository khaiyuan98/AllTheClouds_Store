import axios from 'axios';
import { useState, useContext } from 'react';
import ShoppingCartContext from "../components/Contexts/ShoppingCartContext";
import { Box, Paper, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { OrderList } from '../components/OrderList';
import { validateEmail } from '../helpers/helpers';


export const PlaceOrderPage = () => {
    const POST_ORDER_URL = import.meta.env.VITE_POST_ORDER_URL;

    const { cart, clearCart } = useContext(ShoppingCartContext);
    const navigate = useNavigate();

    const [customerName, setCustomerName] = useState('');
    const [customerNameError, setCustomerNameError] = useState('');

    const [customerEmail, setCustomerEmail] = useState('');
    const [customerEmailError, setCustomerEmailError] = useState('');

    const submitOrder = () => {
        axios.post(POST_ORDER_URL, {
            customerName: customerName,
            customerEmail: customerEmail,
            lineItems: cart
        })
            .then(res => {
                clearCart();
                navigate('/');
            })
            .catch(error => {
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let isError = false;
        setCustomerNameError('');
        setCustomerEmailError('');

        if (customerName.length <= 0) {
            setCustomerNameError("Username is required");
            isError = true;
        }

        if (customerEmail.length <= 0) {
            setCustomerEmailError("Email Address is required");
            isError = true;
        }

        else if (!validateEmail(customerEmail)) {
            setCustomerEmailError("Please enter a valid email address");
            isError = true;
        }
        
        if (isError) {
            return;
        }

        submitOrder();
    }


    return (
        <Box className="page-container">
            <Typography variant="h6" noWrap component="div">
                Finalize Order
            </Typography>
            <Paper>
                <Box>
                    <OrderList />
                </Box>
            </Paper>
            <Paper>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, padding: '10px' }}>
                    <TextField
                        onChange={(e) => setCustomerName(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        autoComplete="username"
                        autoFocus
                        helperText={customerNameError}
                        error={customerNameError.length > 0 ? true : false}
                    />
                    <TextField
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="Email Address"
                        type="email"
                        autoComplete="email"
                        helperText={customerEmailError}
                        error={customerEmailError.length > 0 ? true : false}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={cart.length <= 0}
                    >
                        PLACE ORDER
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
};
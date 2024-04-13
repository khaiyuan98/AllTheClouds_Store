import { useState, useEffect, useContext } from "react";
import { List, Divider, Box } from "@mui/material";
import axios from 'axios';
import { ListItem, ListItemText, Typography, Stack, IconButton, Skeleton, Snackbar, Alert, Paper } from "@mui/material";
import ShoppingCartContext from './Contexts/ShoppingCartContext';
import { QuantityInput } from "./MaterialCustom/NumberInput";
import DeleteIcon from '@mui/icons-material/Delete';
import { formatCurrency } from "../helpers/helpers";
import UserPreferenceContext from "./Contexts/UserPreferenceContext";
import emptyCartImage from '../assets/images/empty_cart.png';

export const OrderList = () => {
    const GET_PRODUCTS_URL = import.meta.env.VITE_GET_PRODUCTS_API_URL;

    const { currency, currencySymbol } = useContext(UserPreferenceContext);
    const { cart, updateCart } = useContext(ShoppingCartContext);

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertSettings, setAlertSettings] = useState({});

    const getProducts = () => {
        setIsLoading(true);
        axios.get(`${GET_PRODUCTS_URL}/${currency}`)
            .then(res => {
                setProducts(res.data);
            })
            .catch(() => {
                setAlertSettings({
                    message: 'The products details could not be retrieved',
                    severity: 'error'
                });
                setIsAlertOpen(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getProducts();
    }, [currency]);

    const getProduct = (productId) => {
        const existingProductIndex = products.findIndex((product) => product.productId === productId);
        if (existingProductIndex !== -1) {
            return products[existingProductIndex];
        }
        else
            return null;
    }

    const calculateTotalPrice = () => {
        let total = 0;

        cart.forEach(order => {
            let product = getProduct(order.productId);

            if (product === null)
                return;

            total += product.unitPrice * order.quantity;
        });

        return total;
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                {
                    isLoading ?
                        <Box sx={{ padding: '10px' }}>
                            <Skeleton variant="rectangular" animation="wave" width="15%" height={25} sx={{ mb: '10px' }} />
                            <Skeleton variant="rectangular" animation="wave" width="100%" height={50} sx={{ mb: '10px' }} />
                            <Skeleton variant="rectangular" animation="wave" width="15%" height={25} sx={{ mb: '10px' }} />
                            <Skeleton variant="rectangular" animation="wave" width="100%" height={50} sx={{ mb: '10px' }} />
                            <Skeleton variant="rectangular" animation="wave" width="15%" height={25} sx={{ mb: '10px' }} />
                            <Skeleton variant="rectangular" animation="wave" width="100%" height={50} sx={{ mb: '10px' }} />
                            <Skeleton variant="rectangular" animation="wave" width="15%" height={25} sx={{ mb: '10px' }} />
                            <Skeleton variant="rectangular" animation="wave" width="100%" height={50} sx={{ mb: '10px' }} />
                            <Skeleton variant="rectangular" animation="wave" width="15%" height={25} sx={{ mb: '10px' }} />
                            <Skeleton variant="rectangular" animation="wave" width="100%" height={50} sx={{ mb: '10px' }} />
                        </Box>
                        :
                        <List sx={{ width: '100%' }}>
                            {cart.length > 0 ? cart.map((order) => {

                                let product = getProduct(order.productId);

                                return (
                                    <Box key={product.productId}>
                                        <ListItem alignItems="flex-start" >
                                            <Stack direction={{ xs: 'column', lg: 'row' }}
                                                alignItems={{ xs: 'flex-start', lg: 'center' }}
                                                spacing={{ xs: 1, lg: 2 }}
                                                justifyContent="space-between"
                                                sx={{ width: '100%' }}
                                            >
                                                <ListItemText
                                                    primary={product.name}
                                                    secondary={product.description}
                                                />
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="h6"
                                                    color="text.primary"
                                                >
                                                    {currencySymbol}{formatCurrency(product.unitPrice * order.quantity)}
                                                </Typography>
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <QuantityInput defaultValue={order.quantity} min={1} max={product?.maximumQuantity ?? 999} onChangeHandler={(value) => updateCart(order.productId, value)} />
                                                    <IconButton aria-label="delete" color="error" onClick={() => updateCart(order.productId, 0)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Stack>
                                            </Stack>
                                        </ListItem>
                                        <Divider />
                                    </Box>
                                )
                            })
                                :
                                <Box className="center" sx={{ mt: '10px' }} >
                                    <Stack alignItems="center" gap={2}>
                                        <img src={emptyCartImage} style={{ width: '400px', height: 'auto' }} />
                                        <Typography variant="h6">
                                            Oops! Looks like your cart is empty
                                        </Typography>
                                    </Stack>
                                </Box>}
                        </List>
                }
                <Box sx={{ display: 'flex', justifyContent: 'end', padding: '10px' }} >
                    <Typography variant="h6">
                        TOTAL: {currencySymbol}{formatCurrency(calculateTotalPrice())}
                    </Typography>
                </Box>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={isAlertOpen}
                    onClose={() => setIsAlertOpen(false)}
                >
                    <Alert onClose={() => setIsAlertOpen(false)} severity={alertSettings.severity} sx={{ width: '100%' }}>
                        {alertSettings.message}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    )
} 
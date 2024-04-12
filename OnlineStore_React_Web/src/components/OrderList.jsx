import { useState, useEffect, useContext } from "react";
import { List, Divider, Box } from "@mui/material";
import axios from 'axios';
import { ListItem, ListItemText, Typography, Stack, IconButton, Skeleton } from "@mui/material";
import ShoppingCartContext from './Contexts/ShoppingCartContext';
import { QuantityInput } from "./MaterialCustom/NumberInput";
import DeleteIcon from '@mui/icons-material/Delete';
import { formatCurrency } from "../helpers/helpers";
import UserPreferenceContext from "./Contexts/UserPreferenceContext";

export const OrderList = () => {
    const GET_PRODUCTS_URL = import.meta.env.VITE_GET_PRODUCTS_API_URL;

    const { currency, currencySymbol } = useContext(UserPreferenceContext);
    const { cart, updateCart } = useContext(ShoppingCartContext);

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getProducts = () => {
        setIsLoading(true);
        axios.get(`${GET_PRODUCTS_URL}/${currency}`)
            .then(res => {
                setProducts(res.data);
            })
            .catch(error => {
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
                                            <ListItemText
                                                primary={product.name}
                                                secondary={product.description}
                                            />
                                            <Stack direction="row" spacing={2}>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="h6"
                                                    color="text.primary"
                                                >
                                                    {currencySymbol}{formatCurrency(product.unitPrice * order.quantity)}
                                                </Typography>
                                                <QuantityInput defaultValue={order.quantity} min={1} max={product?.maximumQuantity ?? 999} onChangeHandler={(value) => updateCart(order.productId, value)} />
                                                <IconButton aria-label="delete" color="error" onClick={() => updateCart(order.productId, 0)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </Stack>
                                        </ListItem>
                                        <Divider />
                                    </Box>
                                )
                            })
                                : 'Your Order is Empty'}
                        </List>
                }
                <Box sx={{ display: 'flex', justifyContent: 'end', padding: '10px' }} >
                    <Typography variant="h6">
                        TOTAL: {currencySymbol}{formatCurrency(calculateTotalPrice())}
                    </Typography>
                </Box>
            </Box>
        </>
    )
} 
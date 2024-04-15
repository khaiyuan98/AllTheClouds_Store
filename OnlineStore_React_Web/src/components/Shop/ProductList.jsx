import { useState, useEffect, useContext } from "react";
import { List, Divider, Box } from "@mui/material";
import axios from 'axios';
import { ListItem, ListItemText, Typography, Button, Stack, Snackbar, Alert, Skeleton } from "@mui/material";
import { EditOrderItemDialog } from "./EditOrderItemDialog";
import ShoppingCartContext from '../Contexts/ShoppingCartContext';
import { formatCurrency } from "../../helpers/helpers";
import UserPreferenceContext from "../Contexts/UserPreferenceContext";



export const ProductList = () => {
    const GET_PRODUCTS_URL = import.meta.env.VITE_GET_PRODUCTS_API_URL;

    const { currency, currencySymbol } = useContext(UserPreferenceContext);
    const { findFromCart } = useContext(ShoppingCartContext);

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [chosenProduct, setChosenProduct] = useState(null);

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
                    message: 'The products could not be loaded at this time',
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

    const openItemDialog = (product) => {
        setChosenProduct(product);
        setIsDialogOpen(true);
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
                            {products != null ? products.map((product, index) => {

                                let productInCart = findFromCart(product.productId);

                                return (
                                    <Box key={product.productId}>
                                        <ListItem alignItems="flex-start" >
                                            <Stack direction={{ xs: 'column', md: 'row' }}
                                                alignItems={{ xs: 'flex-start', md: 'center' }}
                                                spacing={{ xs: 1, lg: 2 }}
                                                justifyContent="space-between"
                                                sx={{ width: '100%' }}
                                            >
                                                <ListItemText
                                                    primary={
                                                        <>
                                                            <Typography variant="body2" className="subtitle">
                                                                {product.name}
                                                            </Typography>
                                                            {
                                                                productInCart != null ?
                                                                    <Typography color="secondary" variant="body2" className="subtitle">
                                                                        In Cart: {productInCart.quantity} ({currencySymbol}{formatCurrency(product.unitPrice * productInCart.quantity)})
                                                                    </Typography>
                                                                    : ''
                                                            }
                                                        </>
                                                    }
                                                    secondary={product.description}
                                                    sx={{maxWidth:'70%'}}
                                                />
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="h6"
                                                    color="text.primary"
                                                >
                                                    {currencySymbol}{formatCurrency(product.unitPrice)}
                                                </Typography>
                                                <Button variant="contained"
                                                    onClick={() => openItemDialog(product)}
                                                >
                                                    Add to Cart
                                                </Button>
                                            </Stack>
                                        </ListItem>
                                        {index < products.length - 1 ? <Divider /> : ''}
                                    </Box>
                                )
                            })
                                : ''}
                        </List>
                }
            </Box>
            <EditOrderItemDialog open={isDialogOpen} setIsDialogOpen={setIsDialogOpen} product={chosenProduct} />
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
            >
                <Alert onClose={() => setIsAlertOpen(false)} severity={alertSettings.severity} sx={{ width: '100%' }}>
                    {alertSettings.message}
                </Alert>
            </Snackbar>
        </>
    )
} 
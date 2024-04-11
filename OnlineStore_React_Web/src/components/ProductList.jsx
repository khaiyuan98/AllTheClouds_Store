import { useState, useEffect, useContext } from "react";
import { List, Divider, Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { ListItem, ListItemText, Typography, Button, Stack } from "@mui/material";
import { EditOrderItemDialog } from "./EditOrderItemDialog";
import ShoppingCartContext from './Contexts/ShoppingCartContext';
import { formatCurrency } from "../helpers/helpers";


const GET_PRODUCTS_URL = import.meta.env.VITE_GET_PRODUCTS_API_URL;

export const ProductList = () => {
    const { findFromCart } = useContext(ShoppingCartContext);

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [chosenProduct, setChosenProduct] = useState(null);

    const getProducts = () => {
        axios.get(GET_PRODUCTS_URL)
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
    }, []);

    const openItemDialog = (product) => {
        setChosenProduct(product);
        setIsDialogOpen(true);
    };

    return (
        <>
            <Box sx={{ minHeight: '500px', width: '100%' }}>
                {
                    isLoading ?
                        <Box className="center">
                            <CircularProgress />
                        </Box>
                        :
                        <List sx={{ width: '100%' }}>
                            {products != null ? products.map((product, index) => {

                                let productInCart = findFromCart(product.productId);

                                return (
                                    <Box key={product.productId}>
                                        <ListItem alignItems="flex-start" >
                                            <ListItemText
                                                primary={product.name}
                                                secondary={
                                                    <>
                                                        <Typography variant="body2" className="subtitle">
                                                            {product.description}
                                                        </Typography>
                                                        {
                                                            productInCart != null ?
                                                                <Typography color="secondary" variant="body2" className="subtitle">
                                                                    Quantity: {productInCart.quantity} (${formatCurrency(product.unitPrice * productInCart.quantity)})
                                                                </Typography>
                                                                : ''
                                                        }
                                                    </>
                                                }
                                            />
                                            <Stack direction="row" spacing={2}>
                                                <Stack spacing={0} alignItems="center">
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="h6"
                                                        color="text.primary"
                                                    >
                                                        ${formatCurrency(product.unitPrice)}
                                                    </Typography>
                                                    <Button variant="contained"
                                                        onClick={() => openItemDialog(product)}
                                                    >
                                                        Add to Cart
                                                    </Button>
                                                </Stack>
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
        </>
    )
} 
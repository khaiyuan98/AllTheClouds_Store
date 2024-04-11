import { useState, useEffect, useContext } from "react";
import { List, Divider, Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { ListItem, ListItemText, Typography, Button, Stack } from "@mui/material";
import { EditOrderItemDialog } from "./EditOrderItemDialog";
import ShoppingCartContext from './Contexts/ShoppingCartContext';


const GET_PRODUCTS_URL = 'https://localhost:7254/api/Products';


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
                            {products != null ? products.map(product => {

                                let productInCart = findFromCart(product.productId);

                                return (
                                    <Box key={product.productId}>
                                        <ListItem alignItems="flex-start" >
                                            <ListItemText
                                                primary={product.name}
                                                secondary={product.description}
                                            />
                                            <Stack direction="row" spacing={2}>
                                                <Stack>
                                                    {productInCart != null ?
                                                        <>
                                                            <Typography variant="body2" className="subtitle">
                                                                In Cart - {productInCart.quantity}
                                                            </Typography>
                                                            <Typography variant="body2" className="subtitle">
                                                                Cost - ${(product.unitPrice * productInCart.quantity).toFixed(2)}
                                                            </Typography>
                                                        </>
                                                        : ''}
                                                </Stack>
                                                <Stack spacing={0} alignItems="center">
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="h6"
                                                        color="text.primary"
                                                    >
                                                        ${product.unitPrice}
                                                    </Typography>
                                                    <Button variant="contained"
                                                        onClick={() => openItemDialog(product)}
                                                    >
                                                        Add to Cart
                                                    </Button>
                                                </Stack>
                                            </Stack>
                                        </ListItem>
                                        <Divider />
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
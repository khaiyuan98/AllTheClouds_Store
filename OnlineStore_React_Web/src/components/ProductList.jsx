import { useState, useEffect } from "react";
import { List, Divider, Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { ListItem, ListItemText, Typography, Button, Stack } from "@mui/material";
import { EditOrderItemDialog } from "./EditOrderItemDialog";

const GET_PRODUCTS_URL = 'https://localhost:7254/api/Products';


export const ProductList = () => {

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
                            {products != null ? products.map(product =>
                                <>
                                    <ListItem alignItems="flex-start" >
                                        <ListItemText
                                            primary={product.name}
                                            secondary={product.description}
                                        />
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
                                    </ListItem>
                                    <Divider />
                                </>
                            )
                                : ''}
                        </List>
                }
            </Box>
            <EditOrderItemDialog open={isDialogOpen} setIsDialogOpen={setIsDialogOpen} product={chosenProduct} cartQuantity={0} />
        </>
    )
} 
import { useState, useContext } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material"
import { QuantityInput } from "../MaterialCustom/NumberInput";
import ShoppingCartContext from "../Contexts/ShoppingCartContext";


export const EditOrderItemDialog = ({ open, setIsDialogOpen, product }) => {
    const { updateCart, findFromCart } = useContext(ShoppingCartContext);

    const productInCart = findFromCart(product?.productId);
    let initValue = 0;

    if (productInCart != null) {
        initValue = productInCart.quantity;
    }

    const [quantity, setQuantity] = useState(initValue);

    const handleConfirmQuantity = () => {
        updateCart(product.productId, quantity);
        setIsDialogOpen(false);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">
                {product?.name}
            </DialogTitle>
            <DialogContent dividers>
                <Stack gap={1} >
                    <Typography>
                        Order Quantity:
                    </Typography>
                    <QuantityInput defaultValue={initValue} min={0} max={product?.maximumQuantity ?? 999} onChangeHandler={(value) => setQuantity(value)} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={handleCloseDialog}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={() => handleConfirmQuantity()}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
} 
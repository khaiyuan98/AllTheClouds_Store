import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { QuantityInput } from "./MaterialCustom/NumberInput";


export const EditOrderItemDialog = ({ open, setIsDialogOpen, product, cartQuantity = 0 }) => {
    const handleConfirmQuantity = () => {
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
        >
            <DialogTitle id="alert-dialog-title">
                {product?.name}
            </DialogTitle>
            <DialogContent>
                Order Quantity: <QuantityInput defaultValue={cartQuantity} min={0} max={product?.maximumQuantity ?? 999} onChangeHandler={(value) => console.log(value)} />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={handleCloseDialog}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleConfirmQuantity}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
} 
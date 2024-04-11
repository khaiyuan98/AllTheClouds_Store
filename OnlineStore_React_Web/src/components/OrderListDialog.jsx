import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { OrderList } from "./OrderList";


export const OrderListDialog = ({ open, setIsDialogOpen }) => {
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
                My Order
            </DialogTitle>
            <DialogContent dividers>
                <OrderList/>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
        </Dialog>
    )
} 
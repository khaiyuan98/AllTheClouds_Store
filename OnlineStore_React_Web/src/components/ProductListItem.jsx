import { ListItem, ListItemText, Typography, Button, Stack } from "@mui/material";


export const ProductListItem = ({ product }) => {
    return (
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
                    onClick={ () => openItemDialog(product)}
                >
                    Add to Cart
                </Button> 
            </Stack>
        </ListItem>
    )
} 
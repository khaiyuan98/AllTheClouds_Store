import { ProductList } from "../components/ProductList";
import { Box, Paper, Typography } from "@mui/material";

export const HomePage = () => {
    return (
        <Box className="page-container">
            <Typography variant="h6" noWrap component="div">
                Cloud Products
            </Typography>
            <Paper>
                <ProductList />
            </Paper>
        </Box>
    )
};
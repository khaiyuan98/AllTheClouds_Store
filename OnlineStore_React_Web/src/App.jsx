import './App.css'

import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import defaultTheme from './themes/theme';
import { MyLayout } from './components/Layouts/MyLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ShoppingCartProvider } from './components/Contexts/ShoppingCartContext';
import { PlaceOrderPage } from './pages/PlaceOrderPage';
import { UserPreferenceProvider } from './components/Contexts/UserPreferenceContext';
import { OrderCompletePage } from './pages/OrderCompletePage';

// TODO From redux
const isDarkMode = false;
const themeSettings = defaultTheme(isDarkMode ? 'dark' : 'light');
const theme = createTheme(themeSettings);


function App() {
    return (
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <UserPreferenceProvider>
                <ShoppingCartProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<MyLayout />}>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/placeorder" element={<PlaceOrderPage />} />
                                <Route path="/ordercomplete" element={<OrderCompletePage />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </ShoppingCartProvider>
            </UserPreferenceProvider>
        </ThemeProvider>
    );
}

export default App

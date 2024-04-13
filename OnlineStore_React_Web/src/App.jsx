import './App.css'
import { useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import defaultTheme from './themes/theme';
import { MyLayout } from './components/Layouts/MyLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ShoppingCartProvider } from './components/Contexts/ShoppingCartContext';
import { PlaceOrderPage } from './pages/PlaceOrderPage';
import UserPreferenceContext, { UserPreferenceProvider } from './components/Contexts/UserPreferenceContext';
import { OrderCompletePage } from './pages/OrderCompletePage';

function App() {
    const { isDarkMode } = useContext(UserPreferenceContext);
    const themeSettings = defaultTheme(isDarkMode ? 'dark' : 'light');
    const theme = createTheme(themeSettings);

    return (
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
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
        </ThemeProvider>
    );
}

function AppWrapper() {
    return (
        <UserPreferenceProvider>
            <App />
        </UserPreferenceProvider>
    );
}


export default AppWrapper

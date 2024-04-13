import { createContext, useState, useEffect } from 'react';

const UserPreferenceContext = createContext();

export const UserPreferenceProvider = ({ children }) => {
    const [currency, setCurrency] = useState(() => {
        const savedCurrency = localStorage.getItem('currency');
        return savedCurrency !== null && savedCurrency.length > 0 ? savedCurrency : 'AUD';
    });

    const [currencySymbol, setCurrencySymbol] = useState('$');

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode == 'true';
    });

    useEffect(() => {
        console.log('saving currency');
        localStorage.setItem('currency', currency);

        if (currency == 'GBP')
            setCurrencySymbol('\u00A3');
        else
            setCurrencySymbol('$');

    }, [currency])

    useEffect(() => {
        console.log('saving mode');
        localStorage.setItem('darkMode', isDarkMode);
    }, [isDarkMode])

    return (
        <UserPreferenceContext.Provider value={{ currency, setCurrency, currencySymbol, isDarkMode, setIsDarkMode }}>
            {children}
        </UserPreferenceContext.Provider>
    );
};

export default UserPreferenceContext;

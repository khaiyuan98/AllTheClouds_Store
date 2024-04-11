import { createContext, useState, useEffect } from 'react';

const UserPreferenceContext = createContext();

export const UserPreferenceProvider = ({ children }) => {
    const [currency, setCurrency] = useState(() => {
        const savedCurrency = localStorage.getItem('currency');
        return savedCurrency !== null && savedCurrency.length > 0 ? savedCurrency : 'AUD';
    });

    const [currencySymbol, setCurrencySymbol] = useState('$');

    useEffect(() => {
        console.log('saving currency');
        localStorage.setItem('currency', currency);

        if (currency == 'GBP')
            setCurrencySymbol('\u00A3');
        else
            setCurrencySymbol('$');

    }, [currency])

    return (
        <UserPreferenceContext.Provider value={{ currency, setCurrency, currencySymbol }}>
            {children}
        </UserPreferenceContext.Provider>
    );
};

export default UserPreferenceContext;

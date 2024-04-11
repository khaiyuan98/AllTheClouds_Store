import { createContext, useState, useEffect } from 'react';

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        try {
            const parsedCart = JSON.parse(savedCart);
            if (Array.isArray(parsedCart)) {
                return parsedCart;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error parsing cart from local storage:', error);
            return [];
        }
    });

    const updateCart = (productId, quantity) => {
        const existingItemIndex = cart.findIndex((cartItem) => cartItem.productId === productId);
        if (existingItemIndex !== -1) {
            if (quantity <= 0) {
                console.log(`Remove item ${productId} from cart`);
                const updatedCart = [...cart];
                updatedCart.splice(existingItemIndex, 1);
                setCart(updatedCart);
            }
            else {
                console.log(`update item ${productId} in cart`);
                const updatedCart = [...cart];
                updatedCart[existingItemIndex].quantity = quantity;
                setCart(updatedCart);
            }
        }
        else if (quantity > 0) {
            console.log(`add item ${productId} in cart`);
            setCart([...cart, { productId: productId, quantity: quantity }]);
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const findFromCart = (productId) => {
        const existingItemIndex = cart.findIndex((cartItem) => cartItem.productId === productId);
        if (existingItemIndex !== -1) {
            return cart[existingItemIndex];
        }
        else
            return null;
    }

    useEffect(() => {
        console.log('saving cart');
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])


    return (
        <ShoppingCartContext.Provider value={{ cart, updateCart, clearCart, findFromCart }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export default ShoppingCartContext;

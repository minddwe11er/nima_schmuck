// hooks/useCart.js
import { useState, useEffect } from 'react';

export function useCart() {
    const [cart, setCart] = useState({});

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error('Loading error:', error);
            localStorage.removeItem('cart');
            setCart({});
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Loading error:', error);
        }
    }, [cart]);

    const addToCart = (productId, productData) => {
        setCart((prevCart) => {
            const newCart = { ...prevCart };
            if (newCart[productId]) {
                newCart[productId].quantity += 1;
            } else {
                newCart[productId] = { ...productData, quantity: 1 };
            }
            return newCart;
        });
    };

    const totalItems = Object.values(cart).reduce((sum, item) => sum + (item?.quantity || 0), 0);

    return { cart, addToCart, totalItems };
}
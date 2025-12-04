'use client';

import { useState } from 'react';

export default function CartModal({ itemsCount = 3, totalSum = 0, isOpen = false, onCheckout, onClose }) {
    const handleClose = () => {
        if (onClose) onClose();
    };

    return (
        <div className={`cart-modal ${isOpen ? 'open' : ''}`}>
            <div className="cart-content">
                <h3>Warenkorb</h3>
                <p className="cart-summary">
                    Artikel: {itemsCount} | Summe: {totalSum} CHF
                </p>
                <button
                    onClick={onCheckout}
                    className="cart-btn cart-checkout"
                >
                    Bestellung aufgeben
                </button>
                <button
                    onClick={handleClose}
                    className="cart-btn cart-close"
                >
                    Schliessen
                </button>
            </div>
        </div>
    );
}
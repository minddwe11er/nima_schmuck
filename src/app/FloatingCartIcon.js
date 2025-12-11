// FloatingCartIcon.jsx (оновлена версія)
'use client';

import { useState } from 'react';
import { useCart } from '../hooks/useCart'; // Шлях до твого hook
import CartModal from './CartModal';

export default function FloatingCartIcon() {
    const { totalItems } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            {!isModalOpen && (
                <button onClick={toggleModal} className="floating-cart-icon">
                    <span className="icon">🛒</span>
                    {totalItems > 0 && <span className="badge">{totalItems}</span>}
                </button>
            )}

            {/* Тут тимчасово модалка – на кроці 2 винесемо в окремий провайдер */}
            {isModalOpen && (
                <CartModal
                    itemsCount={totalItems}
                    totalSum={0} // Поки 0, порахуємо на кроці 2
                    isOpen={isModalOpen}
                    onCheckout={() => console.log('Перехід до checkout')} // Заглушка
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}
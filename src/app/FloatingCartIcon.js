'use client';

export default function FloatingCartIcon({ onClick, itemsCount = 0, isVisible = true }) {
    if (!isVisible) return null;

    return (
        <button onClick={onClick} className="floating-cart-icon">
            <span className="icon">🛒</span>
            {itemsCount > 0 && <span className="badge">{itemsCount}</span>}
        </button>
    );
}
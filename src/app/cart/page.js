// app/cart/page.jsx
'use client';

export default function CartPage() {
    const cartItems = [
        { id: 1, name: 'Silberne Perlenkette', price: 450, quantity: 1, image: '/placeholder-namisto.jpg' },
        { id: 2, name: 'Goldene Tropfenohrringe', price: 320, quantity: 2, image: '/placeholder-serizhky.jpg' },
        { id: 3, name: 'Armband mit Edelsteinen', price: 280, quantity: 1, image: '/placeholder-braslet.jpg' },
    ];

    const totalSum = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="products"> {/* Фон як у products */}
            <div className="container">
                <h1 className="products-title">Warenkorb</h1>

                {cartItems.length === 0 ? (
                    <p className="cart-empty">Warenkorb ist leer. Fügen Sie Produkte hinzu!</p>
                ) : (
                    <>
                        <div className="cart-table">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.name} className="cart-image" />
                                    <div className="cart-info">
                                        <h3 className="cart-name">{item.name}</h3>
                                        <p className="price">Preis: {item.price} CHF</p>
                                    </div>
                                    <div className="cart-quantity">
                                        <button className="qty-btn">-</button>
                                        <span>{item.quantity}</span>
                                        <button className="qty-btn">+</button>
                                    </div>
                                    <p className="cart-subtotal">{item.price * item.quantity} CHF</p>
                                    <button className="cart-remove">Entfernen</button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-total">
                            <p>Gesamtsumme: <strong>{totalSum} CHF</strong></p>
                            <button className="add-to-cart" style={{ width: 'auto', marginTop: '20px' }}>
                                Bestellung abschließen
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
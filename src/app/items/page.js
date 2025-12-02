'use client';

import { useState } from 'react';

import Link from 'next/link';
import SideBar from './SideBar';
import CartModal from '../CartModal';
import FloatingCartIcon from '../FloatingCartIcon';

export default function ProductsPage() {
    const [cartOpen, setCartOpen] = useState(false);

    return (
        <>
            <main className="products">
                <div className="container">
                    <SideBar />
                    <FloatingCartIcon
                        onClick={() => setCartOpen(!cartOpen)}
                        itemsCount={4}
                        isVisible={!cartOpen} />
                    <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
                    <section className="product-grid">
                        <h2 className="products-title">Unser Schmuck</h2>
                        <div className="grid">
                            <article className="product-card">
                                <img
                                    src="https://via.placeholder.com/300x300/E9C5C5/white?text=Kette"
                                    alt="Kette"
                                />
                                <h3>Goldene Kette</h3>
                                <p className="price">75 CHF</p>
                                <button className="buy-btn">Kaufen</button>
                            </article>
                            <article className="product-card">
                                <img
                                    src="https://via.placeholder.com/300x300/E9C5C5/white?text=Ohrringe"
                                    alt="Ohrringe"
                                />
                                <h3>Silberne Ohrringe</h3>
                                <p className="price">45 CHF</p>
                                <button className="buy-btn">Kaufen</button>
                            </article>
                            <article className="product-card">
                                <img
                                    src="https://via.placeholder.com/300x300/E9C5C5/white?text=Ring"
                                    alt="Ring"
                                />
                                <h3>Perlenring</h3>
                                <p className="price">120 CHF</p>
                                <button className="buy-btn">Kaufen</button>
                            </article>
                            <article className="product-card">
                                <img
                                    src="https://via.placeholder.com/300x300/E9C5C5/white?text=Armband"
                                    alt="Armband"
                                />
                                <h3>Lederarmband</h3>
                                <p className="price">30 CHF</p>
                                <button className="buy-btn">Kaufen</button>
                            </article>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
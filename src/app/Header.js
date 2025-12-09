'use client'

import { Pacifico } from 'next/font/google'
import { useState } from 'react';
import LoginModal from './LoginModal';
const logoFont = Pacifico({ subsets: ['latin'], weight: ['400'], variable: '--font-pacifico' })

export default function Header() {
    const cartCount = 3;

    const [loginOpen, setLoginOpen] = useState(false);

    const toggleLogin = () => setLoginOpen(!loginOpen);

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="logo">
                        <h1 className={logoFont.variable}><a href="/">Nima Schmuck</a></h1>
                    </div>
                    <nav className="nav">
                        <ul>
                            <li><a href="/items">Produkte</a></li>
                            <li><a href="/about">Über uns</a></li>
                            <li><a href="/contact">Kontakt</a></li>
                            <li><a href="/register">Registrierung</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); setLoginOpen(true); }}>Anmelden</a></li>
                            <li><a href="/admin">Admin</a></li>
                            {/* Cart */}
                            <li className="cart-link">
                                <a href="/cart" className="cart-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 3H5L5.4 5M7 13H17L21 5H5M7 13L5.4 5M7 13L4.707 15.293A1 1 0 0 0 4.414 16L4 17L5 19H19M7 13H19" stroke="#4a4a4a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
        </>
    )
}
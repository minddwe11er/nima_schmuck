'use client';

import { useState, useEffect } from 'react';
import { getHero, updateHero } from '@/api/pagesAPI';

const API_BASE = 'http://localhost:3001';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('products');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({ name: '', price: '', description: '', image: '' });

    const [heroData, setHeroData] = useState({});
    const [showHeroForm, setShowHeroForm] = useState(false);
    
    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn');
        if (loggedIn === 'true') {
            setIsLoggedIn(true);
            loadProducts();
        } else {
            setShowLogin(true);
        }

        const loadHero = async () => {
            const data = await getHero();
            if (data) setHeroData(data);
        };
    }, []);

    const loadProducts = async () => {
        try {
            const res = await fetch(`${API_BASE}/products`);
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Fehler beim Laden der Produkte:', error);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginData.username === 'admin' && loginData.password === 'password') {
            localStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);
            setShowLogin(false);
            loadProducts();
        } else {
            alert('Falsche Anmeldedaten!');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        setShowLogin(true);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'products') loadProducts();
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                // Update
                await fetch(`${API_BASE}/products/${editingProduct.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            } else {
                // Add
                await fetch(`${API_BASE}/products`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            }
            setShowModal(false);
            loadProducts(); // Refresh
            setFormData({ name: '', price: '', description: '', image: '' });
            setEditingProduct(null);
        } catch (error) {
            console.error('Fehler beim Speichern:', error);
        }
    };

    const deleteProduct = async (id) => {
        if (!confirm('Sicher löschen?')) return;
        try {
            await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
            loadProducts();
        } catch (error) {
            console.error('Fehler beim Löschen:', error);
        }
    };

    const openModal = (product = null) => {
        setEditingProduct(product);
        setFormData(product || { name: '', price: '', description: '', image: '' });
        setShowModal(true);
    };

    if (showLogin) {
        return (
            <div className="login-modal">
                <div className="login-content">
                    <h2>Anmelden</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Benutzername"
                            value={loginData.username}
                            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Passwort"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                        <button type="submit">Einloggen</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', background: '#faf7f7' }}>
                <button onClick={handleLogout} style={{ background: '#e9c5c5', color: '#2c3e50', padding: '8px 16px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                    Ausloggen
                </button>
            </div>
            <h1>Dashboard</h1>
            <div className="tabs">
                <button
                    className={activeTab === 'products' ? 'active' : ''}
                    onClick={() => handleTabClick('products')}
                >
                    Produkte
                </button>
                <button
                    className={activeTab === 'pages' ? 'active' : ''}
                    onClick={() => handleTabClick('pages')}
                >
                    Seiten
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 'products' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h2>Produkte verwalten</h2>
                            <button onClick={() => openModal()} style={{ background: '#e9c5c5', color: '#2c3e50', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                                Neues Produkt hinzufügen
                            </button>
                        </div>
                        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                            {products.map((product) => (
                                <div key={product.id} className="product-card" style={{ background: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p style={{ color: '#e9c5c5', fontWeight: 'bold' }}>CHF{product.price}</p>
                                    <div style={{ marginTop: '10px' }}>
                                        <button onClick={() => openModal(product)} style={{ background: '#e9c5c5', color: '#2c3e50', padding: '5px 10px', marginRight: '5px', borderRadius: '3px', border: 'none' }}>
                                            Bearbeiten
                                        </button>
                                        <button onClick={() => deleteProduct(product.id)} style={{ background: '#f3f4f6', color: '#4a4a4a', padding: '5px 10px', borderRadius: '3px', border: 'none' }}>
                                            Löschen
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeTab === 'pages' && (
                    <div>
                        <h2>Seiten verwalten</h2>
                        <button onClick={() => setShowHeroForm(!showHeroForm)} style={{ background: '#e9c5c5', color: '#2c3e50', padding: '10px 20px', borderRadius: '5px', border: 'none', marginBottom: '20px' }}>
                            {showHeroForm ? 'Formular schließen' : 'Hero-Seite bearbeiten'}
                        </button>
                        {showHeroForm && (
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                try {
                                    await updateHero({ title: e.target.title.value, subtitle: e.target.subtitle.value, label: e.target.label.value, image: e.target.image.value });
                                    alert('Gespeichert!');
                                    loadHero(); // Рефреш
                                } catch (error) {
                                    alert('Fehler beim Speichern!');
                                }
                            }} style={{ display: 'grid', gap: '10px', maxWidth: '400px' }}>
                                <label>Title:</label>
                                <input type="text" name="title" defaultValue={heroData.title || ''} required />
                                <label>Subtitle:</label>
                                <input type="text" name="subtitle" defaultValue={heroData.subtitle || ''} required />
                                <label>Label:</label>
                                <input type="text" name="label" defaultValue={heroData.label || ''} required />
                                <label>Image URL:</label>
                                <input type="text" name="image" defaultValue={heroData.image || ''} />
                                <button type="submit" style={{ background: '#e9c5c5', color: '#2c3e50', padding: '10px', borderRadius: '5px', border: 'none' }}>Speichern</button>
                            </form>
                        )}
                        <div style={{ marginTop: '20px', padding: '15px', background: 'white', borderRadius: '10px' }}>
                            <h3>Vorschau Hero:</h3>
                            <p><strong>Title:</strong> {heroData.title || 'Kein Inhalt'}</p>
                            <p><strong>Subtitle:</strong> {heroData.subtitle || 'Kein Inhalt'}</p>
                            {/* Додай img preview, якщо хочеш: <img src={heroData.image} alt="Hero" style={{ maxWidth: '200px' }} /> */}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for edit/add */}
            {showModal && (
                <div className="login-modal" style={{ zIndex: 2001 }}> {/* Reuse login-modal styles */}
                    <div className="login-content" style={{ maxWidth: '400px', textAlign: 'left' }}>
                        <h2>{editingProduct ? 'Produkt bearbeiten' : 'Neues Produkt'}</h2>
                        <form onSubmit={saveProduct}>
                            <label>Name:</label>
                            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                            <label>Preis (CHF):</label>
                            <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                            <label>Beschreibung:</label>
                            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3" required />
                            <label>Bild URL:</label>
                            <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                <button type="submit" style={{ flex: 1, background: '#e9c5c5', color: '#2c3e50', padding: '10px', borderRadius: '5px', border: 'none' }}>
                                    Speichern
                                </button>
                                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, background: 'transparent', border: '1px solid #e9c5c5', padding: '10px', borderRadius: '5px' }}>
                                    Abbrechen
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
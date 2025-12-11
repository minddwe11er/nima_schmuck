'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchProducts } from '@/api/productsAPI';
import Link from 'next/link'; // Для деталки

import SideBar from '../products/SideBar';
import CartModal from '../CartModal';
import FloatingCartIcon from '../FloatingCartIcon';

export default function ProductsPage() {
    const [cartOpen, setCartOpen] = useState(false);
    const [products, setProducts] = useState([]); // Стан для товарів
    const [loading, setLoading] = useState(true); // Стан завантаження
    const [pagination, setPagination] = useState({}); // Для пагінації (поки базово)

    const router = useRouter();
    const searchParams = useSearchParams(); // Для URL-параметрів (?page=1)

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const page = searchParams.get('page') || 1;
                const limit = searchParams.get('limit') || 10;
                const category = searchParams.get('category') || '';
                const search = searchParams.get('search') || '';

                const data = await fetchProducts({ page: Number(page), limit: Number(limit), search, category });
                setProducts(data.data || []); // З API: { data: [...], pagination: {...} }
                setPagination(data.pagination || {});
            } catch (error) {
                console.error('Помилка завантаження:', error);
                setProducts([]); // Порожній на помилку
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [searchParams]); // Залежність від URL-параметрів

    if (loading) {
        return <div className="products">Завантажуємо товари...</div>; // Простий лоадер
    }

    return (
        <>
            <main className="products">
                <div className="container">
                    <SideBar />
                    <FloatingCartIcon
                        onClick={() => setCartOpen(!cartOpen)}
                        itemsCount={3}
                        isVisible={!cartOpen} />
                    <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} onCheckout={() => router.push('/cart')} />
                    <section className="product-grid">
                        <h2 className="products-title">Unser Schmuck</h2>
                        <div className="grid">
                            {products.map((product) => (
                                <Link key={product.id} href={`/products/${product.id}`}>
                                    <article className="product-card">
                                        <img
                                            src={product.image_url?.replace('/public', '') || 'https://via.placeholder.com/300x300/E9C5C5/white?text=Schmuck'}
                                            alt={product.name}
                                        />
                                        <h3>{product.name}</h3>
                                        <p className="price">{product.price} CHF</p>
                                        <button className="buy-btn">Kaufen</button>
                                    </article>
                                </Link>
                            ))}
                        </div>

                        {/* Базова пагінація — наступний крок розширимо */}
                        {pagination.total > Number(searchParams.get('limit') || 10) && (
                            <div className="pagination" style={{ textAlign: 'center', marginTop: '20px' }}>
                                <Link href={`/products?page=${Number(searchParams.get('page') || 1) - 1}`} style={{ marginRight: '10px' }}>
                                    ← Vorherige
                                </Link>
                                <span>Seite {searchParams.get('page') || 1} von {Math.ceil(pagination.total / (searchParams.get('limit') || 10))}</span>
                                <Link href={`/products?page=${Number(searchParams.get('page') || 1) + 1}`} style={{ marginLeft: '10px' }}>
                                    Nächste →
                                </Link>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
}
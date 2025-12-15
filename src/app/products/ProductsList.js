'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchProducts, fetchProductsCount } from '@/api/productsAPI';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart'; // Шлях до твого hook (створи, якщо немає)

import SideBar from './SideBar';
import CartModal from '../CartModal';
import FloatingCartIcon from '../FloatingCartIcon';

export default function ProductsList() {
    const [cartOpen, setCartOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({});

    const { addToCart, totalItems } = useCart();

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const page = searchParams.get('page') || 1;
                const limit = searchParams.get('limit') || 6;
                const category = searchParams.get('category') || '';
                const search = searchParams.get('search') || '';

                const allData = await fetchProducts({ all: true, search, category });
                const count = await fetchProductsCount()

                const startIndex = (Number(page) - 1) * Number(limit);
                const endIndex = startIndex + Number(limit);
                const paginatedProducts = allData.slice(startIndex, endIndex);

                setProducts(paginatedProducts || []);
                console.log(paginatedProducts)
                setPagination({ total: allData.length, page: Number(page), limit: Number(limit) });
            } catch (error) {
                console.error('Loading error:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [searchParams]);

    const handleAddToCart = (product) => {
        const imageUrl = `https://nima.crazy-internet.ch/team3-backend/images/${product.card_front || '/1.jpg'}`;
        addToCart(product.id, {
            name: product.name,
            price: product.price,
            imageUrl
        });

        alert(`${product.name} hinzugefügt zum Warenkorb!`);
    };

    return (
        <>
            <main className="products">
                <div className="container">
                    <SideBar
                        onCategoryChange={(category) => {
                            const currentPage = searchParams.get('page') || 1;
                            router.push(`/products?category=${category}&page=1`);
                        }}
                        onTypeChange={(type, checked) => {
                            const currentUrl = new URL(window.location.href);
                            if (checked) {
                                currentUrl.searchParams.set('type', type);
                            } else {
                                currentUrl.searchParams.delete('type');
                            }
                            router.push(currentUrl.pathname + currentUrl.search);
                        }}
                        onPriceChange={(price) => {
                            const currentUrl = new URL(window.location.href);
                            if (price) {
                                currentUrl.searchParams.set('price', price);
                            } else {
                                currentUrl.searchParams.delete('price');
                            }
                            router.push(currentUrl.pathname + currentUrl.search);
                        }}
                        onApplyFilters={(types, price) => {
                            const currentUrl = new URL(window.location.href);
                            types.forEach(type => currentUrl.searchParams.set('type', type));
                            if (price) currentUrl.searchParams.set('price', price);
                            currentUrl.searchParams.set('page', '1');
                            router.push(currentUrl.pathname + currentUrl.search);
                        }}
                    />
                    <FloatingCartIcon
                        onClick={() => setCartOpen(!cartOpen)}
                        itemsCount={totalItems}
                        isVisible={!cartOpen} />
                    <CartModal
                        isOpen={cartOpen}
                        itemsCount={totalItems}
                        totalSum={0}
                        onClose={() => setCartOpen(false)}
                        onCheckout={() => router.push('/cart')} />
                    <section className="product-grid">
                        <h2 className="products-title">Unser Schmuck</h2>
                        <div className="grid">
                            {products.map((product) => (
                                <Link key={product.id} href={`/products/${product.id}`}>
                                    <article className="product-card">
                                        <div className="image-wrapper">
                                            <img
                                                src={product.card_front || product.card_back ? `https://nima.crazy-internet.ch/team3-backend/images/${product.card_front}` : '/1.jpg'}
                                                alt={product.name}
                                                className="card-image"
                                                style={{
                                                    objectFit: 'cover',
                                                    objectPosition: 'center',
                                                    transform: 'scale(2) translateY(10px)',
                                                    width: '100%',
                                                    height: '100%'
                                                }}
                                            />
                                        </div>
                                        <h3>{product.name}</h3>
                                        <p className="price">{product.price} CHF</p>
                                        <button
                                            className="buy-btn"
                                            onClick={(e) => {
                                                e.preventDefault(); // Не переходити по Link
                                                handleAddToCart(product);
                                            }}
                                        >
                                            Kaufen
                                        </button>
                                    </article>
                                </Link>
                            ))}
                        </div>

                        {pagination.total > Number(searchParams.get('limit') || 6) && (
                            <div className="pagination" style={{ textAlign: 'center', marginTop: '20px' }}>
                                <Link href={`/products?page=${Number(searchParams.get('page') || 1) - 1}`} style={{ marginRight: '10px' }}>
                                    ← Vorherige
                                </Link>
                                <span>Seite {searchParams.get('page') || 1} von {Math.ceil(pagination.total / (searchParams.get('limit') || 5))}</span>
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
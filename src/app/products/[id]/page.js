import { fetchProductById, fetchRelatedProducts } from '@/api/productsAPI';
import Image from 'next/image'; // Для оптимізації фото
import Link from 'next/link';

export default async function Product({ params }) {
    const { id } = await params; // Отримуємо ID з URL

    let product = null;
    let related = [];
    let error = null;

    try {
        product = await fetchProductById(id);
        // console.log('Full product object:', product);
    } catch (err) {
        error = err.message;
        // console.log('Full error:', err);
    }

    try {
        related = await fetchRelatedProducts(product.stone, id, 3);
        console.log('Related products:', related);
    } catch (err) {
        console.log('Error fetching related:', err);
    }

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!product) {
        return <div>Товар не знайдено</div>;
    }

    const galleryImages = [
        ...product.images.map(item => ({ src: item.slice(8, -1), alt: '' })), // Масив з 'images' з API
        { src: product.card_front, alt: `${product.name} front` },
        { src: product.card_back, alt: `${product.name} back` },
    ].filter(img => img.src); // Фільтр порожніх

    return (
        <section className="product-detail">
            <div className="container">
                <div className="detail-content">
                    <div className="product-main">
                        <div className="main-image">
                            <div className="gallery">
                                <Image
                                    src={`https://nima.crazy-internet.ch/team3-backend/images/${encodeURIComponent(product.card_front
                                        || 'placeholder.jpg')}`}
                                    alt={galleryImages[0]?.alt || product.name}
                                    width={400}
                                    height={400}
                                    priority
                                />
                            </div>
                        </div>
                        <div className="product-info">
                            <h1 className="product-name">{product.name}</h1>
                            <p className="price-large">{product.price} CHF</p>
                            <p className="description">{product.description}</p>
                            <div className="specs">
                                <h3>Spezifikationen</h3>
                                <p className='description'>Stein: {product.stone}</p>
                                <p className='description'>Category: {product.category}</p>
                            </div>
                            <button className="add-to-cart">In den Warenkorb</button>
                        </div>
                    </div>
                </div>

                <section className="related-products">
                    <h2 className="related-title">Ähnliche Produkte</h2>
                    <div className="related-grid">
                        {related.map((item, index) => (
                            <Link key={item.id || index} href={`/products/${item.id}`}>
                                <article className="product-card small-card">
                                    <Image
                                        src={`https://nima.crazy-internet.ch/team3-backend/images/${encodeURIComponent(item.card_front || 'placeholder.jpg')}`}
                                        alt={item.name}
                                        width={150}
                                        height={150}
                                        className="small-image"
                                    />
                                    <h3>{item.name}</h3>
                                    <p className="price">{item.price} CHF</p>
                                    <button className="buy-btn small-btn">Kaufen</button>
                                </article>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    )
}
import { fetchProductById } from '@/api/productsAPI';

export default async function Product({ params }) {
    const { id } = await params;

    let product = null;
    let error = null;

    try {
        product = await fetchProductById(id);
    } catch (err) {
        error = err.message;
    }

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    if (!product) {
        return <div>Товар не знайдено</div>;
    }

    return (
        <section className="product-detail">
            <div className="container">
                <div className="detail-content">
                    <div className="product-main">
                        <div className="main-image">
                            <img src={product.imageUrl} alt={product.name} />
                        </div>
                        <div className="product-info">
                            <h1 className="product-name">{product.name}</h1>
                            <p className="price-large">{product.price} CHF</p>
                            <p className="description">{product.description}</p>
                            <div className="specs">
                                <h3>Spezifikationen</h3>
                                <ul>
                                    {/* {product.specs.map((spec, index) => (
                                        <li key={index}>{spec}</li>
                                    ))} */}
                                </ul>
                            </div>
                            <button className="add-to-cart">In den Warenkorb</button>
                        </div>
                    </div>
                </div>

                <section className="related-products">
                    <h2 className="related-title">Ähnliche Produkte</h2>
                    <div className="related-grid">
                        {/* {product.related.map((item, index) => (
                            <article key={index} className="product-card small-card">
                                <img src={item.image} alt={item.name} />
                                <h3>{item.name}</h3>
                                <p className="price">{item.price}</p>
                                <button className="buy-btn small-btn">Kaufen</button>
                            </article>
                        ))} */}
                    </div>
                </section>
            </div>
        </section>
    );
}
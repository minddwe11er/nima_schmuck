import Link from 'next/link';

export default function AboutPage() {
    return (
        <main className="about-page">
            {/* Хедер і футер вже в layout.tsx, тут тільки контент */}
            <section className="about-hero">
                <div className="container">
                    <h1 className="about-title">Über Nima Schmuck</h1>
                    <p className="about-subtitle">
                        Handgefertigter Schmuck mit Herz und Leidenschaft aus der Schweiz.
                    </p>
                </div>
            </section>

            <section className="about-story">
                <div className="container">
                    <h2 className="section-title">Unsere Geschichte</h2>
                    <p className="story-text">
                        Seit 2015 fertigen wir in unserem kleinen Atelier in Zürich einzigartige Ketten, Ringe und Ohrringe. Jeder Stück erzählt eine Geschichte – inspiriert von der Natur und der Schönheit des Alltags. Mit hochwertigen Materialien wie Gold und Silber schaffen wir Schmuck, der Generationen überdauert.
                    </p>
                    <div className="story-image">
                        {/* Тут можеш додати img з hero-image стилем */}
                        <img src="/about.jpeg" alt="Unser Atelier" /> {/* Заміни на реальне зображення */}
                    </div>
                </div>
            </section>

            <section className="about-mission">
                <div className="container">
                    <h2 className="section-title">Unsere Mission</h2>
                    <p className="mission-text">
                        Wir glauben an nachhaltigen Luxus. Jeder unserer Produkte wird fair produziert, umweltfreundlich verpackt und mit Liebe gestaltet. Entdecken Sie, wie Schmuck Ihr Leben bereichern kann.
                    </p>
                    <Link href="/products" className="shop-btn">
                        Zur Kollektion
                    </Link>
                </div>
            </section>

            {/* Додай футер в layout, якщо ще не */}
        </main>
    );
}
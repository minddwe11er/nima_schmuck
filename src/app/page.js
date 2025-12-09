import Link from 'next/link';
import { Delius } from 'next/font/google'

const heroFont = Delius({ subsets: ['latin'], weight: ['400'], variable: '--font-hero' })

export default function Home() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-title">
            <h2 className={heroFont.variable}>Schmuck mit Bedeutung, liebevoll handgefertigt</h2>
          </div>
          <p className="hero-subtitle">
            Entdecke Armbändeli und Ohrringe, die Schönheit mit der besonderen Kraft der
            Edelsteine vereinen – jedes Stück ein liebevoller Begleiter für Mut, Liebe und
            Gelassenheit.
          </p>
          <div className="cta-buttons">
            <Link href="/items" className="link-wrapper">
              <button className="shop-btn">Kollektion entdecken</button>
            </Link>
            <Link href="/stein-finden" className="link-wrapper"> {/* НОВЕ: Обгортка для вторинної */}
              <button className="secondary-btn">Finde deinen Stein</button>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="/hero.jpg"
            alt="model"
          />
        </div>
      </div>
    </section>
  )
}
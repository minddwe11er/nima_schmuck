import './globals.css'
import { Borel } from 'next/font/google'

const borelFont = Borel({ subsets: ['latin'], weight: ['400'], variable: '--font-borel' })


export const metadata = {
  title: 'Nima Schmuck',
  description: 'Schmuck Webshop',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <header className="header">
          <div className="container">
            <div className="logo">
              <h1 className={borelFont.variable}><a href="/">Nima Schmuck</a></h1>
            </div>
            <nav className="nav">
              <ul>
                {/* <a href="/">Startseite</a></li> */}
                <li><a href="/items">Produkte</a></li> <li><a href="/about">Über uns</a></li> <li><a href="/contact">Kontakt</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h3>Nima Schmuck</h3> <p>Feinster Schmuck für besondere Momente.</p>
              </div>
              <div className="footer-section">
                <h4>Kontakten</h4>
                <ul>
                  <li>Email: info@nima-schmuck.de</li>
                  <li>Tel: +49 123 456789</li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Soziale Medien</h4>
                <ul className="social-links">
                  <li><a href="#">Instagram</a></li>
                  <li><a href="#">Facebook</a></li>
                  <li><a href="#">Pinterest</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2025 Nima Schmuck.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
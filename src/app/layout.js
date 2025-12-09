import './globals.css'

import ConditionalHeader from './ConditionalHeader';

export const metadata = {
  title: 'Nima Schmuck',
  description: 'Schmuck Webshop',
}

export default async function RootLayout({ children }) {
  // placeholder for cart count, replace with actual state management
  return (
    <html lang="de">
      <body>
        <ConditionalHeader />
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
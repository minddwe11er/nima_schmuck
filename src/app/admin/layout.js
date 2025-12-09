export default function AdminLayout({ children }) {
    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <h2>Admin</h2>
                <nav>
                    <ul>
                        <li><a href="/"><button>Hauptseite</button></a></li>
                        <li><button>Produkte</button></li>
                        <li><button>Seiten</button></li>
                    </ul>
                </nav>
            </aside>
            <main className="admin-main">{children}</main>
        </div>
    );
}
export default function SideBar() {
    return (
        <aside className="sidebar">
            <h3 className="sidebar-title">Kategorien</h3>
            <ul className="categories">
                <li><a href="#ketten">Ketten</a></li>
                <li><a href="#ohrringe">Ohrringe</a></li>
                <li><a href="#ringe">Ringe</a></li>
                <li><a href="#armbaender">Armbänder</a></li>
            </ul>

            <h3 className="sidebar-title">Filter</h3>
            <div className="filters">
                <div className="filter-group">
                    <h4>Typ</h4>
                    <label>
                        <input type="checkbox" name="type" value="handmade" />
                        Handarbeit
                    </label>
                    <label>
                        <input type="checkbox" name="type" value="bijouterie" />
                        Mode-Schmuck
                    </label>
                </div>
                <div className="filter-group">
                    <h4>Preis</h4>
                    <select name="price">
                        <option>Alle</option>
                        <option>Bis 50 CHF</option>
                        <option>50-100 CHF</option>
                        <option>Über 100 CHF</option>
                    </select>
                </div>
                <button className="apply-filter">Anwenden</button>
            </div>
        </aside>
    )
}
'use client'

import { useState } from "react";

export default function SideBar({ onCategoryChange, onTypeChange, onPriceChange, onApplyFilters }) {
    const [selectedTypes, setSelectedTypes] = useState([]); 
    const [selectedPrice, setSelectedPrice] = useState(''); 

    const handleTypeChange = (e) => {
        const value = e.target.value;
        setSelectedTypes(prev =>
            prev.includes(value) ? prev.filter(t => t !== value) : [...prev, value]
        );
        onTypeChange(value, e.target.checked); // Колбек в parent для URL
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setSelectedPrice(value);
        onPriceChange(value); // Колбек в parent
    };

    const handleApply = () => {
        onApplyFilters(selectedTypes, selectedPrice); // Збираємо все і оновлюємо URL
    };

    return (
        <aside className="sidebar">
            <h3 className="sidebar-title">Kategorien</h3>
            <ul className="categories">
                <li><button onClick={() => onCategoryChange('Armband')}>Armband</button></li>
                <li><button onClick={() => onCategoryChange('Ohrring')}>Ohrring</button></li>
            </ul>

            <h3 className="sidebar-title">Filter</h3>
            <div className="filters">
                <div className="filter-group">
                    <h4>Typ</h4>
                    <label>
                        <input
                            type="checkbox"
                            name="type"
                            value="Serie"
                            onChange={handleTypeChange} // Додаємо onChange
                            checked={selectedTypes.includes('Serie')} // Синхрон з станом
                        />
                        Serie
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="type"
                            value="Klassisch"
                            onChange={handleTypeChange}
                            checked={selectedTypes.includes('Klassisch')}
                        />
                        Klassisch
                    </label>
                </div>
                <div className="filter-group">
                    <h4>Preis</h4>
                    <select name="price" value={selectedPrice} onChange={handlePriceChange}> {/* Додаємо value/onChange */}
                        <option value="">Alle</option>
                        <option value="0-50">Bis 50 CHF</option>
                        <option value="50-100">50-100 CHF</option>
                        <option value="100+">Über 100 CHF</option>
                    </select>
                </div>
                <button className="apply-filter" onClick={handleApply}>Anwenden</button> {/* Оживляємо кнопку */}
            </div>
        </aside>
    );
}
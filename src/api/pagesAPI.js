const API_BASE = 'http://localhost:3001';

export async function getHero() {
    try {
        const res = await fetch(`${API_BASE}/pages`);
        if (!res.ok) throw new Error('Fehler beim Laden');
        const data = await res.json();
        return data.hero || null;
    } catch (error) {
        console.error('Hero laden Fehler:', error);
        return null;
    }
}

export async function updateHero(heroData) {
    try {
        const res = await fetch(`${API_BASE}/pages`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hero: heroData }),
        });
        if (!res.ok) throw new Error('Fehler beim Speichern');
        return await res.json();
    } catch (error) {
        console.error('Hero speichern Fehler:', error);
        throw error;
    }
}
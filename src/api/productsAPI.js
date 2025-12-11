// src/api/productsApi.js

const BASE_URL = '/api';
const FULL_URL = 'https://nima.crazy-internet.ch/team3-backend/api/'

export const fetchProducts = async ({ page = 1, limit = 6, search = '', category = '', all = false } = {}) => {
    try {
        let url = `${BASE_URL}/products`;
        if (!all) {
            url += `?page=${page}&limit=${limit}`;
        } else {
            url += `?limit=999`;
        }
        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (category) url += `&category=${category}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Не вдалося завантажити товари');
        return await response.json();
    } catch (error) {
        console.error('Помилка:', error);
        throw error;
    }
};

// Фетч одного товару по ID (для деталки)
export const fetchProductById = async (id) => {
    const FULL_URL = `https://nima.crazy-internet.ch/team3-backend/api/products/${id}`;
    try {
        const response = await fetch(FULL_URL);
        if (!response.ok) {
            const text = await response.text();
            console.log('Direct API response text:', text.substring(0, 200)); // Лог для тесту
            throw new Error('Товар не знайдено');
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('API повернув не JSON');
        }

        return await response.json(); // { id, name, price, image_url, ... }
    } catch (error) {
        console.error('Помилка завантаження товару:', error);
        throw error;
    }
};

export const fetchRelatedProducts = async (stone, currentId, limit = 3) => {
    try {
        const response = await fetch(`${FULL_URL}/products/?stone=${stone}&limit=${limit}`);
        if (!response.ok) throw new Error('Не вдалося завантажити схожі товари');
        const data = await response.json();
        // Фільтр — виключаємо поточний ID
        const related = (data || []).filter(p => p.id !== currentId);
        return related.slice(0, limit); // Обрізаємо до limit
    } catch (error) {
        console.error('Помилка схожих:', error);
        throw error;
    }
};

export const fetchProductsCount = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products/count`);
        if (!response.ok) throw new Error('Не вдалося завантажити кількість');
        const { total } = await response.json(); // Змінюємо на { total }
        return total; // Повертаємо число (11)
    } catch (error) {
        console.error('Помилка count:', error);
        throw error;
    }
};
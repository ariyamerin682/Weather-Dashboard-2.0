// API Client for communicating with backend
const API_BASE = 'http://localhost:5000/api';

export async function getCities() {
    const response = await fetch(`${API_BASE}/cities`);
    if (!response.ok) throw new Error('Failed to fetch cities');
    return response.json();
}

export async function getCity(name) {
    const response = await fetch(`${API_BASE}/cities/${encodeURIComponent(name)}`);
    if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch city');
    }
    return response.json();
}

export async function createCity(cityData) {
    const response = await fetch(`${API_BASE}/cities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cityData)
    });
    if (!response.ok) throw new Error('Failed to create city');
    return response.json();
}

export async function updateCity(id, updates) {
    const response = await fetch(`${API_BASE}/cities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Failed to update city');
    return response.json();
}

export async function deleteCity(id) {
    const response = await fetch(`${API_BASE}/cities/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete city');
    return response.json();
}

export async function getFavorites() {
    const response = await fetch(`${API_BASE}/cities/favorites`);
    if (!response.ok) throw new Error('Failed to fetch favorites');
    return response.json();
}

export async function logSearch(searchData) {
    const response = await fetch(`${API_BASE}/searches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchData)
    });
    if (!response.ok) throw new Error('Failed to log search');
    return response.json();
}

export async function getRecentSearches() {
    const response = await fetch(`${API_BASE}/searches`);
    if (!response.ok) throw new Error('Failed to fetch searches');
    return response.json();
}

export async function getSearchStats() {
    const response = await fetch(`${API_BASE}/searches/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
}
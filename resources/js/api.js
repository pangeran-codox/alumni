const BASE_URL = '';

async function request(path, options = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: {
            'Accept': 'application/json',
            ...options.headers,
        },
        ...options,
    });
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    return res.json();
}

export function getAlumni(params = {}) {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v !== '' && v !== null && v !== undefined) {
            qs.append(k, v);
        }
    });
    const query = qs.toString();
    return request(`/api/alumni${query ? `?${query}` : ''}`);
}

export function getAlumniStats() {
    return request('/api/alumni/stats');
}

export function getFilters() {
    return request('/api/alumni/filters');
}

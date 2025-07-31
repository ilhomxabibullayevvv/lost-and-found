import axios from 'axios';

const API_BASE = 'https://688b190d2a52cabb9f500bda.mockapi.io/api/v1';

export interface Item {
    id: string;
    imageUrl: string;
    name: string;
    location: string;
    date: string;
    type: 'Lost' | 'Found';
    status: 'Active' | 'Done';
}

export async function fetchItems(): Promise<Item[]> {
    try {
        const res = await axios.get<Item[]>(`${API_BASE}/items`);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch items:', error);
        return [];
    }
}

export async function addItem(item: Omit<Item, 'id'>) {
    try {
        const res = await axios.post<Item>(`${API_BASE}/items`, item);
        return res.data;
    } catch (error) {
        console.error('Failed to add item:', error);
        throw error;
    }
}

export async function updateItem(id: string, data: Partial<Item>) {
    try {
        const res = await axios.put<Item>(`${API_BASE}/items/${id}`, data);
        return res.data;
    } catch (error) {
        console.error('Failed to update item:', error);
        throw error;
    }
}

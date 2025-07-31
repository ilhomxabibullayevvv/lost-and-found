import { useEffect, useState } from 'react';
import { fetchItems, updateItem } from '../api/apiClient';
import type { Item } from '../api/apiClient';
import { useDebounce } from '../hook/useDeponce';
import Filters from './Filter';

export default function ItemList() {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Lost' | 'Found'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Done'>('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  const loadItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchItems();
      setItems(data);
    } catch (err) {
      setError('Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleMarkDone = async (id: string) => {
    try {
      await updateItem(id, { status: 'Done' });
      setItems(prevItems => prevItems.map(i => i.id === id ? { ...i, status: 'Done' } : i));
    } catch {
      alert('Failed to update item status.');
    }
  };

  const filtered = items.filter(i => {
    const matchesType = typeFilter === 'All' || i.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || i.status === statusFilter;
    const matchesSearch = i.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div>
      <Filters {...{ typeFilter, setTypeFilter, statusFilter, setStatusFilter, search, setSearch }} />
      {loading && <p className="text-center py-4">Loading items...</p>}
      {error && <p className="text-center text-red-600 py-4">{error}</p>}
      {!loading && filtered.length === 0 && <p className="text-center py-4">No items found.</p>}
      <ul className="space-y-2">
        {filtered.map(i => (
          <li key={i.id} className="border p-2 flex items-center">
            <img src={i.imageUrl} alt={i.name} className="w-16 h-16 object-cover mr-4 rounded" />
            <div className="flex-1">
              <h3 className="font-semibold">{i.name}</h3>
              <p>{i.location} – {i.date} – {i.type} – {i.status}</p>
            </div>
            {i.status === 'Active' && (
              <button onClick={() => handleMarkDone(i.id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
                Mark Done
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

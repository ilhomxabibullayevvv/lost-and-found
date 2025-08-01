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

      {loading && <p className="text-center py-6 text-gray-600">Loading items...</p>}
      {error && <p className="text-center py-6 text-red-600 font-semibold">{error}</p>}
      {!loading && filtered.length === 0 && (
        <p className="text-center py-6 text-gray-500 font-medium">No items found.</p>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(i => (
          <li
            key={i.id}
            className="bg-white shadow-md rounded-md overflow-hidden flex flex-col sm:flex-row items-center p-4 hover:shadow-lg transition"
          >
            <img
              src={i.imageUrl}
              alt={i.name}
              className="w-full sm:w-32 h-32 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4 flex-shrink-0"
            />
            <div className="flex-1 w-full">
              <h3 className="text-lg font-semibold text-gray-900">{i.name}</h3>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Location:</span> {i.location}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Date:</span> {i.date}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 rounded px-2 py-1 text-xs font-semibold">
                  {i.type}
                </span>
                <span
                  className={`rounded px-2 py-1 text-xs font-semibold ${i.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 text-gray-600'
                    }`}
                >
                  {i.status}
                </span>
              </div>
            </div>
            {i.status === 'Active' && (
              <button
                onClick={() => handleMarkDone(i.id)}
                className="mt-4 sm:mt-0 sm:ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
              >
                Mark Done
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

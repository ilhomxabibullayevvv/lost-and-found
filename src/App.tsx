import { useState, useCallback } from 'react';
import { AddItemForm } from './components/AddItemForm';
import ItemList from './components/ItemList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdded = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">
        Lost & Found Board
      </h1>
      <AddItemForm onAdded={handleAdded} />
      <ItemList key={refreshKey} />
    </div>
  );
}

export default App;

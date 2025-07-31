import { useState, useCallback } from 'react';
import { AddItemForm } from './components/AddItemForm';
import ItemList from './components/ItemList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdded = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Lost & Found Board</h1>
      <AddItemForm onAdded={handleAdded} />
      <ItemList key={refreshKey} />
    </div>
  );
}

export default App;

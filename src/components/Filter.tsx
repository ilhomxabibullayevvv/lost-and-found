interface FiltersProps {
    typeFilter: 'All' | 'Lost' | 'Found';
    setTypeFilter: (value: 'All' | 'Lost' | 'Found') => void;
    statusFilter: 'All' | 'Active' | 'Done';
    setStatusFilter: (value: 'All' | 'Active' | 'Done') => void;
    search: string;
    setSearch: (value: string) => void;
}

export default function Filters({
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
}: FiltersProps) {
    const handleReset = () => {
        setTypeFilter('All');
        setStatusFilter('All');
        setSearch('');
    };

    return (
        <div className="flex flex-wrap gap-2 mb-4 items-center">
            <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as 'All' | 'Lost' | 'Found')}
                className="border rounded p-2"
            >
                <option value="All">All</option>
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
            </select>

            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'All' | 'Active' | 'Done')}
                className="border rounded p-2"
            >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Done">Done</option>
            </select>

            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name"
                className="flex-1 border rounded p-2"
            />

            <button onClick={handleReset} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">
                Reset Filters
            </button>
        </div>
    );
}

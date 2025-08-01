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
        <div className="flex flex-wrap gap-3 mb-6 items-center justify-center">
            <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as 'All' | 'Lost' | 'Found')}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="All">All</option>
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
            </select>

            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'All' | 'Active' | 'Done')}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="flex-1 min-w-[150px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={handleReset}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition"
            >
                Reset Filters
            </button>
        </div>
    );
}

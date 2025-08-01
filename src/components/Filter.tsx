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
        <div className="flex flex-wrap justify-center gap-4 items-center mb-6 px-2 max-w-4xl mx-auto">
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
                className="min-w-[150px] flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={handleReset}
                className="bg-gray-400 hover:bg-gray-500 text-white rounded-md px-4 py-2 transition"
            >
                Reset Filters
            </button>
        </div>
    );
}

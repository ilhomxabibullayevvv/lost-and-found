import { useForm } from 'react-hook-form';
import { addItem } from '../api/apiClient';
import { useState } from 'react';

interface FormValues {
    imageUrl: string;
    name: string;
    location: string;
    date: string;
    type: 'Lost' | 'Found';
    status: 'Active' | 'Done';
}

export function AddItemForm({ onAdded }: { onAdded: () => void }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        setError(null);
        try {
            await addItem(data);
            onAdded();
            reset();
        } catch {
            setError('Failed to add item. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 mt-8"
        >
            <h2 className="text-2xl font-semibold text-center mb-4 text-blue-700">Add New Item</h2>

            <input
                {...register('imageUrl', { required: true })}
                placeholder="Image URL"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.imageUrl && (
                <p className="text-red-600 text-sm">Image URL is required</p>
            )}

            <input
                {...register('name', { required: true })}
                placeholder="Name"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
                <p className="text-red-600 text-sm">Name is required</p>
            )}

            <input
                {...register('location', { required: true })}
                placeholder="Location"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.location && (
                <p className="text-red-600 text-sm">Location is required</p>
            )}

            <input
                type="date"
                {...register('date', { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.date && (
                <p className="text-red-600 text-sm">Date is required</p>
            )}

            <select
                {...register('type', { required: true })}
                defaultValue=""
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="" disabled>
                    Select type
                </option>
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
            </select>
            {errors.type && (
                <p className="text-red-600 text-sm">Type is required</p>
            )}

            <select
                {...register('status', { required: true })}
                defaultValue=""
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="" disabled>
                    Select status
                </option>
                <option value="Active">Active</option>
                <option value="Done">Done</option>
            </select>
            {errors.status && (
                <p className="text-red-600 text-sm">Status is required</p>
            )}

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-md text-white transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
            >
                {loading ? 'Adding...' : 'Add Item'}
            </button>

            {error && <p className="text-center text-red-600">{error}</p>}
        </form>
    );
}

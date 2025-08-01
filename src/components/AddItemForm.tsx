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
        } catch (err) {
            setError('Failed to add item. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-6 border rounded-md shadow bg-white max-w-md mx-auto"
        >
            <input
                {...register('imageUrl', { required: true })}
                placeholder="Image URL"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.imageUrl && (
                <span className="text-red-600 text-sm">Image URL is required</span>
            )}

            <input
                {...register('name', { required: true })}
                placeholder="Name"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
                <span className="text-red-600 text-sm">Name is required</span>
            )}

            <input
                {...register('location', { required: true })}
                placeholder="Location"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.location && (
                <span className="text-red-600 text-sm">Location is required</span>
            )}

            <input
                type="date"
                {...register('date', { required: true })}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.date && (
                <span className="text-red-600 text-sm">Date is required</span>
            )}

            <select
                {...register('type', { required: true })}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
            >
                <option value="" disabled>
                    Select type
                </option>
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
            </select>
            {errors.type && (
                <span className="text-red-600 text-sm">Type is required</span>
            )}

            <select
                {...register('status', { required: true })}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
            >
                <option value="" disabled>
                    Select status
                </option>
                <option value="Active">Active</option>
                <option value="Done">Done</option>
            </select>
            {errors.status && (
                <span className="text-red-600 text-sm">Status is required</span>
            )}

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-md text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    } transition`}
            >
                {loading ? 'Adding...' : 'Add Item'}
            </button>
            {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
        </form>
    );
}

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded shadow bg-white max-w-md mx-auto">
            <input
                {...register('imageUrl', { required: true })}
                placeholder="Image URL"
                className="w-full border rounded p-2"
            />
            {errors.imageUrl && <span className="text-red-600">Image URL is required</span>}

            <input
                {...register('name', { required: true })}
                placeholder="Name"
                className="w-full border rounded p-2"
            />
            {errors.name && <span className="text-red-600">Name is required</span>}

            <input
                {...register('location', { required: true })}
                placeholder="Location"
                className="w-full border rounded p-2"
            />
            {errors.location && <span className="text-red-600">Location is required</span>}

            <input
                type="date"
                {...register('date', { required: true })}
                className="w-full border rounded p-2"
            />
            {errors.date && <span className="text-red-600">Date is required</span>}

            <select
                {...register('type', { required: true })}
                className="w-full border rounded p-2"
                defaultValue=""
            >
                <option value="" disabled>
                    Select type
                </option>
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
            </select>
            {errors.type && <span className="text-red-600">Type is required</span>}

            <select
                {...register('status', { required: true })}
                className="w-full border rounded p-2"
                defaultValue=""
            >
                <option value="" disabled>
                    Select status
                </option>
                <option value="Active">Active</option>
                <option value="Done">Done</option>
            </select>
            {errors.status && <span className="text-red-600">Status is required</span>}

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {loading ? 'Adding...' : 'Add Item'}
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
    );
}

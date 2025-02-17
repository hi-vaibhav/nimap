'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Category } from '../lib/definitions';

export default function CategoryList({ categories }: { categories: Category[] }) {
    const router = useRouter();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState('');

    const handleEdit = async (id: number) => {
        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: editName }),
            });

            if (!res.ok) throw new Error('Failed to update category');

            setEditingId(null);
            router.refresh();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this category?')) return;

        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete category');

            router.refresh();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="mt-8">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{category.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {editingId === category.id ? (
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                ) : (
                                    category.name
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                {editingId === category.id ? (
                                    <button
                                        onClick={() => handleEdit(category.id)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setEditingId(category.id);
                                            setEditName(category.name);
                                        }}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} 
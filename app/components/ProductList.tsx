'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Product } from '../lib/definitions';

interface ProductListProps {
    products: Product[];
    currentPage: number;
    totalPages: number;
}

export default function ProductList({ products, currentPage, totalPages }: ProductListProps) {
    const router = useRouter();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<Partial<Product>>({});

    const handleEdit = async (id: number) => {
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editData),
            });

            if (!res.ok) throw new Error('Failed to update product');

            setEditingId(null);
            router.refresh();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete product');

            router.refresh();
        } catch (error) {
            console.error('Error deleting product:', error);
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
                            Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {editingId === product.id ? (
                                    <input
                                        type="text"
                                        value={editData.name || product.name}
                                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                ) : (
                                    product.name
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {editingId === product.id ? (
                                    <input
                                        type="number"
                                        value={editData.price || product.price}
                                        onChange={(e) => setEditData({ ...editData, price: parseFloat(e.target.value) })}
                                        step="0.01"
                                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                ) : (
                                    `$${product.price}`
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {product.category.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                {editingId === product.id ? (
                                    <button
                                        onClick={() => handleEdit(product.id)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setEditingId(product.id);
                                            setEditData({
                                                name: product.name,
                                                price: product.price,
                                            });
                                        }}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => router.push(`/products?page=${page}`)}
                        className={`px-3 py-2 rounded-md ${currentPage === page
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
} 
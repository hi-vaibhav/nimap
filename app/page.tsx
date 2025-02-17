import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-8">Welcome to Product Management</h1>
            <div className="space-y-4">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-2">Manage Categories</h2>
                    <p className="text-gray-600 mb-4">Create and manage product categories</p>
                    <Link
                        href="/categories"
                        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Go to Categories
                    </Link>
                </div>
                <div className="text-center mt-8">
                    <h2 className="text-2xl font-semibold mb-2">Manage Products</h2>
                    <p className="text-gray-600 mb-4">Create and manage products with pagination</p>
                    <Link
                        href="/products"
                        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Go to Products
                    </Link>
                </div>
            </div>
        </div>
    );
} 
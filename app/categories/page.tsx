import CategoryForm from '../components/CategoryForm';
import CategoryList from '../components/CategoryList';
import { prisma } from '../lib/db';

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Categories</h1>
            <div className="grid gap-8">
                <CategoryForm />
                <CategoryList categories={categories} />
            </div>
        </div>
    );
} 
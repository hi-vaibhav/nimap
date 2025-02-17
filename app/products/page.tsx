import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import { prisma } from '../lib/db';

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const currentPage = Number(searchParams.page) || 1;
    const pageSize = 10;
    const skip = (currentPage - 1) * pageSize;

    const [products, totalProducts] = await Promise.all([
        prisma.product.findMany({
            skip,
            take: pageSize,
            include: { category: true },
            orderBy: { createdAt: 'desc' },
        }).then(products => products.map(p => ({
            ...p,
            price: Number(p.price)
        }))),
        prisma.product.count(),
    ]);

    const totalPages = Math.ceil(totalProducts / pageSize);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Products</h1>
            <div className="grid gap-8">
                <ProductForm />
                <ProductList
                    products={products}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
} 
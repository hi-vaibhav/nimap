import { prisma } from '@/app/lib/db';
import { Decimal } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const json = await request.json();

        const category = await prisma.category.update({
            where: { id },
            data: json,
            include: {
                products: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        categoryId: true,
                        createdAt: true,
                        updatedAt: true
                    }
                }
            }
        });

        // Convert all Decimal prices to numbers in the products array
        const safeCategory = {
            ...category,
            products: category.products.map(p => ({
                ...p,
                price: Number(p.price)
            }))
        };

        return NextResponse.json(safeCategory);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update category' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        if (!params.id) {
            return new Response("ID is required", { status: 400 });
        }
        const id = parseInt(params.id);
        await prisma.category.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete category' },
            { status: 500 }
        );
    }
} 
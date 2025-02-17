import { prisma } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const product = await prisma.product.create({
            data: json,
            include: { category: true },
        });
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = Number(searchParams.get('page')) || 1;
        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                skip,
                take: pageSize,
                include: { category: true },
                orderBy: { createdAt: 'desc' },
            }),
            prisma.product.count(),
        ]);

        return NextResponse.json({
            products,
            totalPages: Math.ceil(total / pageSize),
            currentPage: page,
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
} 
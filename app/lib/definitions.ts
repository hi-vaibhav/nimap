export type Category = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Product = {
    id: number;
    name: string;
    price: number;
    categoryId: number;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
}; 
import Link from 'next/link';
import './globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <nav className="bg-gray-800 text-white p-4">
                    <div className="container mx-auto flex space-x-4">
                        <Link
                            href="/categories"
                            className="hover:text-gray-300 transition-colors"
                        >
                            Categories
                        </Link>
                        <Link
                            href="/products"
                            className="hover:text-gray-300 transition-colors"
                        >
                            Products
                        </Link>
                    </div>
                </nav>
                <main className="container mx-auto px-4 py-8">{children}</main>
            </body>
        </html>
    );
} 
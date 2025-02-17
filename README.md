# Product Management System

A web application built with Next.js and TypeScript for managing products and categories with CRUD operations.

## Features

- Create, Read, Update, and Delete Products
- Create, Read, Update, and Delete Categories
- Form validation
- Responsive design
- Server-side data management
- Real-time updates

## Screenshots

### Products Page
![Products Page](/public/image1.png)
*Products page showing the list of products with CRUD operations*

### Categories Page
![Categories Page](/public/image2.png)
*Categories page showing the list of categories*

## Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database
- npm or yarn package manager

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/product-management.git
   cd product-management
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp example.env .env
   ```
   Then edit `.env` with your PostgreSQL database connection string.

4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
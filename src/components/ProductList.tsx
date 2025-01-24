import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

const ProductList: React.FC = () => {
  // This is sample data - in a real app, you'd fetch this from an API
  const products: Product[] = [
    {
      id: '1',
      name: 'Sample Product 1',
      price: 99.99,
      description: 'This is a sample product description',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: '2',
      name: 'Sample Product 2',
      price: 149.99,
      description: 'Another sample product description',
      image: 'https://via.placeholder.com/300',
    },
    // Add more sample products as needed
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList; 
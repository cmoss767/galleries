import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

const ProductList = () => {
  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Headphones',
      price: 199.99,
      description: 'High-quality wireless headphones with noise cancellation',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 299.99,
      description: 'Feature-rich smartwatch with health tracking',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80',
    },
    {
      id: '3',
      name: 'Wireless Speaker',
      price: 149.99,
      description: 'Portable speaker with premium sound quality',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
    },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
      <h1 style={{ 
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px'
      }}>ALL PRODUCTS</h1>
      <div style={{ 
        display: 'flex',
        gap: '10px',
        marginBottom: '30px'
      }}>
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}>ALL</button>
        <button style={{
          padding: '8px 16px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: 'white'
        }}>FEATURED</button>
        <button style={{
          padding: '8px 16px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: 'white'
        }}>NEW</button>
      </div>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px'
      }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList; 
import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { dispatch } = useCart();

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold">${product.price}</span>
          <button
            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 
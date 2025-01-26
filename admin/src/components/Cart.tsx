import React from 'react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h2>
      {state.items.length === 0 ? (
        <div className="flex items-center justify-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          {state.items.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-grow min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-4 flex-shrink-0">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => 
                      dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: { id: item.id, quantity: parseInt(e.target.value) }
                      })
                    }
                    className="w-16 px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-blue-600">
                ${state.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 
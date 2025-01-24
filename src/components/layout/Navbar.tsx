import { Link } from 'react-router-dom'
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'
import { useCart } from '../../context/CartContext'

export const Navbar = () => {
  const { state } = useCart()
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="fixed w-full bg-gray-800 border-b border-gray-700 h-16 z-50">
      <div className="flex items-center justify-between h-full px-8">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-white">STORE</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <button className="text-gray-300 hover:text-white">
            <UserIcon className="h-6 w-6" />
          </button>
          <Link to="/cart" className="text-gray-300 hover:text-white">
            <div className="relative">
              <ShoppingCartIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium">
                  {itemCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
} 
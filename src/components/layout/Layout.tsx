import { Link } from 'react-router-dom'
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div style={{ 
      minHeight: '100vh',
      width: '100vw',
      overflow: 'hidden'
    }}>
      {/* Top bar */}
      <div style={{
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #eee',
        fontSize: '14px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '8px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            Welcome visitor! <Link to="/login" style={{ color: '#ee4444' }}>Log In</Link> or{' '}
            <Link to="/register" style={{ color: '#ee4444' }}>Create an Account</Link>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Call us: (123) 456-7890</span>
            <select style={{ border: 'none', background: 'none' }}>
              <option>$ US Dollar</option>
              <option>€ Euro</option>
            </select>
            <select style={{ border: 'none', background: 'none' }}>
              <option>English</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>
      </div>

      {/* Logo and user nav */}
      <div style={{
        width: '100%',
        borderBottom: '1px solid #eee'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" style={{ 
            textDecoration: 'none',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            <span style={{ color: '#ee4444' }}>flat</span>
            <span style={{ color: '#666' }}>astic</span>
          </Link>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link to="/account" style={{ color: '#666', textDecoration: 'none' }}>My Account</Link>
            <span style={{ color: '#ddd' }}>|</span>
            <Link to="/orders" style={{ color: '#666', textDecoration: 'none' }}>Orders List</Link>
            <span style={{ color: '#ddd' }}>|</span>
            <Link to="/wishlist" style={{ color: '#666', textDecoration: 'none' }}>Wishlist</Link>
            <span style={{ color: '#ddd' }}>|</span>
            <Link to="/checkout" style={{ color: '#666', textDecoration: 'none' }}>Checkout</Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <header style={{
        width: '100vw',
        backgroundColor: '#333',
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
        }}>
          <nav style={{
            display: 'flex',
            gap: '5px'
          }}>
            {[
              'HOME', 'SLIDERS', 'SHOP', 'PORTFOLIO', 
              'PAGES', 'BLOG', 'FEATURES', 'CONTACT'
            ].map(item => (
              <Link 
                key={item}
                to={`/${item.toLowerCase()}`} 
                style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  padding: '20px 25px',
                  transition: 'background-color 0.2s',
                }}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        width: '100%'
      }}>
        {children}
      </main>
    </div>
  )
} 
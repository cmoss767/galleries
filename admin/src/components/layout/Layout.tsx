import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../services/auth'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (err) {
      console.error('Failed to logout:', err)
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: '250px',
        backgroundColor: '#1a1a1a',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ 
          fontSize: '24px', 
          fontWeight: 'bold',
          marginBottom: '40px',
          color: '#fff'
        }}>
          Gallery Admin
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>
            Dashboard
          </Link>
          <Link to="/galleries" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>
            Galleries
          </Link>
          <Link to="/settings" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: '20px',
        overflow: 'auto'
      }}>
        {/* Header */}
        <header style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '20px',
          backgroundColor: 'white',
          marginBottom: '20px',
          borderRadius: '8px'
        }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span>Admin User</span>
            <button 
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content area */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px'
        }}>
          {children}
        </div>
      </main>
    </div>
  )
} 
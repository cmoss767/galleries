import { Product } from '../types'
import { useCart } from '../context/CartContext'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { dispatch } = useCart()

  return (
    <div style={{ 
      border: '1px solid #eee',
      borderRadius: '4px',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'relative',
        paddingBottom: '100%', // 1:1 Aspect ratio
        background: '#f5f5f5'
      }}>
        <img 
          src={product.image} 
          alt={product.name}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      <div style={{ padding: '15px' }}>
        <h3 style={{ 
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '8px'
        }}>{product.name}</h3>
        <p style={{ 
          color: '#666',
          fontSize: '14px',
          marginBottom: '15px'
        }}>{product.description}</p>
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ 
            fontSize: '18px',
            fontWeight: 'bold'
          }}>${product.price.toFixed(2)}</span>
          <button 
            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
            style={{
              backgroundColor: '#ee4444',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard 
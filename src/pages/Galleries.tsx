import React from 'react'

const Galleries = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Galleries</h1>
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#1a1a1a',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Create New Gallery
        </button>
      </div>
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
        No galleries found
      </div>
    </div>
  )
}

export default Galleries 
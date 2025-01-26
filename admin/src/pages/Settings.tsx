import React from 'react'

const Settings = () => {
  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Settings</h1>
      <div style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '10px' }}>General Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Site Name</label>
              <input 
                type="text" 
                style={{ 
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Default Gallery Layout</label>
              <select style={{ 
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}>
                <option>Grid</option>
                <option>Masonry</option>
                <option>Carousel</option>
              </select>
            </div>
          </div>
        </div>
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#1a1a1a',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Save Settings
        </button>
      </div>
    </div>
  )
}

export default Settings 
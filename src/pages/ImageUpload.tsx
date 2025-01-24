import React from 'react'

const ImageUpload = () => {
  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Image Upload</h1>
      <div style={{ 
        border: '2px dashed #ccc', 
        borderRadius: '8px', 
        padding: '40px',
        textAlign: 'center'
      }}>
        <p>Drag and drop images here or click to select files</p>
        <input 
          type="file" 
          accept="image/*" 
          multiple 
          style={{ display: 'none' }} 
          id="fileInput" 
        />
        <button 
          onClick={() => document.getElementById('fileInput')?.click()}
          style={{
            marginTop: '20px',
            padding: '8px 16px',
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Select Files
        </button>
      </div>
    </div>
  )
}

export default ImageUpload 
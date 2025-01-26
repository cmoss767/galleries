import React from 'react'
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Dashboard</h1>
      <pre style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
        {JSON.stringify({ 
          uid: user?.uid,
          email: user?.email,
          emailVerified: user?.emailVerified
        }, null, 2)}
      </pre>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Total Galleries</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>0</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Total Images</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>0</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Total Users</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>0</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 
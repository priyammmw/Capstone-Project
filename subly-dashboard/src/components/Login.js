import React, { useState, useContext } from 'react';
import { SubContext } from '../context/SubContext';
import { Lock } from 'lucide-react';

export default function Login() {
  const { login } = useContext(SubContext);
  const [email, setEmail] = useState('');

  return (
    <div className="login-screen">
      <div className="stat-card" style={{ maxWidth: '350px', textAlign: 'center' }}>
        <Lock size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
        <h2>Subly Pro</h2>
        <form onSubmit={(e) => { e.preventDefault(); login(email); }}>
          <input type="email" placeholder="Email Address" required value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }} />
          <button style={{ background: 'var(--primary)', color: 'white', border: 'none', width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Sign In</button>
        </form>
      </div>
    </div>
  );
}
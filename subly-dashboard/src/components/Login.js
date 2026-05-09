import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubContext } from '../context/SubContext';

const Login = () => {
  const [name, setName] = useState("");
  const { setUser } = useContext(SubContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name.trim()) {
      setUser(name);
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card glass-panel">
        <p className="greeting">WELCOME TO</p>
        <h1>Subly <span>PRO</span></h1>
        <p className="sub-text">Smart Subscription Intelligence</p>
        <input 
          className="cyber-input" 
          placeholder="Enter Command Name..." 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="neon-btn" onClick={handleLogin}>GET STARTED</button>
      </div>
    </div>
  );
};

export default Login;
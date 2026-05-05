import React, { useState, useEffect, useContext } from 'react';
import { SubContext, SubProvider } from './context/SubContext';
import Dashboard from './components/Dashboard';
import AddSubForm from './components/AddSubForm';
import Login from './components/Login';
import { Moon, Sun, LogOut } from 'lucide-react';
import './App.css';

function MainApp() {
  const { user, logout } = useContext(SubContext);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  if (!user) return <Login />;

  return (
    <div className="app-container">
      <div className="theme-toggle-container">
        <button className="icon-btn" onClick={() => setDark(!dark)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>
        <button className="icon-btn" onClick={logout} style={{ color: '#ef4444' }}><LogOut size={18}/></button>
      </div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>Subly Pro</h1>
        <p style={{ color: 'var(--muted)', margin: 0 }}>Welcome back, {user.name}!</p>
      </header>
      <AddSubForm />
      <Dashboard />
    </div>
  );
}

export default function App() {
  return (
    <SubProvider>
      <MainApp />
    </SubProvider>
  );
}
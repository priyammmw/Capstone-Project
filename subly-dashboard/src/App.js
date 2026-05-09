import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SubProvider } from './context/SubContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddSubForm from './components/AddSubForm';
import './App.css';

function App() {
  return (
    <SubProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard view="dashboard" />} />
          <Route path="/analytics" element={<Dashboard view="analytics" />} />
          <Route path="/settings" element={<Dashboard view="settings" />} />
          <Route path="/add" element={<AddSubForm />} />
        </Routes>
      </Router>
    </SubProvider>
  );
}

export default App;
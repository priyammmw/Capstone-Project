import React, { createContext, useState, useEffect } from 'react';

export const SubContext = createContext();

export const SubProvider = ({ children }) => {
  // Persistence: Load data from LocalStorage
  const [subs, setSubs] = useState(() => {
    const saved = localStorage.getItem('subly_v4_data');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('subly_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [budget, setBudget] = useState(2000); 
  const [currency, setCurrency] = useState('₹');

  useEffect(() => {
    localStorage.setItem('subly_v4_data', JSON.stringify(subs));
    localStorage.setItem('subly_user', JSON.stringify(user));
  }, [subs, user]);

  const login = (email) => setUser({ email, name: email.split('@')[0] });
  const logout = () => { setUser(null); setSubs([]); };

  const totalMonthly = subs.reduce((acc, sub) => acc + parseFloat(sub.price || 0), 0);
  const isOverBudget = totalMonthly > budget;

  const addSub = (sub) => setSubs([...subs, { ...sub, id: Date.now() }]);
  const deleteSub = (id) => setSubs(subs.filter(s => s.id !== id));

  return (
    <SubContext.Provider value={{ 
      user, login, logout, subs, addSub, deleteSub, 
      totalMonthly, budget, setBudget, isOverBudget, currency, setCurrency 
    }}>
      {children}
    </SubContext.Provider>
  );
};
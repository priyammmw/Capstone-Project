import React, { createContext, useState, useEffect } from 'react';

export const SubContext = createContext();

export const SubProvider = ({ children }) => {
  // Load data from LocalStorage or start with empty array
  const [subs, setSubs] = useState(() => {
    const saved = localStorage.getItem('cyber_subs_pro');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Updated Budget Limit: ₹12,000
  const [budget, setBudget] = useState(12000); 
  const [user, setUser] = useState(localStorage.getItem('cyber_user') || "");

  // Persist data whenever subs or user changes
  useEffect(() => {
    localStorage.setItem('cyber_subs_pro', JSON.stringify(subs));
    localStorage.setItem('cyber_user', user);
  }, [subs, user]);

  const addSub = (newSub) => {
    const monthlyImpact = newSub.cycle === 'Yearly' 
      ? parseFloat(newSub.price) / 12 
      : parseFloat(newSub.price);
    
    setSubs([...subs, { 
      ...newSub, 
      id: Date.now(), 
      monthlyImpact: Number(monthlyImpact),
      price: parseFloat(newSub.price)
    }]);
  };

  const deleteSub = (id) => setSubs(subs.filter(s => s.id !== id));

  const totalMonthly = subs.reduce((acc, curr) => acc + curr.monthlyImpact, 0);

  return (
    <SubContext.Provider value={{ 
      subs, addSub, deleteSub, totalMonthly, budget, setBudget, user, setUser 
    }}>
      {children}
    </SubContext.Provider>
  );
};
import React, { useState, useContext } from 'react';
import { SubContext } from '../context/SubContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cpu, ShieldCheck, CreditCard, Activity, Database } from 'lucide-react';

const AddSubForm = () => {
  const { addSub } = useContext(SubContext);
  const [form, setForm] = useState({ name: '', price: '', category: 'Entertainment', cycle: 'Monthly' });
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    if(form.name && form.price) {
      addSub(form);
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-screen">
      <div className="add-container">
        <button className="back-link" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={16} /> BACK TO COMMAND CENTER
        </button>
        
        <form className="glass-panel add-card cyber-border-top" onSubmit={handleAdd}>
          <div className="form-header">
            <div className="icon-box-purple">
              <Cpu size={24} className="icon-pulse" />
            </div>
            <div>
              <h2>Service Deployment</h2>
              <p className="form-subtitle">Registering new asset to system</p>
            </div>
          </div>
          
          <div className="form-body">
            <div className="input-group full-width">
              <label className="label-purple"><ShieldCheck size={14}/> SERVICE NAME</label>
              <input 
                className="cyber-input" 
                placeholder="e.g. Netflix, AWS, Spotify" 
                onChange={e => setForm({...form, name: e.target.value})} 
                required
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label className="label-orange"><CreditCard size={14}/> PRICE (INR)</label>
                <input 
                  className="cyber-input" 
                  type="number" 
                  placeholder="0.00" 
                  onChange={e => setForm({...form, price: e.target.value})} 
                  required
                />
              </div>
              <div className="input-group">
                <label className="label-blue"><Activity size={14}/> BILLING CYCLE</label>
                <select className="cyber-input custom-select" onChange={e => setForm({...form, cycle: e.target.value})}>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </div>
            </div>

            <div className="input-group full-width">
              <label className="label-green"><Database size={14}/> DATABASE CATEGORY</label>
              <select className="cyber-input custom-select" onChange={e => setForm({...form, category: e.target.value})}>
                <option>Entertainment</option>
                <option>Productivity</option>
                <option>Utilities</option>
                <option>Gaming</option>
              </select>
            </div>

            <button type="submit" className="initialize-btn">
              INITIALIZE SERVICE
              <div className="btn-glow"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubForm;
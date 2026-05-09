import React, { useContext } from 'react';
import { SubContext } from '../context/SubContext';
import { NavLink, useNavigate } from 'react-router-dom';
import ExpenseChart from './ExpenseChart';
import { LayoutDashboard, PieChart, Settings, PlusCircle, Trash2 } from 'lucide-react';

const Dashboard = ({ view }) => {
  const { subs, deleteSub, totalMonthly, budget, user } = useContext(SubContext);
  const navigate = useNavigate();

  // Calculation for budget percentage based on 12,000
  const budgetPercentage = ((totalMonthly / budget) * 100).toFixed(0);

  return (
    <div className="dashboard-container">
      {/* Sidebar - Fixed width */}
      <aside className="sidebar">
        <div className="logo">Subly <span>PRO</span></div>
        <nav className="nav-list">
          <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <LayoutDashboard size={20}/> Dashboard
          </NavLink>
          <NavLink to="/analytics" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <PieChart size={20}/> Analytics
          </NavLink>
          <NavLink to="/settings" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Settings size={20}/> Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main Content - Flexible width */}
      <main className="main-content">
        <div className="content-inner">
          {view === "dashboard" && (
            <>
              <header className="dashboard-header">
                <div>
                  <p className="status-label">SYSTEM ONLINE • {user?.toUpperCase() || 'AGENT'}</p>
                  <h1>Command Center</h1>
                </div>
                <button className="neon-btn add-btn" onClick={() => navigate('/add')}>
                  <PlusCircle size={18}/> ADD SERVICE
                </button>
              </header>

              {/* Stats Grid with restored Colors */}
              <div className="stats-grid">
                <div className="stat-card purple">
                  <span className="label">MONTHLY SPEND</span>
                  <h2 className="value">₹{totalMonthly.toFixed(0)}</h2>
                </div>
                
                <div className="stat-card orange">
                  <span className="label">BUDGET USED</span>
                  <h2 className="value">{budgetPercentage}%</h2>
                </div>
                
                <div className="stat-card green">
                  <span className="label">YEARLY LIMIT</span>
                  <h2 className="value">₹{budget.toLocaleString()}</h2>
                </div>
              </div>

              {/* Subscription Table */}
              <div className="glass-panel">
                <h3 style={{marginBottom: '20px'}}>Active Deployments</h3>
                {subs.length === 0 ? (
                  <p style={{color: 'var(--text-dim)'}}>No active subscriptions found.</p>
                ) : (
                  subs.map(sub => (
                    <div key={sub.id} className="sub-item-row">
                      <div className="sub-info">
                        <div style={{fontWeight: '700', fontSize: '1.1rem'}}>{sub.name}</div>
                        <div style={{fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase'}}>{sub.category}</div>
                      </div>
                      <div className="sub-meta" style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                        <span className="price-pill">₹{sub.price}</span>
                        <button className="del-btn" onClick={() => deleteSub(sub.id)} title="Delete Service">
                          <Trash2 size={18} color="#ef4444" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {view === "analytics" && (
            <div className="glass-panel">
              <h1>Spending Analytics</h1>
              <div className="chart-wrapper" style={{height: '400px', marginTop: '30px'}}>
                <ExpenseChart subs={subs} />
              </div>
            </div>
          )}

          {view === "settings" && (
            <div className="glass-panel">
              <h1>System Settings</h1>
              <div style={{marginTop: '25px'}}>
                <p style={{color: 'var(--text-dim)'}}>Profile: <strong>{user}</strong></p>
                <p style={{color: 'var(--text-dim)', marginTop: '10px'}}>Target Monthly Budget: <strong>₹{budget}</strong></p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
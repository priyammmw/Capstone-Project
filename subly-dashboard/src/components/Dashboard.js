import React, { useContext } from 'react';
import { SubContext } from '../context/SubContext';
import { Trash2, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { subs, deleteSub, totalMonthly, budget, setBudget, isOverBudget, currency } = useContext(SubContext);

  return (
    <div>
      {isOverBudget && (
        <div className="warning-box">
          <AlertCircle size={18} inline /> CROSSING BUDGET LIMIT! (Limit: {currency}{budget})
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <p style={{ color: 'var(--muted)', margin: 0 }}>Total Monthly</p>
          <h2 style={{ margin: '5px 0' }}>{currency}{totalMonthly.toFixed(2)}</h2>
        </div>
        <div className="stat-card">
          <p style={{ color: 'var(--muted)', margin: 0 }}>Budget Limit</p>
          <input type="number" value={budget} onChange={e => setBudget(e.target.value)} style={{ marginTop: '10px', width: '100px' }} />
        </div>
      </div>

      <table>
        <thead><tr style={{ color: 'var(--muted)', fontSize: '0.8rem' }}><th>Service</th><th>Method</th><th>Price</th><th>Action</th></tr></thead>
        <tbody>
          {subs.map(s => (
            <tr key={s.id}>
              <td style={{ fontWeight: 'bold' }}>{s.name}</td>
              <td><span style={{ fontSize: '0.7rem', padding: '3px 7px', background: 'var(--bg)', borderRadius: '5px' }}>{s.payment}</span></td>
              <td>{currency}{parseFloat(s.price).toFixed(2)}</td>
              <td><button onClick={() => deleteSub(s.id)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={18}/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
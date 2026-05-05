import React, { useState, useContext } from 'react';
import { SubContext } from '../context/SubContext';

export default function AddSubForm() {
  const { addSub } = useContext(SubContext);
  const [form, setForm] = useState({ name: '', price: '', payment: 'UPI' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (form.name && form.price) { addSub(form); setForm({ name: '', price: '', payment: 'UPI' }); }
  };

  return (
    <form onSubmit={handleAdd} className="sub-form">
      <input placeholder="Service (Netflix, etc.)" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
      <input type="number" placeholder="Monthly Price" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
      <select value={form.payment} onChange={e => setForm({...form, payment: e.target.value})}>
        <option value="UPI">UPI Payment</option>
        <option value="Card">Credit/Debit Card</option>
      </select>
      <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Add</button>
    </form>
  );
}
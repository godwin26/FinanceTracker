// src/components/Dashboard/Transactions.js
import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const emptyForm = {
  title: '',
  amount: '',
  type: 'EXPENSE',
  category: 'OTHER',
  date: '',
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState(emptyForm);

  // Edit
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);

  // Filter
  const [filterType, setFilterType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [error, setError] = useState('');

  // Fetch transactions (filtered if needed)
  const fetchTransactions = async () => {
    try {
      const params = new URLSearchParams();
      if (filterType) params.append('type', filterType);
      if (filterCategory) params.append('category', filterCategory);
      if (fromDate) params.append('startDate', fromDate);
      if (toDate) params.append('endDate', toDate);

      const endpoint =
        params.toString() === ''
          ? '/transactions'
          : `/transactions/filter?${params.toString()}`;

      const res = await API.get(endpoint);
      setTransactions(res.data);
      setError('');
    } catch (err) {
      console.error('Fetch failed:', err);
      setError('Could not load transactions');
    }
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post('/transactions', form);
      setForm(emptyForm);
      fetchTransactions();
    } catch (err) {
      console.error('Add failed:', err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  // Start edit
  const startEdit = (tx) => {
    setEditingId(tx.id);
    setEditForm({
      title: tx.title,
      amount: tx.amount,
      type: tx.type,
      category: tx.category,
      date: tx.date,
    });
  };

  // Save edit
  const saveEdit = async (id) => {
    try {
      await API.put(`/transactions/${id}`, editForm);
      setEditingId(null);
      fetchTransactions();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const cancelEdit = () => setEditingId(null);

  const onChangeAdd = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onChangeEdit = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Transactions</h2>

      {/* ---------- Filter Section ---------- */}
      <div style={{ marginBottom: 20, border: '1px solid #ccc', padding: 10 }}>
        <h4>Filter</h4>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          <option value="INCOME">INCOME</option>
          <option value="EXPENSE">EXPENSE</option>
        </select>

        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="FOOD">FOOD</option>
          <option value="UTILITIES">UTILITIES</option>
          <option value="ENTERTAINMENT">ENTERTAINMENT</option>
          <option value="OTHER">OTHER</option>
        </select>

        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />

        <button onClick={fetchTransactions} style={{ marginLeft: 8 }}>Apply</button>
        <button
          onClick={() => {
            setFilterType('');
            setFilterCategory('');
            setFromDate('');
            setToDate('');
            fetchTransactions();
          }}
          style={{ marginLeft: 4 }}
        >
          Reset
        </button>
      </div>

      {/* ---------- Add Transaction Form ---------- */}
      <form onSubmit={handleAdd} style={{ marginBottom: 20 }}>
        <input
          name="title"
          value={form.title}
          onChange={onChangeAdd}
          placeholder="Title"
          required
        />
        <input
          name="amount"
          value={form.amount}
          onChange={onChangeAdd}
          type="number"
          placeholder="Amount"
          required
        />
        <select name="type" value={form.type} onChange={onChangeAdd}>
          <option value="INCOME">INCOME</option>
          <option value="EXPENSE">EXPENSE</option>
        </select>
        <select name="category" value={form.category} onChange={onChangeAdd}>
          <option value="FOOD">FOOD</option>
          <option value="UTILITIES">UTILITIES</option>
          <option value="ENTERTAINMENT">ENTERTAINMENT</option>
          <option value="OTHER">OTHER</option>
        </select>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={onChangeAdd}
          required
        />
        <button type="submit">Add</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* ---------- Transaction List ---------- */}
      <ul>
        {transactions.map((tx) =>
          editingId === tx.id ? (
            <li key={tx.id}>
              <input name="date" type="date" value={editForm.date} onChange={onChangeEdit} />
              <select name="type" value={editForm.type} onChange={onChangeEdit}>
                <option value="INCOME">INCOME</option>
                <option value="EXPENSE">EXPENSE</option>
              </select>
              <input name="amount" type="number" value={editForm.amount} onChange={onChangeEdit} />
              <input name="category" value={editForm.category} onChange={onChangeEdit} />
              <input name="title" value={editForm.title} onChange={onChangeEdit} />
              <button onClick={() => saveEdit(tx.id)}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </li>
          ) : (
            <li key={tx.id}>
              {tx.date} | {tx.type} | ${tx.amount} | {tx.category} | {tx.title}
              &nbsp;
              <button onClick={() => startEdit(tx)}>Edit</button>
              <button onClick={() => handleDelete(tx.id)}>Delete</button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Transactions;

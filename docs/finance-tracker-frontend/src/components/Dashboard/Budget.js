import React, { useState } from 'react';
import API from '../../services/api';

const Budget = () => {
  const [month, setMonth] = useState('');
  const [limit, setLimit] = useState('');
  const [budget, setBudget] = useState(null);
  const [error, setError] = useState('');

  /* -------- fetch existing budget -------- */
  const fetchBudget = async () => {
    try {
      const res = await API.get(`/budgets?month=${month}`);
      setBudget(res.data);
      setError('');
    } catch (err) {
      setError('No budget found for this month.');
      setBudget(null);
    }
  };

  /* -------- save / update budget -------- */
  const handleSubmit = async () => {
    try {
      const payload = { month, amount: parseFloat(limit) };
      const res = await API.post('/budgets', payload);        // <-- plural
      setBudget(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error saving budget');
    }
  };

  return (
    <div>
      <h2>Monthly Budget</h2>

      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Budget Limit"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        required
      />

      <button onClick={handleSubmit}>Save Budget</button>
      <button onClick={fetchBudget}>Load Budget</button>

      {budget && (
        <div style={{ marginTop: '10px' }}>
          <p><strong>Month:</strong> {budget.month}</p>
          <p><strong>Limit:</strong> ${budget.amount}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Budget;

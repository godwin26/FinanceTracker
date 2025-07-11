import React, { useState } from 'react';
import API from '../../services/api';

const Dashboard = () => {
  const [month, setMonth] = useState('');
  const [summary, setSummary] = useState(null);
  const [limit, setLimit] = useState('');
  const [budgetSaved, setBudgetSaved] = useState('');
  const [error, setError] = useState('');

  // Fetch monthly summary
  const loadSummary = async () => {
    try {
      const res = await API.get(`/transactions/summary?month=${month}`);
      setSummary(res.data);
      setError('');
    } catch {
      setError('❌ Failed to fetch summary');
      setSummary(null);
    }
  };

  // Save or update budget
  const handleBudgetSave = async () => {
    if (!limit || !month) {
      setError('Please enter month and limit');
      return;
    }

    try {
      const payload = { month, amount: parseFloat(limit) };
      await API.post('/budgets', payload); // Correct plural endpoint
      setBudgetSaved('✅ Budget saved!');
      setTimeout(() => setBudgetSaved(''), 3000);
      setError('');
      loadSummary(); // Refresh dashboard summary
    } catch {
      setError('❌ Failed to save budget');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📊 Monthly Dashboard</h2>

      {/* Month Picker */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <button onClick={loadSummary} style={{ marginLeft: 8 }}>
          Load Summary
        </button>
      </div>

      {/* Alerts */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {budgetSaved && <p style={{ color: 'green' }}>{budgetSaved}</p>}

      {/* Main Panels */}
      {summary && (
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
          {/* Summary Panel */}
          <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
            <h3>📈 Summary</h3>
            <ul>
              <li><b>Month:</b> {summary.month}</li>
              <li><b>Income:</b> ${summary.totalIncome}</li>
              <li><b>Expense:</b> ${summary.totalExpense}</li>
              <li><b>Budget Limit:</b> {summary.budgetLimit ?? '—'}</li>
              <li><b>Remaining:</b> {summary.remaining ?? '—'}</li>
            </ul>
          </div>

          {/* Budget Panel */}
          <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
            <h3>💰 Set / Update Budget</h3>
            <input
              type="number"
              placeholder="Budget Limit"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
            <button onClick={handleBudgetSave} style={{ marginLeft: 8 }}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

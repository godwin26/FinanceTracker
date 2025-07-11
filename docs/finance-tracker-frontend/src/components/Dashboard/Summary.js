import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const Summary = () => {
  const [month, setMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  });

  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchSummary = async () => {
    try {
      const res = await API.get(`/transactions/summary?month=${month}`);
      setData(res.data);
      setError('');
    } catch (e) {
      setError('Unable to load summary');
      console.error(e);
    }
  };

  useEffect(() => {
    fetchSummary();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Monthly Summary</h2>

      {/* month selector */}
      <label>
        Month&nbsp;
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </label>
      <button onClick={fetchSummary}>Load</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <ul>
          <li>Total Income: ${data.totalIncome}</li>
          <li>Total Expense: ${data.totalExpense}</li>
          <li>Budget Limit: {data.budgetLimit ? `$${data.budgetLimit}` : '—'}</li>
          <li>Remaining: {data.remaining != null ? `$${data.remaining}` : '—'}</li>
        </ul>
      )}
    </div>
  );
};

export default Summary;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav style={{ marginBottom: '20px' }}>
      {loggedIn ? (
        <>
          <Link to="/transactions">Transactions</Link> |{' '}
          <Link to="/summary">Summary</Link> |{' '}
          <Link to="/budget">Budget</Link> |{' '}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> |{' '}
          <Link to="/register">Register</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/transactions">Transactions</Link>


        </>
      )}
    </nav>
  );
};

export default Navbar;

